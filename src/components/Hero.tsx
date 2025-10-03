// components/Hero.tsx
import { useState } from "react";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoShowcase } from "./DemoShowcase";

interface HeroProps {
  onStartPlanning: () => void;
}

export const Hero = ({ onStartPlanning }: HeroProps) => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <>
      <div className="min-h-[90vh] flex items-center justify-center bg-gradient-hero relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute rounded-full top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-3xl animate-pulse" />
          <div className="absolute delay-700 rounded-full bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 blur-3xl animate-pulse" />
        </div>

        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full bg-card/50 backdrop-blur-sm border-border">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">AI-Powered Project Planning</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
              <span className="text-transparent bg-gradient-primary bg-clip-text">
                Plan First,
              </span>
              <br />
              <span className="text-foreground">Code Later</span>
            </h1>

            {/* Subheading */}
            <p className="max-w-2xl mx-auto text-xl leading-relaxed text-muted-foreground">
              Transform your project ideas into structured, actionable plans. Break down complex projects into phases, tasks, and subtasks with AI assistance.
            </p>

            {/* CTA */}
            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <Button 
                size="lg" 
                onClick={onStartPlanning}
                className="transition-all duration-300 group bg-gradient-primary hover:shadow-glow"
              >
                Start Planning
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setShowDemo(true)}
                className="bg-transparent border-border hover:bg-card/50 group"
              >
                <Play className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                View Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid max-w-2xl grid-cols-3 gap-8 pt-12 mx-auto">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-foreground">10x</div>
                <div className="text-sm text-muted-foreground">Faster Planning</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-foreground">AI-Powered</div>
                <div className="text-sm text-muted-foreground">Smart Breakdown</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Organized</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DemoShowcase 
        isOpen={showDemo}
        onClose={() => setShowDemo(false)}
        onStartPlanning={() => {
          setShowDemo(false);
          onStartPlanning();
        }}
      />
    </>
  );
};