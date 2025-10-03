import { PhaseCard, Phase } from "./PhaseCard";
import { TaskStatus } from "./TaskCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlanBoardProps {
  projectTitle: string;
  phases: Phase[];
  onTaskStatusChange: (phaseId: string, taskId: string, newStatus: TaskStatus) => void;
  onBack: () => void;
  onSave: () => void;
}

export const PlanBoard = ({
  projectTitle,
  phases,
  onTaskStatusChange,
  onBack,
  onSave,
}: PlanBoardProps) => {
  const { toast } = useToast();

  const handleSave = () => {
    onSave();
    toast({
      title: "Plan Saved",
      description: "Your project plan has been saved successfully.",
    });
  };

  const totalTasks = phases.reduce((acc, phase) => acc + phase.tasks.length, 0);
  const completedTasks = phases.reduce(
    (acc, phase) => acc + phase.tasks.filter((t) => t.status === "done").length,
    0
  );
  const overallProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-hero py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Plan
            </Button>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">{projectTitle}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{phases.length} Phases</span>
              <span>•</span>
              <span>{totalTasks} Tasks</span>
              <span>•</span>
              <span>{Math.round(overallProgress)}% Complete</span>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-primary transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Phases */}
        <div className="space-y-6">
          {phases.map((phase) => (
            <PhaseCard
              key={phase.id}
              phase={phase}
              onTaskStatusChange={onTaskStatusChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
