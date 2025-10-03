import { Layers, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  currentView: string;
  isDemoMode: boolean;
  onNavigate: (view: "hero" | "input" | "plan" | "history") => void;
  onNewPlan: () => void;
}

export const Navbar = ({ currentView, onNavigate, onNewPlan, isDemoMode }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md border-border">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => onNavigate("hero")}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-primary">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">PlanLayer</span>
          </button>

          <div className="flex items-center gap-6 text-sm">
            <button
              onClick={() => onNavigate("hero")}
              className={`text-muted-foreground hover:text-foreground transition-colors ${
                currentView === "hero" ? "text-foreground font-medium" : ""
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate("history")}
              className={`text-muted-foreground hover:text-foreground transition-colors ${
                currentView === "history" ? "text-foreground font-medium" : ""
              }`}
            >
              My Plans
            </button>
            {(currentView === "plan" || currentView === "history") && (
              <Button onClick={onNewPlan} size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                New Plan
              </Button>
            )}

            {currentView === "plan" && isDemoMode && (
  <div className="px-3 py-1 text-xs rounded-full bg-accent text-accent-foreground">
    Demo Mode
  </div>
)}
          </div>
        </div>
      </div>
    </nav>
  );
};
