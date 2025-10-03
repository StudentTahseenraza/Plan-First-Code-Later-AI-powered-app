// components/DemoShowcase.tsx
import { useState } from "react";
import { Play, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phase } from "./PhaseCard";

const samplePhases: Phase[] = [
  {
    id: "demo-phase-1",
    name: "Planning & Research",
    tasks: [
      {
        id: "demo-task-1",
        title: "Define project requirements",
        status: "done",
        subtasks: [
          "Identify key features",
          "Document user stories",
          "Define success metrics"
        ]
      },
      {
        id: "demo-task-2",
        title: "Market research",
        status: "in-progress",
        subtasks: [
          "Competitor analysis",
          "User persona creation",
          "Market gap analysis"
        ]
      },
      {
        id: "demo-task-3",
        title: "Technology stack selection",
        status: "todo",
        subtasks: [
          "Frontend framework selection",
          "Backend technology choice",
          "Database selection"
        ]
      }
    ]
  },
  {
    id: "demo-phase-2",
    name: "Design & Prototyping",
    tasks: [
      {
        id: "demo-task-4",
        title: "UI/UX design",
        status: "todo",
        subtasks: [
          "Wireframe creation",
          "Visual design",
          "Prototype development"
        ]
      },
      {
        id: "demo-task-5",
        title: "Design system setup",
        status: "todo",
        subtasks: [
          "Color palette definition",
          "Typography scale",
          "Component library"
        ]
      }
    ]
  },
  {
    id: "demo-phase-3",
    name: "Development",
    tasks: [
      {
        id: "demo-task-6",
        title: "Frontend development",
        status: "todo",
        subtasks: [
          "Component development",
          "State management",
          "API integration"
        ]
      },
      {
        id: "demo-task-7",
        title: "Backend development",
        status: "todo",
        subtasks: [
          "Database setup",
          "API development",
          "Authentication system"
        ]
      }
    ]
  }
];

interface DemoShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
  onStartPlanning: () => void;
}

export const DemoShowcase = ({ isOpen, onClose, onStartPlanning }: DemoShowcaseProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Project Input",
      description: "Describe your project idea in natural language",
      content: (
        <div className="p-6 border rounded-lg bg-card border-border">
          <div className="space-y-4">
            <div className="p-4 border rounded bg-background border-primary/20">
              <p className="text-sm text-muted-foreground">Project Description</p>
              <p className="mt-1 font-medium">"I want to build a modern task management app with AI-powered planning features, real-time collaboration, and progress tracking."</p>
            </div>
            <div className="flex justify-center">
              <div className="px-4 py-2 text-sm rounded-full bg-primary/20 text-primary">
                AI is generating your plan...
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "AI-Powered Breakdown",
      description: "Watch as AI transforms your idea into structured phases and tasks",
      content: (
        <div className="p-6 border rounded-lg bg-card border-border">
          <div className="space-y-4">
            {samplePhases.map((phase, index) => (
              <Card key={phase.id} className="p-4 border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-6 h-6 text-xs rounded-full bg-primary text-primary-foreground">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold">{phase.name}</h3>
                </div>
                <div className="space-y-2">
                  {phase.tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-2 rounded bg-muted/50">
                      <div className={`w-2 h-2 rounded-full ${
                        task.status === 'done' ? 'bg-success' : 
                        task.status === 'in-progress' ? 'bg-warning' : 'bg-muted-foreground'
                      }`} />
                      <span className="text-sm">{task.title}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Interactive Planning Board",
      description: "Manage your project with drag-and-drop tasks and progress tracking",
      content: (
        <div className="p-6 border rounded-lg bg-card border-border">
          <div className="space-y-6">
            {samplePhases.map((phase) => (
              <div key={phase.id} className="p-4 border rounded-lg border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">{phase.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    {phase.tasks.filter(t => t.status === 'done').length}/{phase.tasks.length} tasks
                  </div>
                </div>
                <div className="w-full h-2 mb-4 rounded-full bg-muted">
                  <div 
                    className="h-full transition-all duration-500 rounded-full bg-gradient-primary"
                    style={{ 
                      width: `${(phase.tasks.filter(t => t.status === 'done').length / phase.tasks.length) * 100}%` 
                    }}
                  />
                </div>
                <div className="space-y-2">
                  {phase.tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 rounded bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full border-2 ${
                          task.status === 'done' ? 'bg-success border-success' : 
                          task.status === 'in-progress' ? 'bg-warning border-warning' : 'border-muted-foreground'
                        }`} />
                        <span className="text-sm">{task.title}</span>
                      </div>
                      <div className={`px-2 py-1 text-xs rounded-full ${
                        task.status === 'done' ? 'bg-success/20 text-success' : 
                        task.status === 'in-progress' ? 'bg-warning/20 text-warning' : 'bg-muted text-muted-foreground'
                      }`}>
                        {task.status === 'done' ? 'Completed' : 
                         task.status === 'in-progress' ? 'In Progress' : 'To Do'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <Card className="p-6 shadow-2xl bg-card border-border">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">See PlanLayer in Action</h2>
              <p className="text-muted-foreground">Watch how AI transforms your ideas into actionable plans</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border ${
                    index <= currentStep 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : 'border-muted-foreground text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 ${
                      index < currentStep ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-6">
            <h3 className="mb-2 text-xl font-semibold text-center">
              {steps[currentStep].title}
            </h3>
            <p className="mb-6 text-center text-muted-foreground">
              {steps[currentStep].description}
            </p>
            {steps[currentStep].content}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="bg-gradient-primary hover:shadow-glow"
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={onStartPlanning}
                className="bg-gradient-primary hover:shadow-glow"
              >
                Start Planning Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};