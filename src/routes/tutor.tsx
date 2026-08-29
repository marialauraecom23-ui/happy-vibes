import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useState } from "react";

export const Route = createFileRoute("/tutor")({ component: Tutor });

type Message = { role: "user" | "assistant"; content: string };

const starter = "Você é o Tutor IA do APROVA UNIMAR 2027. Explique conteúdos de Ensino Médio de forma simples, progressiva e didática, priorizando o edital da UNIMAR. Quando fizer sentido, explique → dê exemplo → proponha um exercício → corrija a resposta. Não invente regras do edital e não trate conteúdo de ENEM como se fosse específico da UNIMAR.";

export default function Tutor() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function send(e?: FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const user: Message = { role: "user", content: text };
    setMessages((m) => [...m, user]);
    setInput("");
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: starter, message: text, history: messages }),
      });
      if (!response.ok) throw new Error(response.status === 503 ? "IA não configurada no backend." : "Não foi possível obter uma resposta.");
      const data = (await response.json()) as { reply?: string };
      if (!data.reply) throw new Error("O backend não retornou uma resposta válida.");
      setMessages((m) => [...m, { role: "assistant", content: data.reply! }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao consultar o tutor.");
    } finally { setLoading(false); }
  }

  return <main className="min-h-screen bg-slate-950 p-4 text-slate-100 sm:p-8"><div className="mx-auto max-w-4xl"><div className="mb-6"><span className="text-xs font-bold uppercase tracking-wider text-indigo-300">APROVA UNIMAR · TUTOR IA</span><h1 className="mt-2 text-3xl font-black">Tire sua dúvida</h1><p className="mt-2 text-slate-400">Explique onde travou. O tutor deve ensinar, não apenas entregar a resposta.</p></div><section className="min-h-[55vh] rounded-3xl border border-slate-800 bg-slate-900/70 p-4 sm:p-6">{messages.length===0?<div className="flex min-h-[45vh] items-center justify-center text-center"><div><div className="text-5xl">🤖</div><h2 className="mt-4 text-xl font-bold">Como posso te ajudar?</h2><p className="mt-2 text-sm text-slate-500">Ex.: “Não entendi por que 3/4 é maior que 2/3.”</p></div></div>:<div className="space-y-4">{messages.map((m,i)=><div key={i} className={m.role==="user"?"ml-auto max-w-[85%] rounded-2xl bg-indigo-500/15 p-4":"max-w-[90%] rounded-2xl bg-slate-800 p-4"}><div className="mb-1 text-xs font-bold text-slate-500">{m.role==="user"?"VOCÊ":"TUTOR IA"}</div><div className="whitespace-pre-wrap text-sm leading-6">{m.content}</div></div>)}{loading&&<div className="rounded-2xl bg-slate-800 p-4 text-sm text-slate-400">Tutor está pensando…</div>}</div>}{error&&<div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200"><b>Não foi possível responder.</b><p className="mt-1">{error} Nenhuma resposta fictícia será exibida.</p></div>}<form onSubmit={send} className="mt-6 flex gap-2"><input value={input} onChange={(e)=>setInput(e.target.value)} disabled={loading} placeholder="Digite sua dúvida…" className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-indigo-500"/><button disabled={!input.trim()||loading} className="rounded-xl bg-indigo-500 px-5 py-3 font-bold disabled:opacity-40">{loading?"Enviando…":"Enviar"}</button></form></section></div></main>;
}
