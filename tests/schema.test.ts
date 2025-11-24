import { describe, it, expect } from 'vitest';
import {
  insertDocumentSchema,
  insertMeetingSchema,
  insertTaskSchema,
  insertActivityLogSchema,
  insertEmailSchema,
  upsertUserSchema,
} from '../shared/schema';

describe('Schema Validation', () => {
  describe('insertDocumentSchema', () => {
    it('should validate a valid document', () => {
      const validDoc = {
        title: 'Test Document',
        category: 'policy',
        fileName: 'test.pdf',
        fileSize: 1024,
        mimeType: 'application/pdf',
        source: 'upload',
      };
      const result = insertDocumentSchema.safeParse(validDoc);
      expect(result.success).toBe(true);
    });

    it('should require title field', () => {
      const invalidDoc = {
        category: 'policy',
        fileName: 'test.pdf',
        fileSize: 1024,
        mimeType: 'application/pdf',
        source: 'upload',
      };
      const result = insertDocumentSchema.safeParse(invalidDoc);
      expect(result.success).toBe(false);
    });

    it('should require category field', () => {
      const invalidDoc = {
        title: 'Test Document',
        fileName: 'test.pdf',
        fileSize: 1024,
        mimeType: 'application/pdf',
        source: 'upload',
      };
      const result = insertDocumentSchema.safeParse(invalidDoc);
      expect(result.success).toBe(false);
    });

    it('should allow optional description', () => {
      const validDoc = {
        title: 'Test Document',
        description: 'A test document description',
        category: 'policy',
        fileName: 'test.pdf',
        fileSize: 1024,
        mimeType: 'application/pdf',
        source: 'upload',
      };
      const result = insertDocumentSchema.safeParse(validDoc);
      expect(result.success).toBe(true);
    });
  });

  describe('insertMeetingSchema', () => {
    it('should validate a valid meeting', () => {
      const validMeeting = {
        title: 'Team Standup',
        meetingDate: new Date(),
        source: 'manual',
      };
      const result = insertMeetingSchema.safeParse(validMeeting);
      expect(result.success).toBe(true);
    });

    it('should require title field', () => {
      const invalidMeeting = {
        meetingDate: new Date(),
        source: 'manual',
      };
      const result = insertMeetingSchema.safeParse(invalidMeeting);
      expect(result.success).toBe(false);
    });

    it('should require meetingDate field', () => {
      const invalidMeeting = {
        title: 'Team Standup',
        source: 'manual',
      };
      const result = insertMeetingSchema.safeParse(invalidMeeting);
      expect(result.success).toBe(false);
    });

    it('should allow optional transcript and summary', () => {
      const validMeeting = {
        title: 'Team Standup',
        meetingDate: new Date(),
        source: 'manual',
        transcript: 'Meeting transcript text',
        summary: 'Meeting summary',
      };
      const result = insertMeetingSchema.safeParse(validMeeting);
      expect(result.success).toBe(true);
    });
  });

  describe('insertTaskSchema', () => {
    it('should validate a valid task with defaults', () => {
      const validTask = {
        title: 'Complete report',
      };
      const result = insertTaskSchema.safeParse(validTask);
      expect(result.success).toBe(true);
    });

    it('should require title field', () => {
      const invalidTask = {
        description: 'Task description',
      };
      const result = insertTaskSchema.safeParse(invalidTask);
      expect(result.success).toBe(false);
    });

    it('should validate task with all fields', () => {
      const validTask = {
        title: 'Complete report',
        description: 'Finish the quarterly report',
        status: 'pending',
        priority: 'high',
        dueDate: new Date(),
        source: 'manual',
      };
      const result = insertTaskSchema.safeParse(validTask);
      expect(result.success).toBe(true);
    });
  });

  describe('insertActivityLogSchema', () => {
    it('should validate a valid activity log', () => {
      const validLog = {
        action: 'view_document',
      };
      const result = insertActivityLogSchema.safeParse(validLog);
      expect(result.success).toBe(true);
    });

    it('should require action field', () => {
      const invalidLog = {
        resourceType: 'document',
      };
      const result = insertActivityLogSchema.safeParse(invalidLog);
      expect(result.success).toBe(false);
    });

    it('should allow optional fields', () => {
      const validLog = {
        action: 'view_document',
        resourceType: 'document',
        resourceId: 'doc-123',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0',
      };
      const result = insertActivityLogSchema.safeParse(validLog);
      expect(result.success).toBe(true);
    });
  });

  describe('insertEmailSchema', () => {
    it('should validate a valid email', () => {
      const validEmail = {
        outlookId: 'outlook-msg-123',
        from: 'sender@example.com',
        receivedAt: new Date(),
      };
      const result = insertEmailSchema.safeParse(validEmail);
      expect(result.success).toBe(true);
    });

    it('should require outlookId field', () => {
      const invalidEmail = {
        from: 'sender@example.com',
        receivedAt: new Date(),
      };
      const result = insertEmailSchema.safeParse(invalidEmail);
      expect(result.success).toBe(false);
    });

    it('should require from field', () => {
      const invalidEmail = {
        outlookId: 'outlook-msg-123',
        receivedAt: new Date(),
      };
      const result = insertEmailSchema.safeParse(invalidEmail);
      expect(result.success).toBe(false);
    });

    it('should validate email with all fields', () => {
      const validEmail = {
        outlookId: 'outlook-msg-123',
        userId: 'user-123',
        subject: 'Test Subject',
        from: 'sender@example.com',
        to: ['recipient@example.com'],
        cc: ['cc@example.com'],
        body: 'Email body content',
        receivedAt: new Date(),
        isRead: false,
        hasAttachments: true,
        importance: 'normal',
        conversationId: 'conv-123',
      };
      const result = insertEmailSchema.safeParse(validEmail);
      expect(result.success).toBe(true);
    });
  });

  describe('upsertUserSchema', () => {
    it('should validate a valid user', () => {
      const validUser = {
        id: 'user-123',
        email: 'test@example.com',
      };
      const result = upsertUserSchema.safeParse(validUser);
      expect(result.success).toBe(true);
    });

    it('should allow empty object (all fields optional)', () => {
      const validUser = {};
      const result = upsertUserSchema.safeParse(validUser);
      expect(result.success).toBe(true);
    });

    it('should validate user with all fields', () => {
      const validUser = {
        id: 'user-123',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        profileImageUrl: 'https://example.com/avatar.jpg',
        role: 'employee',
        department: 'Engineering',
      };
      const result = upsertUserSchema.safeParse(validUser);
      expect(result.success).toBe(true);
    });
  });
});
