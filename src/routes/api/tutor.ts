import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/tutor")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { message?: string; history?: Array<{ role: string; content: string }>; system?: string };
        const message = body.message?.trim();
        if (!message) return new Response(JSON.stringify({ error: "Digite uma dúvida." }), { status: 400, headers: { "Content-Type": "application/json" } });
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) return new Response(JSON.stringify({ error: "IA não configurada no backend." }), { status: 503, headers: { "Content-Type": "application/json" } });
        const history = (body.history ?? []).slice(-10).map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content }));
        const response = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` }, body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4.1-mini", instructions: body.system || "Você é um tutor didático para preparação para vestibular.", input: [...history, { role: "user", content: message }] }) });
        if (!response.ok) return new Response(JSON.stringify({ error: "O provedor de IA recusou a solicitação." }), { status: 502, headers: { "Content-Type": "application/json" } });
        const data = (await response.json()) as { output?: Array<{ content?: Array<{ type?: string; text?: string }> }> };
        const reply = data.output?.flatMap((item) => item.content ?? []).find((part) => part.type === "output_text")?.text;
        if (!reply) return new Response(JSON.stringify({ error: "Resposta vazia do provedor." }), { status: 502, headers: { "Content-Type": "application/json" } });
        return new Response(JSON.stringify({ reply }), { status: 200, headers: { "Content-Type": "application/json" } });
      },
    },
  },
});
