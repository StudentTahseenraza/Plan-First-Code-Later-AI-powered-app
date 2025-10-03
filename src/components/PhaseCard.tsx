import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TaskCard, Task, TaskStatus } from "./TaskCard";
import { Button } from "@/components/ui/button";

export interface Phase {
  id: string;
  name: string;
  tasks: Task[];
}

interface PhaseCardProps {
  phase: Phase;
  onTaskStatusChange: (phaseId: string, taskId: string, newStatus: TaskStatus) => void;
}

export const PhaseCard = ({ phase, onTaskStatusChange }: PhaseCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const completedTasks = phase.tasks.filter((t) => t.status === "done").length;
  const totalTasks = phase.tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Card className="p-6 bg-gradient-card border-border shadow-card">
      <div className="space-y-4">
        {/* Phase Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-0 h-auto hover:bg-transparent"
              >
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </Button>
              <h3 className="text-xl font-semibold text-foreground">{phase.name}</h3>
            </div>
            <div className="text-sm text-muted-foreground">
              {completedTasks}/{totalTasks} tasks
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Tasks */}
        {isExpanded && (
          <div className="space-y-3 pt-2">
            {phase.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={(taskId, newStatus) =>
                  onTaskStatusChange(phase.id, taskId, newStatus)
                }
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
