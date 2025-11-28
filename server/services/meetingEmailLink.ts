import { storage } from "../storage";
import type { Email, Meeting } from "@shared/schema";

const OTTER_PATTERNS = [
  /otter\.ai/i,
  /otter ai/i,
  /meeting notes from/i,
  /meeting summary/i,
  /otter transcript/i,
  /your meeting notes/i,
  /meeting recording.*otter/i,
  /otter.*recording/i,
  /otter notes/i,
  /\botter\b/i,
];

const MS_RECAP_PATTERNS = [
  /microsoft\.com/i,
  /meeting recap/i,
  /meeting insights/i,
  /intelligent recap/i,
  /meeting recording is ready/i,
  /copilot/i,
  /teams.*recap/i,
  /recap.*teams/i,
  /microsoft.*recap/i,
  /teams meeting summary/i,
  /teams.*recording/i,
  /meeting.*transcription/i,
  /@teams\.microsoft\.com/i,
  /noreply@microsoft\.com/i,
];

const GENERIC_SUMMARY_PATTERNS = [
  /meeting notes/i,
  /meeting summary/i,
  /action items from/i,
  /follow[ -]?up from/i,
  /recap:/i,
  /notes:/i,
  /meeting recording/i,
  /transcript from/i,
  /summary of.*meeting/i,
  /meeting.*recap/i,
  /key takeaways/i,
  /meeting highlights/i,
];

export interface EmailLinkResult {
  emailId: string;
  meetingId: string | null;
  linkType: string | null;
  confidence: number;
  reason: string;
}

export interface LinkingStats {
  processed: number;
  linked: number;
  unlinked: number;
  errors: number;
}

export function detectMeetingSummaryType(email: Email): {
  isMeetingSummary: boolean;
  linkType: string | null;
  confidence: number;
} {
  const subject = email.subject || "";
  const from = email.from || "";
  const body = email.body || "";
  const bodyFull = body.substring(0, 5000);
  
  const otterInFrom = OTTER_PATTERNS.some(p => p.test(from));
  const otterInSubject = OTTER_PATTERNS.some(p => p.test(subject));
  const otterInBody = OTTER_PATTERNS.some(p => p.test(bodyFull));
  
  if (otterInFrom || otterInSubject) {
    return { isMeetingSummary: true, linkType: "otter_summary", confidence: 0.95 };
  }
  if (otterInBody) {
    return { isMeetingSummary: true, linkType: "otter_summary", confidence: 0.85 };
  }
  
  const msRecapInFrom = MS_RECAP_PATTERNS.some(p => p.test(from));
  const msRecapInSubject = MS_RECAP_PATTERNS.some(p => p.test(subject));
  const msRecapInBody = MS_RECAP_PATTERNS.some(p => p.test(bodyFull));
  
  if (msRecapInFrom || msRecapInSubject) {
    return { isMeetingSummary: true, linkType: "ms_recap", confidence: 0.9 };
  }
  if (msRecapInBody) {
    return { isMeetingSummary: true, linkType: "ms_recap", confidence: 0.8 };
  }
  
  const subjectMatches = GENERIC_SUMMARY_PATTERNS.filter(p => p.test(subject)).length;
  const bodyMatches = GENERIC_SUMMARY_PATTERNS.filter(p => p.test(bodyFull)).length;
  
  if (subjectMatches >= 2) {
    return { isMeetingSummary: true, linkType: "meeting_notes", confidence: 0.75 };
  }
  if (subjectMatches >= 1) {
    return { isMeetingSummary: true, linkType: "meeting_notes", confidence: 0.65 };
  }
  if (bodyMatches >= 3) {
    return { isMeetingSummary: true, linkType: "meeting_notes", confidence: 0.6 };
  }
  if (bodyMatches >= 2) {
    return { isMeetingSummary: true, linkType: "meeting_notes", confidence: 0.5 };
  }
  
  return { isMeetingSummary: false, linkType: null, confidence: 0 };
}

function extractMeetingTitleFromEmail(email: Email, linkType: string): string | null {
  const subject = email.subject || "";
  const body = email.body || "";
  
  const patterns = [
    /meeting notes from[:\s]+["']?([^"'\n]+)["']?/i,
    /meeting summary[:\s]+["']?([^"'\n]+)["']?/i,
    /recap[:\s]+["']?([^"'\n]+)["']?/i,
    /notes from[:\s]+["']?([^"'\n]+)["']?/i,
    /recording is ready[:\s]+["']?([^"'\n]+)["']?/i,
  ];
  
  for (const pattern of patterns) {
    const subjectMatch = subject.match(pattern);
    if (subjectMatch) return subjectMatch[1].trim();
    
    const bodyMatch = body.substring(0, 1000).match(pattern);
    if (bodyMatch) return bodyMatch[1].trim();
  }
  
  if (linkType === "otter_summary") {
    const cleanSubject = subject
      .replace(/meeting notes from/i, "")
      .replace(/otter\.ai/i, "")
      .replace(/[-–—]/g, " ")
      .trim();
    if (cleanSubject.length > 3) return cleanSubject;
  }
  
  return null;
}

function calculateTitleSimilarity(title1: string, title2: string): number {
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
  const t1 = normalize(title1);
  const t2 = normalize(title2);
  
  if (t1 === t2) return 1.0;
  if (t1.includes(t2) || t2.includes(t1)) return 0.9;
  
  const words1 = t1.split(/\s+/).filter(w => w.length > 2);
  const words2 = t2.split(/\s+/).filter(w => w.length > 2);
  
  if (words1.length === 0 || words2.length === 0) return 0;
  
  const commonWords = words1.filter(w => words2.includes(w));
  const similarity = (2 * commonWords.length) / (words1.length + words2.length);
  
  return similarity;
}

export async function findMatchingMeeting(
  email: Email,
  linkType: string
): Promise<{ meeting: Meeting | null; confidence: number; reason: string }> {
  const emailDate = new Date(email.receivedAt);
  const extractedTitle = extractMeetingTitleFromEmail(email, linkType);
  
  const windowStart = new Date(emailDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  const windowEnd = new Date(emailDate.getTime() + 2 * 60 * 60 * 1000);
  
  const meetings = await storage.getMeetingsInDateRange(windowStart, windowEnd);
  
  if (meetings.length === 0) {
    return { meeting: null, confidence: 0, reason: "No meetings found in date range" };
  }
  
  let bestMatch: { meeting: Meeting; score: number; reason: string } | null = null;
  
  for (const meeting of meetings) {
    let score = 0;
    let signalCount = 0;
    let reasons: string[] = [];
    
    const meetingStart = new Date(meeting.meetingDate);
    const meetingEnd = new Date(meetingStart.getTime() + 60 * 60 * 1000);
    
    const hoursSinceStart = (emailDate.getTime() - meetingStart.getTime()) / (1000 * 60 * 60);
    const hoursSinceEnd = (emailDate.getTime() - meetingEnd.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceStart >= 0 && hoursSinceEnd <= 0) {
      score += 0.35;
      signalCount++;
      reasons.push("Email arrived during meeting");
    } else if (hoursSinceStart < 0 && hoursSinceStart >= -0.5) {
      score += 0.3;
      signalCount++;
      reasons.push("Email arrived shortly before meeting");
    } else if (hoursSinceStart < 0 && hoursSinceStart >= -24) {
      score += 0.15;
      reasons.push("Email arrived same day before meeting");
    } else if (hoursSinceEnd >= 0 && hoursSinceEnd <= 4) {
      score += 0.35;
      signalCount++;
      reasons.push("Email arrived within 4 hours after meeting");
    } else if (hoursSinceEnd > 4 && hoursSinceEnd <= 24) {
      score += 0.25;
      signalCount++;
      reasons.push("Email arrived within 24 hours after meeting");
    } else if (hoursSinceEnd > 24 && hoursSinceEnd <= 72) {
      score += 0.15;
      reasons.push("Email arrived within 3 days after meeting");
    } else if (hoursSinceEnd > 72 && hoursSinceEnd <= 168) {
      score += 0.08;
      reasons.push("Email arrived within 7 days after meeting");
    }
    
    if (extractedTitle && meeting.title) {
      const titleSimilarity = calculateTitleSimilarity(extractedTitle, meeting.title);
      if (titleSimilarity >= 0.9) {
        score += 0.55;
        signalCount += 2;
        reasons.push(`Strong title match (${Math.round(titleSimilarity * 100)}%)`);
      } else if (titleSimilarity >= 0.6) {
        score += 0.4;
        signalCount++;
        reasons.push(`Moderate title match (${Math.round(titleSimilarity * 100)}%)`);
      } else if (titleSimilarity >= 0.3) {
        score += 0.25;
        reasons.push(`Weak title match (${Math.round(titleSimilarity * 100)}%)`);
      }
    }
    
    if (!extractedTitle && email.subject && meeting.title) {
      const subjectSimilarity = calculateTitleSimilarity(email.subject, meeting.title);
      if (subjectSimilarity >= 0.6) {
        score += subjectSimilarity * 0.4;
        signalCount++;
        reasons.push(`Subject contains meeting reference (${Math.round(subjectSimilarity * 100)}%)`);
      } else if (subjectSimilarity >= 0.4) {
        score += subjectSimilarity * 0.3;
        reasons.push(`Subject mentions meeting (${Math.round(subjectSimilarity * 100)}%)`);
      }
    }
    
    if (meeting.attendees && meeting.attendees.length > 0) {
      const emailTo = email.to || [];
      const emailCc = email.cc || [];
      const allRecipients = [...emailTo, ...emailCc].map(r => r.toLowerCase());
      
      const attendeeLower = meeting.attendees.map(a => a.toLowerCase());
      const commonAttendees = attendeeLower.filter(a => 
        allRecipients.some(r => r.includes(a) || a.includes(r))
      );
      
      if (commonAttendees.length >= 2 || (commonAttendees.length === 1 && meeting.attendees.length <= 3)) {
        const attendeeScore = Math.min(commonAttendees.length / meeting.attendees.length, 1) * 0.3;
        score += attendeeScore;
        signalCount++;
        reasons.push(`${commonAttendees.length} common attendees`);
      } else if (commonAttendees.length > 0) {
        const attendeeScore = Math.min(commonAttendees.length / meeting.attendees.length, 1) * 0.15;
        score += attendeeScore;
        reasons.push(`${commonAttendees.length} overlapping attendee`);
      }
    }
    
    const meetsThreshold = score >= 0.25 && signalCount >= 2;
    
    if (meetsThreshold && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { meeting, score, reason: reasons.join("; ") };
    }
  }
  
  if (!bestMatch) {
    return { meeting: null, confidence: 0, reason: "No matching meetings found (need score >= 0.25 with 2+ signals)" };
  }
  
  return {
    meeting: bestMatch.meeting,
    confidence: Math.min(bestMatch.score, 1.0),
    reason: bestMatch.reason,
  };
}

export async function linkEmailToMeeting(emailId: string): Promise<EmailLinkResult> {
  try {
    const email = await storage.getEmailById(emailId);
    if (!email) {
      return { emailId, meetingId: null, linkType: null, confidence: 0, reason: "Email not found" };
    }
    
    if (email.linkedMeetingId) {
      return { 
        emailId, 
        meetingId: email.linkedMeetingId, 
        linkType: email.linkType || null, 
        confidence: email.linkConfidence || 1, 
        reason: "Already linked" 
      };
    }
    
    const detection = detectMeetingSummaryType(email);
    if (!detection.isMeetingSummary) {
      return { emailId, meetingId: null, linkType: null, confidence: 0, reason: "Not a meeting summary email" };
    }
    
    const { meeting, confidence, reason } = await findMatchingMeeting(email, detection.linkType!);
    
    if (meeting && confidence >= 0.25) {
      await storage.linkEmailToMeeting(emailId, meeting.id, detection.linkType!, confidence);
      
      console.log(`[EmailLink] Linked email ${emailId} to meeting ${meeting.id} (${detection.linkType}, ${Math.round(confidence * 100)}%)`);
      
      return {
        emailId,
        meetingId: meeting.id,
        linkType: detection.linkType,
        confidence,
        reason,
      };
    }
    
    return { emailId, meetingId: null, linkType: detection.linkType, confidence, reason };
  } catch (error: any) {
    console.error(`[EmailLink] Error linking email ${emailId}:`, error);
    return { emailId, meetingId: null, linkType: null, confidence: 0, reason: error.message };
  }
}

export async function linkAllUnlinkedEmails(): Promise<LinkingStats> {
  const stats: LinkingStats = { processed: 0, linked: 0, unlinked: 0, errors: 0 };
  
  try {
    const unlinkedEmails = await storage.getUnlinkedMeetingSummaryEmails();
    console.log(`[EmailLink] Processing ${unlinkedEmails.length} unlinked emails`);
    
    for (const email of unlinkedEmails) {
      stats.processed++;
      
      try {
        const result = await linkEmailToMeeting(email.id);
        
        if (result.meetingId) {
          stats.linked++;
        } else {
          stats.unlinked++;
        }
      } catch (error) {
        stats.errors++;
        console.error(`[EmailLink] Error processing email ${email.id}:`, error);
      }
    }
    
    console.log(`[EmailLink] Completed: ${stats.linked} linked, ${stats.unlinked} unlinked, ${stats.errors} errors`);
    return stats;
  } catch (error: any) {
    console.error("[EmailLink] Error in batch linking:", error);
    throw error;
  }
}

export async function processNewEmail(email: Email): Promise<EmailLinkResult> {
  return await linkEmailToMeeting(email.id);
}
