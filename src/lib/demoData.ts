// utils/demoData.ts
import { Phase } from "@/components/PhaseCard";

export const getDemoPhases = (): Phase[] => [
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