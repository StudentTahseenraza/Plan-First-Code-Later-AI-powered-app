// import "https://deno.land/x/xhr@0.1.0/mod.ts"; // Removed because it's not used and causes type errors
import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { description } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Generating plan for:', description);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a project planning assistant. Generate detailed, actionable project plans with phases, tasks, and subtasks. Return ONLY valid JSON in this exact format: {"phases": [{"id": "phase-1", "name": "Phase Name", "tasks": [{"id": "task-1", "title": "Task Title", "subtasks": ["Subtask 1", "Subtask 2"], "status": "todo"}]}]}'
          },
          {
            role: 'user',
            content: `Create a detailed project plan for: ${description}\n\nBreak it into 3-4 phases, each with 2-3 tasks, and each task should have 3-4 subtasks. Use clear, actionable language.`
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_project_plan",
              description: "Generate a structured project plan with phases, tasks, and subtasks",
              parameters: {
                type: "object",
                properties: {
                  phases: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        tasks: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              id: { type: "string" },
                              title: { type: "string" },
                              subtasks: {
                                type: "array",
                                items: { type: "string" }
                              },
                              status: { 
                                type: "string",
                                enum: ["todo", "in-progress", "done"]
                              }
                            },
                            required: ["id", "title", "subtasks", "status"]
                          }
                        }
                      },
                      required: ["id", "name", "tasks"]
                    }
                  }
                },
                required: ["phases"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "generate_project_plan" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI response:', JSON.stringify(data));

    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error('No tool call in AI response');
    }

    const planData = JSON.parse(toolCall.function.arguments);
    
    return new Response(
      JSON.stringify(planData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-plan function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
