import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  MessageSquare, 
  Upload, 
  Calendar, 
  Users, 
  RefreshCw, 
  CheckSquare,
  Clock,
  Building2,
  FileText,
  Network
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Meeting } from "@shared/schema";

// Type for action items that can come from the JSONB field
type ActionItem = 
  | string 
  | {
      title?: string;
      task?: string;
      assignee?: string;
      deadline?: string;
      [key: string]: any;
    };

export default function Meetings() {
  const { toast } = useToast();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  const { data: meetings, isLoading } = useQuery<Meeting[]>({
    queryKey: ["/api/meetings"],
  });

  // Helper function to safely get action items as an array
  const getActionItemsArray = (actionItems: unknown): ActionItem[] => {
    if (!actionItems) return [];
    if (Array.isArray(actionItems)) {
      return actionItems as ActionItem[];
    }
    return [];
  };

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      await apiRequest("POST", "/api/meetings/upload", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/meetings"] });
      toast({
        title: "Success",
        description: "Meeting notes uploaded and processed with AI",
      });
      setUploadDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const syncTeamsMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/teams/sync", {
        method: "GET",
        credentials: "include",
      });
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to sync Teams meetings");
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/meetings"] });
      toast({
        title: "Teams Sync Complete",
        description: `Successfully synced ${data.synced} new meeting${data.synced !== 1 ? 's' : ''}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Sync Failed",
        description: error.message || "Failed to sync Teams meetings",
        variant: "destructive",
      });
    },
  });

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    uploadMutation.mutate(formData);
  };

  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case "teams":
        return <Building2 className="h-3 w-3" />;
      case "hubspot":
        return <Network className="h-3 w-3" />;
      case "manual":
        return <FileText className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getSourceVariant = (source: string): "default" | "secondary" | "outline" => {
    switch (source.toLowerCase()) {
      case "teams":
        return "default";
      case "hubspot":
        return "outline";
      default:
        return "secondary";
    }
  };

  const countActionItems = (actionItems: unknown): number => {
    return getActionItemsArray(actionItems).length;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Meetings</h1>
          <p className="text-muted-foreground">
            View meeting notes, AI summaries, and extracted action items
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => syncTeamsMutation.mutate()}
            disabled={syncTeamsMutation.isPending}
            data-testid="button-sync-teams"
          >
            {syncTeamsMutation.isPending ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <Building2 className="h-4 w-4 mr-2" />
                Sync Teams Meetings
              </>
            )}
          </Button>
          
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-upload-meeting">
                <Upload className="h-4 w-4 mr-2" />
                Upload Meeting Notes
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Upload Meeting Notes</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    name="title"
                    placeholder="Meeting title"
                    required
                    data-testid="input-meeting-title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Description
                  </label>
                  <Textarea
                    name="description"
                    placeholder="Brief description"
                    data-testid="textarea-meeting-description"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Meeting Date
                  </label>
                  <Input
                    type="datetime-local"
                    name="meetingDate"
                    required
                    data-testid="input-meeting-date"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Transcript/Notes
                  </label>
                  <Textarea
                    name="transcript"
                    placeholder="Paste meeting transcript or notes here..."
                    className="min-h-48"
                    required
                    data-testid="textarea-meeting-transcript"
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={uploadMutation.isPending}
                    data-testid="button-submit-meeting"
                  >
                    {uploadMutation.isPending
                      ? "Processing with AI..."
                      : "Upload & Process"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading || syncTeamsMutation.isPending ? (
        <div className="grid grid-cols-1 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : meetings && meetings.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {meetings.map((meeting) => {
            const actionItemCount = countActionItems(meeting.actionItems);
            
            return (
              <Card
                key={meeting.id}
                className="hover-elevate cursor-pointer"
                onClick={() => setSelectedMeeting(meeting)}
                data-testid={`meeting-card-${meeting.id}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">
                        {meeting.title}
                      </CardTitle>
                      {meeting.description && (
                        <p className="text-sm text-muted-foreground">
                          {meeting.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {actionItemCount > 0 && (
                        <Badge 
                          variant="outline" 
                          className="gap-1"
                          data-testid={`action-items-badge-${meeting.id}`}
                        >
                          <CheckSquare className="h-3 w-3" />
                          {actionItemCount}
                        </Badge>
                      )}
                      <Badge 
                        variant={getSourceVariant(meeting.source)}
                        className="gap-1"
                        data-testid={`source-badge-${meeting.id}`}
                      >
                        {getSourceIcon(meeting.source)}
                        {meeting.source}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span data-testid={`meeting-date-${meeting.id}`}>
                        {new Date(meeting.meetingDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      <span data-testid={`meeting-time-${meeting.id}`}>
                        {new Date(meeting.meetingDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    {meeting.attendees && meeting.attendees.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        <span data-testid={`attendees-count-${meeting.id}`}>
                          {meeting.attendees.length} attendee{meeting.attendees.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                  {meeting.summary && (
                    <div>
                      <h4 className="text-sm font-semibold mb-2">AI Summary</h4>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {meeting.summary}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium mb-2">No meetings yet</p>
            <p className="text-muted-foreground mb-4">
              Upload meeting notes or sync from Teams to get AI-powered summaries and action items
            </p>
          </CardContent>
        </Card>
      )}

      {selectedMeeting && (
        <Dialog
          open={!!selectedMeeting}
          onOpenChange={() => setSelectedMeeting(null)}
        >
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{selectedMeeting.title}</span>
                <Badge 
                  variant={getSourceVariant(selectedMeeting.source)}
                  className="gap-1 ml-4"
                >
                  {getSourceIcon(selectedMeeting.source)}
                  {selectedMeeting.source}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold mb-2">Details</h4>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span data-testid="meeting-detail-date">
                      {new Date(selectedMeeting.meetingDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span data-testid="meeting-detail-time">
                      {new Date(selectedMeeting.meetingDate).toLocaleTimeString()}
                    </span>
                  </div>
                  {selectedMeeting.attendees && selectedMeeting.attendees.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      <span data-testid="meeting-detail-attendees">
                        {selectedMeeting.attendees.length} attendee{selectedMeeting.attendees.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>
                {selectedMeeting.attendees && selectedMeeting.attendees.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-2">Attendees:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedMeeting.attendees.map((attendee, idx) => (
                        <Badge 
                          key={idx} 
                          variant="outline"
                          data-testid={`attendee-badge-${idx}`}
                        >
                          {attendee}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedMeeting.summary && (
                <div>
                  <h4 className="text-sm font-semibold mb-2">AI Summary</h4>
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm whitespace-pre-wrap">
                        {selectedMeeting.summary}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {(() => {
                const actionItems = getActionItemsArray(selectedMeeting.actionItems);
                if (actionItems.length === 0) return null;
                
                return (
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      Action Items (AI-Extracted)
                      <Badge variant="secondary" className="text-xs">
                        {actionItems.length} items
                      </Badge>
                    </h4>
                    <div className="space-y-2">
                      {actionItems.map((item, idx) => {
                        // Handle both string and object action items
                        const isString = typeof item === 'string';
                        const itemText = isString 
                          ? item 
                          : (item.title || item.task || JSON.stringify(item));
                        const itemAssignee = !isString && typeof item === 'object' ? item.assignee : undefined;
                        const itemDeadline = !isString && typeof item === 'object' ? item.deadline : undefined;
                        
                        return (
                          <Card key={idx}>
                            <CardContent className="pt-4">
                              <p className="text-sm font-medium mb-1">
                                {itemText}
                              </p>
                              {itemAssignee && (
                                <p className="text-xs text-muted-foreground">
                                  Assigned to: {itemAssignee}
                                </p>
                              )}
                              {itemDeadline && (
                                <p className="text-xs text-muted-foreground">
                                  Due: {itemDeadline}
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {selectedMeeting.transcript && (
                <div>
                  <h4 className="text-sm font-semibold mb-2">Transcript</h4>
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm whitespace-pre-wrap font-mono">
                        {selectedMeeting.transcript}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}