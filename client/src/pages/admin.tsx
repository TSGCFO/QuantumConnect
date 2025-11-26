import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Settings,
  UserPlus,
  Shield,
  AlertCircle,
  Link2,
  Link2Off,
  Search,
  CheckCircle2,
  XCircle,
  Cloud,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { User, MsUserProfile } from "@shared/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserWithM365 extends User {
  msProfile: MsUserProfile | null;
  isLinked: boolean;
}

interface M365User {
  id: string;
  displayName: string;
  mail: string;
  userPrincipalName: string;
  jobTitle?: string;
  department?: string;
  officeLocation?: string;
}

interface GraphStatus {
  configured: boolean;
  connected: boolean;
  organization?: string;
  organizationId?: string;
  message: string;
  error?: string;
  missing?: string[];
}

export default function Admin() {
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [linkingUser, setLinkingUser] = useState<UserWithM365 | null>(null);
  const [selectedM365User, setSelectedM365User] = useState<M365User | null>(null);
  const [m365SearchQuery, setM365SearchQuery] = useState("");

  // Fetch portal users with M365 link status
  const { data: users, isLoading: usersLoading } = useQuery<UserWithM365[]>({
    queryKey: ["/api/admin/users"],
  });

  // Fetch Graph API status
  const { data: graphStatus, isLoading: graphStatusLoading } = useQuery<GraphStatus>({
    queryKey: ["/api/graph/status"],
  });

  // Fetch M365 users
  const { data: m365Users, isLoading: m365UsersLoading, refetch: refetchM365Users } = useQuery<M365User[]>({
    queryKey: ["/api/graph/users"],
    enabled: graphStatus?.connected === true,
  });

  // Update user role/department mutation
  const updateUserMutation = useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: any }) => {
      await apiRequest("PATCH", `/api/admin/users/${userId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Success",
        description: "User updated successfully",
      });
      setEditingUser(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Link M365 account mutation
  const linkM365Mutation = useMutation({
    mutationFn: async ({ userId, m365User }: { userId: string; m365User: M365User }) => {
      await apiRequest("POST", `/api/admin/users/${userId}/link-m365`, {
        msUserId: m365User.id,
        displayName: m365User.displayName,
        mail: m365User.mail,
        jobTitle: m365User.jobTitle,
        department: m365User.department,
        officeLocation: m365User.officeLocation,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Success",
        description: "Microsoft 365 account linked successfully",
      });
      setLinkingUser(null);
      setSelectedM365User(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Unlink M365 account mutation
  const unlinkM365Mutation = useMutation({
    mutationFn: async (userId: string) => {
      await apiRequest("DELETE", `/api/admin/users/${userId}/link-m365`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Success",
        description: "Microsoft 365 account unlinked successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleUpdateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingUser) return;
    const formData = new FormData(e.currentTarget);
    const data = {
      role: formData.get("role"),
      department: formData.get("department"),
    };
    updateUserMutation.mutate({ userId: editingUser.id, data });
  };

  const handleLinkM365 = () => {
    if (!linkingUser || !selectedM365User) return;
    linkM365Mutation.mutate({ userId: linkingUser.id, m365User: selectedM365User });
  };

  // Filter M365 users based on search query and exclude already linked users
  const linkedM365Ids = new Set(
    users?.filter(u => u.msProfile?.msUserId).map(u => u.msProfile!.msUserId) || []
  );
  
  const filteredM365Users = m365Users?.filter(u => {
    const matchesSearch = m365SearchQuery === "" ||
      u.displayName?.toLowerCase().includes(m365SearchQuery.toLowerCase()) ||
      u.mail?.toLowerCase().includes(m365SearchQuery.toLowerCase()) ||
      u.userPrincipalName?.toLowerCase().includes(m365SearchQuery.toLowerCase());
    const notLinked = !linkedM365Ids.has(u.id);
    return matchesSearch && notLinked;
  }) || [];

  if (currentUser?.role !== "admin") {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <Card>
          <CardContent className="text-center py-12">
            <AlertCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
            <p className="text-lg font-medium mb-2">Access Restricted</p>
            <p className="text-muted-foreground">
              This page is only available to administrators
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Administration</h1>
          <p className="text-muted-foreground">
            Manage employee profiles, roles, and Microsoft 365 connections
          </p>
        </div>
      </div>

      {/* Microsoft 365 Connection Status */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            Microsoft 365 Connection
          </CardTitle>
          <CardDescription>
            Connect portal users to their Microsoft 365 accounts to enable calendar, email, and Teams sync
          </CardDescription>
        </CardHeader>
        <CardContent>
          {graphStatusLoading ? (
            <Skeleton className="h-12 w-full" />
          ) : graphStatus?.connected ? (
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">
                  Connected to {graphStatus.organization}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Microsoft Graph API is active and ready for syncing
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200">
                  {graphStatus?.configured ? "Connection Failed" : "Not Configured"}
                </p>
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  {graphStatus?.message || "Azure AD credentials are required"}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Management Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users" data-testid="tab-users">
            <Shield className="h-4 w-4 mr-2" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="m365" data-testid="tab-m365">
            <Link2 className="h-4 w-4 mr-2" />
            M365 Linking
          </TabsTrigger>
        </TabsList>

        {/* User Management Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Portal Users</CardTitle>
              <CardDescription>
                Manage user roles and departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {usersLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-20" />
                  ))}
                </div>
              ) : users && users.length > 0 ? (
                <div className="space-y-3">
                  {users.map((user) => {
                    const initials =
                      `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() ||
                      "U";
                    return (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 rounded-md border hover-elevate"
                        data-testid={`user-row-${user.id}`}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.profileImageUrl || undefined} />
                            <AvatarFallback>{initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {user.firstName && user.lastName
                                ? `${user.firstName} ${user.lastName}`
                                : user.email}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <Badge
                              variant={
                                user.role === "admin"
                                  ? "destructive"
                                  : user.role === "manager"
                                    ? "default"
                                    : "secondary"
                              }
                              className="mb-1"
                            >
                              {user.role}
                            </Badge>
                            {user.department && (
                              <p className="text-xs text-muted-foreground">
                                {user.department}
                              </p>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingUser(user)}
                            data-testid={`button-edit-${user.id}`}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <UserPlus className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>No users found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* M365 Linking Tab */}
        <TabsContent value="m365">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Microsoft 365 Account Linking</CardTitle>
                  <CardDescription>
                    Link portal users to their Microsoft 365 accounts to enable data sync
                  </CardDescription>
                </div>
                {graphStatus?.connected && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => refetchM365Users()}
                    disabled={m365UsersLoading}
                    data-testid="button-refresh-m365"
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${m365UsersLoading ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!graphStatus?.connected ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Cloud className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p className="font-medium mb-1">Microsoft 365 Not Connected</p>
                  <p className="text-sm">Configure Azure AD credentials to enable account linking</p>
                </div>
              ) : usersLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-20" />
                  ))}
                </div>
              ) : users && users.length > 0 ? (
                <div className="space-y-3">
                  {users.map((user) => {
                    const initials =
                      `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() ||
                      "U";
                    return (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 rounded-md border hover-elevate"
                        data-testid={`m365-user-row-${user.id}`}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.profileImageUrl || undefined} />
                            <AvatarFallback>{initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {user.firstName && user.lastName
                                ? `${user.firstName} ${user.lastName}`
                                : user.email}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {user.isLinked && user.msProfile ? (
                            <>
                              <div className="text-right">
                                <div className="flex items-center gap-1 text-green-600">
                                  <CheckCircle2 className="h-4 w-4" />
                                  <span className="text-sm font-medium">Linked</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {user.msProfile.department || user.msProfile.jobTitle || "M365 Connected"}
                                </p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => unlinkM365Mutation.mutate(user.id)}
                                disabled={unlinkM365Mutation.isPending}
                                data-testid={`button-unlink-${user.id}`}
                              >
                                <Link2Off className="h-4 w-4 mr-1" />
                                Unlink
                              </Button>
                            </>
                          ) : (
                            <>
                              <div className="text-right">
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <XCircle className="h-4 w-4" />
                                  <span className="text-sm">Not Linked</span>
                                </div>
                              </div>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => {
                                  setLinkingUser(user);
                                  setSelectedM365User(null);
                                  setM365SearchQuery("");
                                }}
                                data-testid={`button-link-${user.id}`}
                              >
                                <Link2 className="h-4 w-4 mr-1" />
                                Link
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <UserPlus className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>No users found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit User Dialog */}
      {editingUser && (
        <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input
                  value={editingUser.email || ""}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Role</label>
                <Select name="role" defaultValue={editingUser.role}>
                  <SelectTrigger data-testid="select-user-role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Department
                </label>
                <Input
                  name="department"
                  defaultValue={editingUser.department || ""}
                  placeholder="e.g., Operations, Sales, IT"
                  data-testid="input-user-department"
                />
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={updateUserMutation.isPending}
                  data-testid="button-submit-user-update"
                >
                  {updateUserMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Link M365 Account Dialog */}
      {linkingUser && (
        <Dialog open={!!linkingUser} onOpenChange={() => setLinkingUser(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Link Microsoft 365 Account</DialogTitle>
              <DialogDescription>
                Select the Microsoft 365 account to link with{" "}
                <strong>
                  {linkingUser.firstName && linkingUser.lastName
                    ? `${linkingUser.firstName} ${linkingUser.lastName}`
                    : linkingUser.email}
                </strong>
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Search input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search Microsoft 365 users..."
                  value={m365SearchQuery}
                  onChange={(e) => setM365SearchQuery(e.target.value)}
                  className="pl-9"
                  data-testid="input-m365-search"
                />
              </div>

              {/* M365 Users List */}
              <div className="border rounded-md max-h-64 overflow-y-auto">
                {m365UsersLoading ? (
                  <div className="p-4 space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-12" />
                    ))}
                  </div>
                ) : filteredM365Users.length > 0 ? (
                  <div className="divide-y">
                    {filteredM365Users.map((m365User) => (
                      <div
                        key={m365User.id}
                        className={`flex items-center gap-3 p-3 cursor-pointer hover-elevate ${
                          selectedM365User?.id === m365User.id
                            ? "bg-primary/10 border-l-2 border-l-primary"
                            : ""
                        }`}
                        onClick={() => setSelectedM365User(m365User)}
                        data-testid={`m365-option-${m365User.id}`}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {m365User.displayName?.[0]?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{m365User.displayName}</p>
                          <p className="text-sm text-muted-foreground truncate">
                            {m365User.mail || m365User.userPrincipalName}
                          </p>
                        </div>
                        {selectedM365User?.id === m365User.id && (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <Search className="h-8 w-8 mx-auto mb-2 opacity-20" />
                    <p>No matching Microsoft 365 users found</p>
                    {m365SearchQuery && (
                      <p className="text-sm mt-1">Try a different search term</p>
                    )}
                  </div>
                )}
              </div>

              {/* Selected User Preview */}
              {selectedM365User && (
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium mb-1">Selected Account:</p>
                  <p className="font-medium">{selectedM365User.displayName}</p>
                  <p className="text-sm text-muted-foreground">{selectedM365User.mail}</p>
                  {selectedM365User.jobTitle && (
                    <p className="text-sm text-muted-foreground">{selectedM365User.jobTitle}</p>
                  )}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setLinkingUser(null)}>
                Cancel
              </Button>
              <Button
                onClick={handleLinkM365}
                disabled={!selectedM365User || linkM365Mutation.isPending}
                data-testid="button-confirm-link"
              >
                {linkM365Mutation.isPending ? "Linking..." : "Link Account"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
