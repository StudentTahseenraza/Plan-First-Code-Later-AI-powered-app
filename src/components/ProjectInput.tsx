import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ProjectInputProps {
  onGenerate: (description: string) => void;
  isGenerating: boolean;
}

export const ProjectInput = ({ onGenerate, isGenerating }: ProjectInputProps) => {
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onGenerate(description);
    }
  };

  const examples = [
    "Build a Todo app with user authentication and cloud storage",
    "Create an e-commerce platform with payment integration",
    "Develop a social media dashboard with real-time analytics",
  ];

  return (
    <div className="min-h-screen bg-gradient-hero py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <Card className="p-8 bg-gradient-card border-border shadow-card">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold text-foreground">Describe Your Project</h2>
              <p className="text-muted-foreground">
                Tell us what you want to build, and we'll create a structured plan
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="Example: Build a task management app with team collaboration, real-time updates, and mobile support..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[200px] bg-background/50 border-border resize-none text-foreground placeholder:text-muted-foreground"
                disabled={isGenerating}
              />

              <Button
                type="submit"
                size="lg"
                disabled={!description.trim() || isGenerating}
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Plan...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Plan
                  </>
                )}
              </Button>
            </form>

            {/* Example prompts */}
            <div className="space-y-3 pt-4">
              <p className="text-sm text-muted-foreground">Try these examples:</p>
              <div className="space-y-2">
                {examples.map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => setDescription(example)}
                    disabled={isGenerating}
                    className="w-full text-left px-4 py-3 rounded-lg bg-background/30 hover:bg-background/50 border border-border/50 hover:border-border transition-all text-sm text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
