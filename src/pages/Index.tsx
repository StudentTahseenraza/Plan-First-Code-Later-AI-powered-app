import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProjectInput } from "@/components/ProjectInput";
import { PlanBoard } from "@/components/PlanBoard";
import { Phase } from "@/components/PhaseCard";
import { TaskStatus } from "@/components/TaskCard";
import { useToast } from "@/hooks/use-toast";
import { getDemoPhases } from "@/lib/demoData";

type ViewState = "hero" | "input" | "plan" | "history";

interface SavedPlan {
  title: string;
  phases: Phase[];
  createdAt: string;
  updatedAt?: string;
}

const Index = () => {
  const [view, setView] = useState<ViewState>("hero");
  const [projectTitle, setProjectTitle] = useState("");
  const [phases, setPhases] = useState<Phase[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const { toast } = useToast();

  const [isDemoMode, setIsDemoMode] = useState(false);

const handleViewDemo = () => {
  setIsDemoMode(true);
  setProjectTitle("Sample Project: Task Management App");
  setPhases(getDemoPhases());
  setView("plan");
  
  toast({
    title: "Demo Mode Activated",
    description: "You're now viewing a sample project plan. Try interacting with the tasks!",
  });
};

  // Load saved plans from localStorage on mount
  useEffect(() => {
    const currentPlan = localStorage.getItem('currentPlan');
    if (currentPlan) {
      try {
        const plan = JSON.parse(currentPlan);
        setProjectTitle(plan.title);
        setPhases(plan.phases);
      } catch (error) {
        console.error('Error loading saved plan:', error);
      }
    }

    // Load all saved plans
    const plansHistory = localStorage.getItem('plansHistory');
    if (plansHistory) {
      try {
        setSavedPlans(JSON.parse(plansHistory));
      } catch (error) {
        console.error('Error loading plans history:', error);
      }
    }
  }, []);

  const handleStartPlanning = () => {
    setView("input");
  };

  const handleGeneratePlan = async (description: string) => {
    setIsGenerating(true);
    setProjectTitle(description);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-plan`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate plan');
      }

      const data = await response.json();
      setPhases(data.phases);
      setIsGenerating(false);
      setView("plan");
      
      // Save to localStorage
      const savedPlan = {
        title: description,
        phases: data.phases,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('currentPlan', JSON.stringify(savedPlan));

      toast({
        title: "Plan Generated!",
        description: "Your project plan is ready. Start managing tasks now.",
      });
    } catch (error) {
      console.error('Error generating plan:', error);
      setIsGenerating(false);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate plan. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTaskStatusChange = (
    phaseId: string,
    taskId: string,
    newStatus: TaskStatus
  ) => {
    setPhases((prevPhases) =>
      prevPhases.map((phase) =>
        phase.id === phaseId
          ? {
              ...phase,
              tasks: phase.tasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
              ),
            }
          : phase
      )
    );
  };

  const handleBack = () => {
    setView("input");
  };

  const handleSave = () => {
    const savedPlan: SavedPlan = {
      title: projectTitle,
      phases: phases,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Save current plan
    localStorage.setItem('currentPlan', JSON.stringify(savedPlan));
    
    // Add to history
    const plansHistory = localStorage.getItem('plansHistory');
    const plans: SavedPlan[] = plansHistory ? JSON.parse(plansHistory) : [];
    
    // Update existing plan or add new one
    const existingIndex = plans.findIndex(p => p.title === projectTitle);
    if (existingIndex >= 0) {
      plans[existingIndex] = savedPlan;
    } else {
      plans.unshift(savedPlan);
    }
    
    localStorage.setItem('plansHistory', JSON.stringify(plans));
    setSavedPlans(plans);
    
    toast({
      title: "Plan Saved!",
      description: "Your project plan has been saved successfully.",
    });
  };

  const handleNewPlan = () => {
    setProjectTitle("");
    setPhases([]);
    setView("input");
  };

  const handleLoadPlan = (plan: SavedPlan) => {
    setProjectTitle(plan.title);
    setPhases(plan.phases);
    setView("plan");
  };

  const handleDeletePlan = (planTitle: string) => {
    const plans = savedPlans.filter(p => p.title !== planTitle);
    localStorage.setItem('plansHistory', JSON.stringify(plans));
    setSavedPlans(plans);
    
    toast({
      title: "Plan Deleted",
      description: "The plan has been removed from history.",
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        currentView={view}
        isDemoMode={isDemoMode}
        onNavigate={setView}
        onNewPlan={handleNewPlan}
      />
      <div className="pt-16">
        {view === "hero" && 
        <Hero onStartPlanning={handleStartPlanning} 
        onViewDemo={handleViewDemo}/>
        }
        {view === "input" && (
          <ProjectInput
            onGenerate={handleGeneratePlan}
            isGenerating={isGenerating}
          />
        )}
        {view === "plan" && (
          <PlanBoard
            projectTitle={projectTitle}
            phases={phases}
            onTaskStatusChange={handleTaskStatusChange}
            onBack={handleBack}
            onSave={handleSave}
          />
        )}
        {view === "history" && (
          <div className="container px-4 py-12 mx-auto">
            <h1 className="mb-8 text-4xl font-bold text-center text-transparent bg-gradient-to-r from-primary to-primary-glow bg-clip-text">
              Saved Plans
            </h1>
            {savedPlans.length === 0 ? (
              <div className="py-12 text-center">
                <p className="mb-4 text-muted-foreground">No saved plans yet</p>
                <button
                  onClick={handleNewPlan}
                  className="px-6 py-3 transition-colors rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Create Your First Plan
                </button>
              </div>
            ) : (
              <div className="grid max-w-4xl gap-4 mx-auto">
                {savedPlans.map((plan, index) => (
                  <div
                    key={index}
                    className="p-6 transition-all border rounded-lg bg-card border-border hover:border-primary/50"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="mb-2 text-xl font-semibold">{plan.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {plan.phases.length} phases • {plan.phases.reduce((acc, p) => acc + p.tasks.length, 0)} tasks
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Created: {new Date(plan.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleLoadPlan(plan)}
                          className="px-4 py-2 transition-colors rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => handleDeletePlan(plan.title)}
                          className="px-4 py-2 transition-colors rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
