import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/corrigir-redacao")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { theme?: string; command?: string; support?: string[]; essay?: string };
        const essay = body.essay?.trim();
        if (!essay) return Response.json({ error: "Redação vazia." }, { status: 400 });
        const apiKey = process.env['OPENAI_API_KEY'];
        if (!apiKey) return Response.json({ error: "Correção por IA não configurada no backend." }, { status: 503 });

        const instructions = `Você é o corretor pedagógico do APROVA UNIMAR 2027. Corrija somente o texto enviado, considerando a proposta fornecida. A redação do Vestibular Geral UNIMAR vale de 0 a 40 pontos. Não invente critérios oficiais não fornecidos. Use atendimento ao tema/comando, organização/estrutura, argumentação, coerência/coesão, norma padrão e conclusão como dimensões pedagógicas para justificar uma nota global de 0 a 40, deixando claro que são dimensões pedagógicas quando não houver rubrica oficial detalhada no contexto. Seja rigoroso, didático e específico. Aponte trechos concretos do texto, sem reescrever a redação inteira. Retorne SOMENTE JSON válido no formato: {"score":number,"summary":string,"strengths":string[],"weaknesses":string[],"errors":[{"excerpt":string,"issue":string,"suggestion":string}],"rewriteSuggestions":[{"original":string,"suggested":string,"reason":string}],"improvementPlan":string[]}. Score deve ser inteiro entre 0 e 40.`;
        const input = `TEMA: ${body.theme ?? ""}\n\nCOMANDO: ${body.command ?? ""}\n\nTEXTOS MOTIVADORES:\n${(body.support ?? []).join("\n\n")}\n\nREDAÇÃO DO CANDIDATO:\n${essay}`;
        const response = await fetch("https://api.openai.com/v1/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({ model: process.env['OPENAI_MODEL'] || "gpt-4.1-mini", instructions, input }),
        });
        if (!response.ok) return Response.json({ error: "O provedor de IA recusou a correção." }, { status: 502 });
        const data = (await response.json()) as { output?: Array<{ content?: Array<{ type?: string; text?: string }> }> };
        const raw = data.output?.flatMap((x) => x.content ?? []).find((x) => x.type === "output_text")?.text;
        if (!raw) return Response.json({ error: "O provedor retornou uma correção vazia." }, { status: 502 });
        try {
          const cleaned = raw.replace(/^```json\s*/i, "").replace(/\s*```$/, "");
          const correction = JSON.parse(cleaned);
          if (!Number.isInteger(correction.score) || correction.score < 0 || correction.score > 40) throw new Error("invalid score");
          return Response.json({ correction });
        } catch {
          return Response.json({ error: "A correção retornou em formato inválido. Tente novamente." }, { status: 502 });
        }
      },
    },
  },
});
