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
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckSquare, Plus, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Task } from "@shared/schema";

export default function Tasks() {
  const { toast } = useToast();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ["/api/tasks/my-tasks"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/tasks", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks/my-tasks"] });
      toast({
        title: "Success",
        description: "Task created successfully",
      });
      setCreateDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await apiRequest("PATCH", `/api/tasks/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks/my-tasks"] });
      toast({
        title: "Success",
        description: "Task status updated",
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

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      priority: formData.get("priority"),
      dueDate: formData.get("dueDate")
        ? new Date(formData.get("dueDate") as string)
        : null,
      source: "manual",
    };
    createMutation.mutate(data);
  };

  const filteredTasks = tasks?.filter((task) => {
    if (statusFilter === "all") return true;
    return task.status === statusFilter;
  });

  const groupedTasks = {
    pending: filteredTasks?.filter((t) => t.status === "pending") || [],
    in_progress: filteredTasks?.filter((t) => t.status === "in_progress") || [],
    completed: filteredTasks?.filter((t) => t.status === "completed") || [],
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tasks</h1>
          <p className="text-muted-foreground">
            Manage your action items and track progress
          </p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-task">
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Add a new task to track your action items and deadlines.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input
                  name="title"
                  placeholder="Task title"
                  required
                  data-testid="input-task-title"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Description
                </label>
                <Textarea
                  name="description"
                  placeholder="Task description"
                  data-testid="textarea-task-description"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Priority
                </label>
                <Select name="priority" defaultValue="medium">
                  <SelectTrigger data-testid="select-task-priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Due Date
                </label>
                <Input
                  type="date"
                  name="dueDate"
                  data-testid="input-task-due-date"
                />
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={createMutation.isPending}
                  data-testid="button-submit-task"
                >
                  {createMutation.isPending ? "Creating..." : "Create Task"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48" data-testid="select-filter-status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {statusFilter === "all" ? (
            <>
              {groupedTasks.pending.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-500" />
                    Pending ({groupedTasks.pending.length})
                  </h2>
                  <div className="space-y-3">
                    {groupedTasks.pending.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onStatusChange={(status) =>
                          updateStatusMutation.mutate({ id: task.id, status })
                        }
                      />
                    ))}
                  </div>
                </div>
              )}

              {groupedTasks.in_progress.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    In Progress ({groupedTasks.in_progress.length})
                  </h2>
                  <div className="space-y-3">
                    {groupedTasks.in_progress.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onStatusChange={(status) =>
                          updateStatusMutation.mutate({ id: task.id, status })
                        }
                      />
                    ))}
                  </div>
                </div>
              )}

              {groupedTasks.completed.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Completed ({groupedTasks.completed.length})
                  </h2>
                  <div className="space-y-3">
                    {groupedTasks.completed.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onStatusChange={(status) =>
                          updateStatusMutation.mutate({ id: task.id, status })
                        }
                      />
                    ))}
                  </div>
                </div>
              )}

              {tasks && tasks.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <CheckSquare className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg font-medium mb-2">No tasks yet</p>
                    <p className="text-muted-foreground mb-4">
                      Create your first task to get started
                    </p>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <div className="space-y-3">
              {filteredTasks && filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={(status) =>
                      updateStatusMutation.mutate({ id: task.id, status })
                    }
                  />
                ))
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <CheckSquare className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg font-medium mb-2">No tasks found</p>
                    <p className="text-muted-foreground">
                      Try adjusting your filters
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TaskCard({
  task,
  onStatusChange,
}: {
  task: Task;
  onStatusChange: (status: string) => void;
}) {
  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "completed";

  return (
    <Card
      className={`hover-elevate ${isOverdue ? "border-destructive/20" : ""}`}
      data-testid={`task-card-${task.id}`}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base mb-2">{task.title}</CardTitle>
            {task.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {task.description}
              </p>
            )}
          </div>
          <Select value={task.status} onValueChange={onStatusChange}>
            <SelectTrigger
              className="w-36"
              data-testid={`select-status-${task.id}`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            variant={
              task.priority === "urgent" || task.priority === "high"
                ? "destructive"
                : "secondary"
            }
          >
            {task.priority}
          </Badge>
          {task.source !== "manual" && (
            <Badge variant="outline">AI-generated</Badge>
          )}
          {task.dueDate && (
            <div
              className={`flex items-center gap-1.5 text-sm ${
                isOverdue ? "text-destructive" : "text-muted-foreground"
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {isOverdue ? "Overdue: " : "Due: "}
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
