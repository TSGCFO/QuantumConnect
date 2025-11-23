import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Search, RefreshCw, Building2, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { HubspotCommunication } from "@shared/schema";

export default function Communications() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [syncing, setSyncing] = useState(false);

  const { data: communications, isLoading } = useQuery<HubspotCommunication[]>({
    queryKey: ["/api/communications", searchQuery],
  });

  const handleSync = async () => {
    setSyncing(true);
    try {
      await apiRequest("POST", "/api/communications/sync", {});
      queryClient.invalidateQueries({ queryKey: ["/api/communications"] });
      toast({
        title: "Success",
        description: "Communications synced from HubSpot",
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

  const filteredCommunications = communications?.filter(
    (comm) =>
      !searchQuery ||
      comm.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comm.contactName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comm.companyName?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Client Communications</h1>
          <p className="text-muted-foreground">
            Track interactions with clients and prospects from HubSpot
          </p>
        </div>
        <Button
          onClick={handleSync}
          disabled={syncing}
          variant="outline"
          data-testid="button-sync-communications"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? "animate-spin" : ""}`} />
          {syncing ? "Syncing..." : "Sync from HubSpot"}
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search communications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-communications"
            />
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : filteredCommunications && filteredCommunications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCommunications.map((comm) => (
            <Card
              key={comm.id}
              className="hover-elevate"
              data-testid={`communication-card-${comm.id}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge
                    variant={
                      comm.type === "meeting"
                        ? "default"
                        : comm.type === "call"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {comm.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(comm.occurredAt).toLocaleDateString()}
                  </span>
                </div>
                <CardTitle className="text-base">
                  {comm.subject || `${comm.type} communication`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {comm.contactName && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{comm.contactName}</span>
                      {comm.contactEmail && (
                        <span className="text-muted-foreground text-xs">
                          ({comm.contactEmail})
                        </span>
                      )}
                    </div>
                  )}
                  {comm.companyName && (
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{comm.companyName}</span>
                    </div>
                  )}
                  {comm.body && (
                    <p className="text-muted-foreground line-clamp-3 mt-3">
                      {comm.body}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-16 w-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium mb-2">
              No communications found
            </p>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? "Try adjusting your search"
                : "Sync from HubSpot to view client interactions"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
