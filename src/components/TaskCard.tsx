import { CheckCircle2, Circle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  subtasks: string[];
  status: TaskStatus;
}

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
}

export const TaskCard = ({ task, onStatusChange }: TaskCardProps) => {
  const getStatusIcon = () => {
    switch (task.status) {
      case "done":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-warning" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = () => {
    switch (task.status) {
      case "done":
        return "border-success/50 bg-success/5";
      case "in-progress":
        return "border-warning/50 bg-warning/5";
      default:
        return "border-border bg-card";
    }
  };

  const cycleStatus = () => {
    const statusOrder: TaskStatus[] = ["todo", "in-progress", "done"];
    const currentIndex = statusOrder.indexOf(task.status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    onStatusChange(task.id, statusOrder[nextIndex]);
  };

  return (
    <Card className={cn("p-4 transition-all duration-300 hover:shadow-lg", getStatusColor())}>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={cycleStatus}
            className="p-0 h-auto hover:bg-transparent"
          >
            {getStatusIcon()}
          </Button>
          <div className="flex-1 space-y-1">
            <h4 className={cn(
              "font-medium text-foreground",
              task.status === "done" && "line-through opacity-70"
            )}>
              {task.title}
            </h4>
            {task.subtasks.length > 0 && (
              <ul className="space-y-1 mt-2">
                {task.subtasks.map((subtask, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-accent">•</span>
                    <span>{subtask}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
