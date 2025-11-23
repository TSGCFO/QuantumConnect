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
import { MessageSquare, Upload, Calendar, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Meeting } from "@shared/schema";

export default function Meetings() {
  const { toast } = useToast();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  const { data: meetings, isLoading } = useQuery<Meeting[]>({
    queryKey: ["/api/meetings"],
  });

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

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    uploadMutation.mutate(formData);
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

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : meetings && meetings.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {meetings.map((meeting) => (
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
                  <Badge variant="secondary">{meeting.source}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(meeting.meetingDate).toLocaleDateString()}
                    </span>
                  </div>
                  {meeting.attendees && meeting.attendees.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      <span>{meeting.attendees.length} attendees</span>
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
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium mb-2">No meetings yet</p>
            <p className="text-muted-foreground mb-4">
              Upload meeting notes to get AI-powered summaries and action items
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
              <DialogTitle>{selectedMeeting.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold mb-2">Details</h4>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(selectedMeeting.meetingDate).toLocaleString()}
                    </span>
                  </div>
                  <Badge variant="secondary">{selectedMeeting.source}</Badge>
                </div>
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

              {selectedMeeting.actionItems &&
                Array.isArray(selectedMeeting.actionItems) &&
                (selectedMeeting.actionItems as any[]).length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2">
                      Action Items (AI-Extracted)
                    </h4>
                    <div className="space-y-2">
                      {(selectedMeeting.actionItems as any[]).map(
                        (item: any, idx: number) => (
                          <Card key={idx}>
                            <CardContent className="pt-4">
                              <p className="text-sm font-medium mb-1">
                                {item.title || item.task || item}
                              </p>
                              {item.assignee && (
                                <p className="text-xs text-muted-foreground">
                                  Assigned to: {item.assignee}
                                </p>
                              )}
                              {item.deadline && (
                                <p className="text-xs text-muted-foreground">
                                  Due: {item.deadline}
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        ),
                      )}
                    </div>
                  </div>
                )}

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
