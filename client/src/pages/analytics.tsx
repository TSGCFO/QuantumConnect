import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  CheckSquare,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function Analytics() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState("7d");

  const { data: analytics, isLoading } = useQuery<{
    taskStats: {
      total: number;
      completed: number;
      pending: number;
      overdue: number;
      completionRate: number;
    };
    departmentStats: Array<{
      department: string;
      totalTasks: number;
      completedTasks: number;
      completionRate: number;
    }>;
    userPerformance: Array<{
      userId: string;
      userName: string;
      completedTasks: number;
      pendingTasks: number;
      overdueTasks: number;
    }>;
  }>({
    queryKey: ["/api/analytics", timeRange],
    queryFn: async () => {
      const response = await fetch(`/api/analytics?timeRange=${timeRange}`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }
      return response.json();
    },
  });

  if (user?.role !== "manager" && user?.role !== "admin") {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <Card>
          <CardContent className="text-center py-12">
            <AlertCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
            <p className="text-lg font-medium mb-2">Access Restricted</p>
            <p className="text-muted-foreground">
              Analytics are only available to managers and administrators
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
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">
            Team performance metrics and task completion insights
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48" data-testid="select-time-range">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
          </div>
        </>
      ) : analytics ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Tasks
                </CardTitle>
                <CheckSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div
                  className="text-2xl font-bold"
                  data-testid="stat-total-tasks"
                >
                  {analytics.taskStats.total}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  All assigned tasks
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completion Rate
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div
                  className="text-2xl font-bold"
                  data-testid="stat-completion-rate"
                >
                  {analytics.taskStats.completionRate.toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Tasks completed on time
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Tasks
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div
                  className="text-2xl font-bold"
                  data-testid="stat-pending-tasks"
                >
                  {analytics.taskStats.pending}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  In progress or not started
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Overdue Tasks
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div
                  className="text-2xl font-bold text-destructive"
                  data-testid="stat-overdue-tasks"
                >
                  {analytics.taskStats.overdue}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Past due date
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
              </CardHeader>
              <CardContent>
                {analytics.departmentStats.length > 0 ? (
                  <div className="space-y-4">
                    {analytics.departmentStats.map((dept, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {dept.department || "Unassigned"}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {dept.completedTasks} / {dept.totalTasks} tasks
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-secondary rounded-full h-2">
                            <div
                              className="bg-primary rounded-full h-2"
                              style={{ width: `${dept.completionRate}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium min-w-12 text-right">
                            {dept.completionRate.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No department data available</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                {analytics.userPerformance.length > 0 ? (
                  <div className="space-y-3">
                    {analytics.userPerformance
                      .sort((a, b) => b.completedTasks - a.completedTasks)
                      .slice(0, 5)
                      .map((user, idx) => (
                        <div
                          key={user.userId}
                          className="flex items-center justify-between p-3 rounded-md border hover-elevate"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-sm">
                              {idx + 1}
                            </div>
                            <div>
                              <p className="font-medium text-sm">
                                {user.userName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {user.completedTasks} completed
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {user.pendingTasks > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                {user.pendingTasks} pending
                              </Badge>
                            )}
                            {user.overdueTasks > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {user.overdueTasks} overdue
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No user performance data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      ) : null}
    </div>
  );
}
