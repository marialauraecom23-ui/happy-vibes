import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/corrigir-redacao")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const supabaseUrl = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
          const publishableKey = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
          if (!supabaseUrl || !publishableKey) {
            return Response.json({ error: "Backend do Supabase não está configurado." }, { status: 503 });
          }

          const response = await fetch(`${supabaseUrl}/functions/v1/corrigir-redacao`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: publishableKey,
              Authorization: `Bearer ${publishableKey}`,
            },
            body: JSON.stringify(body),
          });

          const text = await response.text();
          let payload: unknown;
          try { payload = JSON.parse(text); } catch { payload = { error: "Resposta inválida do serviço de correção." }; }
          return Response.json(payload, { status: response.status });
        } catch (error) {
          console.error("Essay correction proxy failed", error);
          return Response.json({ error: "Não foi possível conectar ao serviço de correção." }, { status: 502 });
        }
      },
    },
  },
});
