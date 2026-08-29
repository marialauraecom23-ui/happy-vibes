import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `Você é o corretor pedagógico do APROVA UNIMAR 2027. Corrija somente o texto enviado considerando a proposta fornecida. A redação do Vestibular Geral UNIMAR usa escala de 0 a 40 pontos. Não invente uma rubrica oficial detalhada que não foi fornecida. Use como dimensões pedagógicas: atendimento ao tema/comando, organização/estrutura, argumentação, coerência/coesão, domínio da norma padrão e conclusão. Seja rigoroso, didático e específico. Aponte trechos concretos da redação e não reescreva a redação inteira. Retorne SOMENTE um objeto JSON válido, sem markdown, neste formato: {"score":number,"summary":string,"strengths":string[],"weaknesses":string[],"errors":[{"excerpt":string,"issue":string,"suggestion":string}],"rewriteSuggestions":[{"original":string,"suggested":string,"reason":string}],"improvementPlan":string[]}. score deve ser um inteiro entre 0 e 40.`;

function parseCorrection(text: string) {
  const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("A IA não retornou JSON válido.");
  const value = JSON.parse(cleaned.slice(start, end + 1));
  if (!Number.isInteger(value.score) || value.score < 0 || value.score > 40) throw new Error("A IA retornou uma nota inválida.");
  return {
    score: value.score,
    summary: String(value.summary ?? ""),
    strengths: Array.isArray(value.strengths) ? value.strengths.map(String) : [],
    weaknesses: Array.isArray(value.weaknesses) ? value.weaknesses.map(String) : [],
    errors: Array.isArray(value.errors) ? value.errors.map((e: Record<string, unknown>) => ({ excerpt: String(e.excerpt ?? ""), issue: String(e.issue ?? ""), suggestion: String(e.suggestion ?? "") })) : [],
    rewriteSuggestions: Array.isArray(value.rewriteSuggestions) ? value.rewriteSuggestions.map((r: Record<string, unknown>) => ({ original: String(r.original ?? ""), suggested: String(r.suggested ?? ""), reason: String(r.reason ?? "") })) : [],
    improvementPlan: Array.isArray(value.improvementPlan) ? value.improvementPlan.map(String) : [],
  };
}

export const Route = createFileRoute("/api/corrigir-redacao")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { theme?: string; command?: string; support?: string[]; essay?: string };
          const essay = body.essay?.trim();
          if (!essay) return Response.json({ error: "Redação vazia." }, { status: 400 });

          // Lovable Cloud provisions the gateway key server-side. Never expose it to the browser.
          const apiKey = process.env["LOVABLE_API_KEY"];
          if (!apiKey) return Response.json({ error: "Gateway de IA do Lovable não configurado no ambiente do servidor." }, { status: 503 });

          const input = [
            `TEMA: ${body.theme ?? ""}`,
            `COMANDO: ${body.command ?? ""}`,
            `TEXTOS MOTIVADORES:\n${(body.support ?? []).join("\n\n")}`,
            `REDAÇÃO DO CANDIDATO:\n${essay}`,
          ].join("\n\n");

          const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
              "Lovable-API-Key": apiKey,
              "X-Lovable-AIG-SDK": "tanstack-ai",
            },
            body: JSON.stringify({
              model: "openai/gpt-5.5",
              temperature: 0.2,
              stream: false,
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: input },
              ],
            }),
          });

          if (response.status === 402) return Response.json({ error: "O Gateway de IA está sem créditos. A redação foi preservada e pode ser corrigida quando houver créditos." }, { status: 402 });
          if (response.status === 429) return Response.json({ error: "O Gateway de IA atingiu o limite temporário. Tente novamente em alguns minutos." }, { status: 429 });
          if (!response.ok) {
            const detail = await response.text().catch(() => "");
            console.error("Lovable AI Gateway error", response.status, detail);
            return Response.json({ error: "O Gateway de IA não conseguiu processar a correção." }, { status: 502 });
          }

          const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
          const raw = data.choices?.[0]?.message?.content;
          if (!raw) return Response.json({ error: "O Gateway de IA retornou uma correção vazia." }, { status: 502 });

          try {
            return Response.json({ correction: parseCorrection(raw) });
          } catch (error) {
            console.error("Invalid essay correction payload", error, raw.slice(0, 500));
            return Response.json({ error: "A IA retornou um formato de correção inválido. Tente novamente." }, { status: 502 });
          }
        } catch (error) {
          console.error("Essay correction request failed", error);
          return Response.json({ error: "Não foi possível processar a correção agora." }, { status: 500 });
        }
      },
    },
  },
});
