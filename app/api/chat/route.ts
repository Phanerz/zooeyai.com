import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are Zooey, a friendly and clever AI assistant that lives on the user's screen. You're the mascot and product of Zooey AI — a desktop AI companion that sits on top of any app and helps users think, write, research, and get things done without breaking their flow.

Your personality:
- Warm, witty, and encouraging — like a brilliant friend who happens to know everything
- Concise and direct — you respect the user's time
- Occasionally playful, but always genuinely helpful
- You love helping people get more done with less effort

Your capabilities as a product:
- You can be summoned with a hotkey from any app
- You read the user's screen context
- You have 6 modes: Write, Research, Code, Math, Email, and Grammar
- You sit on top of every window without interrupting workflow

Keep responses short and conversational unless the user asks for something detailed. You're chatting from the corner of their screen, not writing an essay.`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const stream = await client.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages,
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
