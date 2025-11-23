import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileText,
  CheckSquare,
  Mail,
  Users,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import type { Task } from "@shared/schema";

export default function Home() {
  const { user } = useAuth();

  const { data: tasks, isLoading: tasksLoading } = useQuery<Task[]>({
    queryKey: ["/api/tasks/my-tasks"],
  });

  const { data: stats, isLoading: statsLoading } = useQuery<{
    totalDocuments: number;
    pendingTasks: number;
    unreadEmails: number;
    recentMeetings: number;
  }>({
    queryKey: ["/api/dashboard/stats"],
  });

  const pendingTasks = tasks?.filter((t) => t.status === "pending") || [];
  const overdueTasks =
    tasks?.filter(
      (t) =>
        t.dueDate &&
        new Date(t.dueDate) < new Date() &&
        t.status !== "completed",
    ) || [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.firstName || "User"}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your work today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold" data-testid="stat-documents">
                {stats?.totalDocuments || 0}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              In knowledge hub
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {tasksLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div
                className="text-2xl font-bold"
                data-testid="stat-pending-tasks"
              >
                {pendingTasks.length}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Assigned to you
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Emails</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div
                className="text-2xl font-bold"
                data-testid="stat-unread-emails"
              >
                {stats?.unreadEmails || 0}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">In your inbox</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Meetings
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div
                className="text-2xl font-bold"
                data-testid="stat-recent-meetings"
              >
                {stats?.recentMeetings || 0}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              Your Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tasksLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : tasks && tasks.length > 0 ? (
              <div className="space-y-3">
                {tasks.slice(0, 5).map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 p-3 rounded-md border hover-elevate"
                    data-testid={`task-item-${task.id}`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm mb-1">{task.title}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant={
                            task.status === "completed"
                              ? "default"
                              : task.status === "in_progress"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {task.status.replace("_", " ")}
                        </Badge>
                        {task.priority && (
                          <Badge
                            variant={
                              task.priority === "urgent" ||
                              task.priority === "high"
                                ? "destructive"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {task.priority}
                          </Badge>
                        )}
                        {task.dueDate && (
                          <span className="text-xs text-muted-foreground">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CheckSquare className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>No tasks assigned</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Action Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tasksLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : overdueTasks.length > 0 ? (
              <div className="space-y-3">
                {overdueTasks.slice(0, 5).map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 p-3 rounded-md border border-destructive/20 bg-destructive/5"
                    data-testid={`overdue-task-${task.id}`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm mb-1">{task.title}</p>
                      <p className="text-xs text-destructive">
                        Overdue by{" "}
                        {Math.floor(
                          (new Date().getTime() -
                            new Date(task.dueDate!).getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        days
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>All caught up!</p>
                <p className="text-sm">No overdue items</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
