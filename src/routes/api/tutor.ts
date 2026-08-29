import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/tutor")({
  server: { handlers: { POST: async ({ request }) => {
    try {
      const body = await request.json() as { message?: string; history?: Array<{role:string;content:string}>; system?:string };
      const message = body.message?.trim();
      if (!message) return json({error:"Digite uma dúvida."},400);
      const key = process.env.LOVABLE_API_KEY;
      if (!key) return json({error:"IA não configurada no backend. Publique a função/gateway no Cloud."},503);
      const history=(body.history??[]).slice(-10).map(m=>({role:m.role==="assistant"?"assistant":"user",content:m.content}));
      const r=await fetch("https://ai.gateway.lovable.dev/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${key}`},body:JSON.stringify({model:"google/gemini-2.5-flash",messages:[{role:"system",content:body.system||"Você é um tutor didático para vestibular UNIMAR 2027."},...history,{role:"user",content:message}],temperature:0.2})});
      if(r.status===402)return json({error:"Créditos de IA do Cloud esgotados."},402);
      if(r.status===429)return json({error:"Limite temporário de IA atingido. Tente novamente em instantes."},429);
      if(!r.ok)return json({error:"O gateway de IA não conseguiu responder."},502);
      const data=await r.json() as {choices?:Array<{message?:{content?:string}}>};
      const reply=data.choices?.[0]?.message?.content?.trim();
      if(!reply)return json({error:"Resposta vazia da IA."},502);
      return json({reply},200);
    } catch { return json({error:"Falha inesperada ao consultar o tutor."},500); }
  }} }
});
function json(data:unknown,status:number){return new Response(JSON.stringify(data),{status,headers:{"Content-Type":"application/json"}})}
