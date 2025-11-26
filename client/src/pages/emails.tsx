import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Mail, Search, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Email } from "@shared/schema";

export default function Emails() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [syncing, setSyncing] = useState(false);

  const { data: emails, isLoading } = useQuery<Email[]>({
    queryKey: ["/api/emails", searchQuery],
  });

  const handleSync = async () => {
    setSyncing(true);
    try {
      await apiRequest("POST", "/api/emails/sync", {});
      queryClient.invalidateQueries({ queryKey: ["/api/emails"] });
      toast({
        title: "Success",
        description: "Emails synced from Outlook",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSyncing(false);
    }
  };

  const filteredEmails = emails?.filter(
    (email) =>
      !searchQuery ||
      email.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Emails</h1>
          <p className="text-muted-foreground">
            View and search your Outlook emails
          </p>
        </div>
        <Button
          onClick={handleSync}
          disabled={syncing}
          variant="outline"
          data-testid="button-sync-emails"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${syncing ? "animate-spin" : ""}`}
          />
          {syncing ? "Syncing..." : "Sync Emails"}
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-emails"
            />
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      ) : filteredEmails && filteredEmails.length > 0 ? (
        <div className="space-y-3">
          {filteredEmails.map((email) => (
            <Card
              key={email.id}
              className={`hover-elevate cursor-pointer ${
                !email.isRead ? "border-primary/30 bg-primary/5" : ""
              }`}
              onClick={() => setSelectedEmail(email)}
              data-testid={`email-card-${email.id}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm truncate">
                        {email.from}
                      </span>
                      {!email.isRead && (
                        <Badge variant="default" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-medium text-base truncate">
                      {email.subject || "(No subject)"}
                    </h3>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(email.receivedAt).toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {email.body?.replace(/<[^>]*>/g, "").substring(0, 200) ||
                    "No preview available"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Mail className="h-16 w-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium mb-2">No emails found</p>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? "Try adjusting your search"
                : "Sync your Outlook emails to get started"}
            </p>
          </CardContent>
        </Card>
      )}

      {selectedEmail && (
        <Dialog
          open={!!selectedEmail}
          onOpenChange={() => setSelectedEmail(null)}
        >
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedEmail.subject || "(No subject)"}
              </DialogTitle>
              <DialogDescription>
                View the full email content and details.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">From:</span>{" "}
                  <span className="text-muted-foreground">
                    {selectedEmail.from}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Date:</span>{" "}
                  <span className="text-muted-foreground">
                    {new Date(selectedEmail.receivedAt).toLocaleString()}
                  </span>
                </div>
                {selectedEmail.to && selectedEmail.to.length > 0 && (
                  <div className="col-span-2">
                    <span className="font-medium">To:</span>{" "}
                    <span className="text-muted-foreground">
                      {selectedEmail.to.join(", ")}
                    </span>
                  </div>
                )}
                {selectedEmail.cc && selectedEmail.cc.length > 0 && (
                  <div className="col-span-2">
                    <span className="font-medium">CC:</span>{" "}
                    <span className="text-muted-foreground">
                      {selectedEmail.cc.join(", ")}
                    </span>
                  </div>
                )}
              </div>
              <Card>
                <CardContent className="pt-6">
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: selectedEmail.body || "No content",
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
