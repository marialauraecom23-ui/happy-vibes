import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({ component: AprovaUnimar });

type View = "dashboard" | "plano" | "calendario" | "missao" | "conteudos" | "exercicios" | "simulados" | "redacao" | "tutor" | "erros" | "progresso";
type Attempt = { question: string; answer: string; correct: boolean; at: string };

const today = "26/08/2026";
const exam = "18/10/2026";

const questions = [
  { id: 1, subject: "Matemática", topic: "Frações", text: "Qual é maior?", options: ["2/3", "3/4", "1/2", "3/5", "5/8"], correct: 1, explanation: "3/4 = 0,75 e 2/3 ≈ 0,67; portanto 3/4 é maior." },
  { id: 2, subject: "Português", topic: "Compreensão", text: "Em uma questão de compreensão, qual informação deve ser priorizada primeiro?", options: ["A opinião do leitor", "Uma informação explícita no texto", "Uma informação inventada", "O título de outro texto", "Uma regra gramatical"], correct: 1, explanation: "A compreensão começa pela localização e identificação das informações presentes no próprio texto." },
  { id: 3, subject: "Biologia", topic: "Célula", text: "Qual estrutura está presente em células eucarióticas e participa da produção de energia?", options: ["Ribossomo", "Parede celular", "Mitocôndria", "Cápsula", "Flagelo"], correct: 2, explanation: "A mitocôndria participa da respiração celular e da produção de ATP." },
  { id: 4, subject: "Química", topic: "Estrutura atômica", text: "Qual partícula possui carga elétrica negativa?", options: ["Próton", "Nêutron", "Elétron", "Núcleo", "Íon positivo"], correct: 2, explanation: "O elétron possui carga negativa; prótons são positivos e nêutrons não possuem carga." },
  { id: 5, subject: "Física", topic: "Grandezas", text: "Qual é uma unidade do Sistema Internacional para medir velocidade?", options: ["m/s", "kg", "N", "J", "W"], correct: 0, explanation: "Velocidade é medida em metros por segundo (m/s) no SI." },
];

const days = [
  ["26/08", "Compreensão de texto + frações + célula"], ["27/08", "Classes de palavras + frações equivalentes"], ["28/08", "MMC + divisão de frações + química básica"],
  ["29/08", "Revisão D+1 + questões"], ["30/08", "Matemática: porcentagem + português"], ["31/08", "Biologia: organelas + exercícios"], ["01/09", "Revisão semanal + redação"],
];

function loadAttempts(): Attempt[] { try { return JSON.parse(localStorage.getItem("aprova-attempts") || "[]"); } catch { return []; } }
function saveAttempts(v: Attempt[]) { localStorage.setItem("aprova-attempts", JSON.stringify(v)); }

function AprovaUnimar() {
  const [view, setView] = useState<View>("dashboard");
  const [missionStarted, setMissionStarted] = useState(false);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [attempts, setAttempts] = useState<Attempt[]>(loadAttempts);
  const [essay, setEssay] = useState("");
  const [tutorQuestion, setTutorQuestion] = useState("");
  const [simulation, setSimulation] = useState(false);
  const [simIndex, setSimIndex] = useState(0);
  const [simAnswers, setSimAnswers] = useState<Record<number, number>>({});

  const accuracy = attempts.length ? Math.round(attempts.filter(a => a.correct).length / attempts.length * 100) : 0;
  const currentQuestion = questions[exerciseIndex % questions.length];

  const nav = [
    ["dashboard", "Dashboard"], ["plano", "Plano"], ["calendario", "Calendário"], ["missao", "Missão"], ["conteudos", "Conteúdos"],
    ["exercicios", "Exercícios"], ["simulados", "Simulados"], ["redacao", "Redação"], ["tutor", "Tutor IA"], ["erros", "Caderno de Erros"], ["progresso", "Progresso"],
  ] as [View, string][];

  function answerExercise() {
    if (selected === null || checked) return;
    const correct = selected === currentQuestion.correct;
    const next = [...attempts, { question: currentQuestion.text, answer: currentQuestion.options[selected], correct, at: new Date().toISOString() }];
    setAttempts(next); saveAttempts(next); setChecked(true);
  }

  function nextExercise() { setExerciseIndex(i => (i + 1) % questions.length); setSelected(null); setChecked(false); }

  function finishSimulation() {
    const score = questions.reduce((n, q, i) => n + (simAnswers[i] === q.correct ? 1 : 0), 0);
    setSimulation(false); setView("simulados");
    alert(`Simulado finalizado: ${score}/${questions.length} (${Math.round(score / questions.length * 100)}%).`);
  }

  const errors = useMemo(() => attempts.filter(a => !a.correct), [attempts]);

  return <div className="min-h-screen bg-slate-950 text-slate-100">
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-800 bg-slate-950 p-5 lg:block">
      <div className="mb-8"><div className="text-2xl font-black tracking-tight text-white">APROVA <span className="text-indigo-400">UNIMAR</span></div><div className="mt-1 text-xs text-slate-500">Vestibular 2027 · preparação pessoal</div></div>
      <nav className="space-y-1">{nav.map(([id, label]) => <button key={id} onClick={() => setView(id)} className={`w-full rounded-xl px-3 py-2.5 text-left text-sm transition ${view === id ? "bg-indigo-500/15 text-indigo-300" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}>{label}</button>)}</nav>
      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-slate-800 bg-slate-900 p-4"><div className="text-xs text-slate-500">Prova</div><div className="mt-1 font-semibold">18/10/2026 · 09:00</div><div className="mt-1 text-xs text-slate-500">Brasília · 13:00 término</div></div>
    </aside>

    <main className="min-h-screen lg:ml-64">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/95 px-4 py-4 backdrop-blur lg:px-8"><div><div className="text-xs font-medium text-indigo-300">SEMANA 1 · DIA 1</div><h1 className="text-xl font-bold">{view === "dashboard" ? "26 de agosto" : nav.find(n => n[0] === view)?.[1]}</h1></div><div className="hidden text-right sm:block"><div className="text-xs text-slate-500">Data da prova</div><div className="font-semibold">{exam}</div></div></header>
      <div className="border-b border-slate-800 bg-slate-900/60 px-4 py-2 lg:hidden overflow-x-auto"><div className="flex gap-2 min-w-max">{nav.map(([id, label]) => <button key={id} onClick={() => setView(id)} className={`rounded-lg px-3 py-1.5 text-xs ${view === id ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-300"}`}>{label}</button>)}</div></div>

      <div className="mx-auto max-w-7xl p-4 lg:p-8">
        {view === "dashboard" && <Dashboard setView={setView} accuracy={accuracy} attempts={attempts} errors={errors} />}
        {view === "plano" && <Section title="Plano de 53 dias" subtitle="26/08/2026 → 18/10/2026"><div className="grid gap-4 md:grid-cols-3">{[["FASE 1", "Reconstrução de base", "26/08 → 06/09"], ["FASE 2", "Consolidação", "07/09 → 20/09"], ["FASE 3", "Conteúdos de vestibular", "21/09 → 04/10"], ["FASE 4", "Exercícios intensivos", "05/10 → 10/10"], ["FASE 5", "Simulados + erros", "11/10 → 15/10"], ["FASE 6", "Revisão final", "16/10 → 18/10"]].map(x => <Card key={x[0]}><div className="text-xs font-bold text-indigo-300">{x[0]}</div><div className="mt-2 font-semibold">{x[1]}</div><div className="mt-1 text-sm text-slate-500">{x[2]}</div></Card>)}</div><Card className="mt-5"><h3 className="font-semibold">Regra pedagógica</h3><p className="mt-2 text-sm leading-6 text-slate-400">Base → consolidação → vestibular → exercícios → revisão → simulados → revisão dos erros → reta final. O plano não importa semanas anteriores.</p></Card></Section>}
        {view === "calendario" && <Section title="Calendário" subtitle="O plano começa em 26/08 e não mostra semanas perdidas."><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{days.map(([date, task], i) => <Card key={date}><div className="flex justify-between"><span className="font-bold">{date}/2026</span><span className="text-xs text-indigo-300">DIA {i + 1}</span></div><p className="mt-3 text-sm text-slate-400">{task}</p></Card>)}</div></Section>}
        {view === "missao" && <Section title="Missão de hoje" subtitle="26/08/2026 · Semana 1 · Dia 1"><Card><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[["Matemática", "Frações", "30 min · 5 questões"], ["Português", "Compreensão de texto", "30 min · 5 questões"], ["Biologia", "Célula", "30 min · 5 questões"], ["Redação", "Estrutura", "20 min"]].map(x => <div className="rounded-xl bg-slate-800/70 p-4" key={x[0]}><div className="text-xs text-indigo-300">{x[0]}</div><div className="mt-2 font-semibold">{x[1]}</div><div className="mt-2 text-xs text-slate-500">{x[2]}</div></div>)}</div><button onClick={() => {setMissionStarted(true); setView("exercicios")}} className="mt-6 rounded-xl bg-indigo-500 px-5 py-3 font-semibold hover:bg-indigo-400">{missionStarted ? "Continuar missão" : "Começar missão"}</button></Card></Section>}
        {view === "conteudos" && <Section title="Conteúdos" subtitle="Trilhas progressivas por pré-requisito"><div className="grid gap-4 md:grid-cols-2">{[["Língua Portuguesa", "Compreensão → classes de palavras → análise sintática → período composto → literatura"], ["Matemática", "Operações → frações → MMC → porcentagem → razão → proporção → álgebra"], ["Biologia", "Célula → metabolismo → divisão celular → genética → evolução → ecologia"], ["Química", "Matéria → átomo → tabela periódica → ligações → reações → estequiometria"], ["Física", "Grandezas → movimento → força → energia → termologia → ondas → eletricidade"], ["Redação", "Tema → estrutura → argumentação → coesão → revisão → correção"]].map(x => <Card key={x[0]}><h3 className="font-semibold">{x[0]}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{x[1]}</p></Card>)}</div></Section>}
        {view === "exercicios" && <Exercise q={currentQuestion} selected={selected} setSelected={setSelected} checked={checked} answer={answerExercise} next={nextExercise} />}
        {view === "simulados" && <SimulationView simulation={simulation} setSimulation={setSimulation} simIndex={simIndex} setSimIndex={setSimIndex} simAnswers={simAnswers} setSimAnswers={setSimAnswers} finish={finishSimulation} />}
        {view === "erros" && <Section title="Caderno de Erros" subtitle={`${errors.length} erro(s) registrado(s) a partir de respostas reais neste navegador.`}>{errors.length ? errors.map((e, i) => <Card key={i} className="mb-3"><div className="text-sm font-semibold">{e.question}</div><div className="mt-2 text-sm text-red-300">Resposta: {e.answer}</div><div className="mt-2 text-xs text-slate-500">{new Date(e.at).toLocaleString("pt-BR")}</div></Card>) : <Empty text="Nenhum erro registrado ainda. Faça exercícios para construir seu caderno de erros." />}</Section>}
        {view === "progresso" && <Section title="Progresso" subtitle="Somente ações reais são contabilizadas."><div className="grid gap-4 sm:grid-cols-3"><Metric label="Questões respondidas" value={String(attempts.length)} /><Metric label="Taxa de acerto" value={`${accuracy}%`} /><Metric label="Erros no caderno" value={String(errors.length)} /></div></Section>}
        {view === "redacao" && <Section title="Redação" subtitle="A escrita é salva localmente até a integração segura de IA ser configurada."><Card><label className="text-sm font-semibold">Tema da redação</label><div className="mt-3 rounded-xl bg-slate-800 p-4 text-sm text-slate-300">Tema de treino: um desafio contemporâneo relacionado à educação e tecnologia.</div><textarea value={essay} onChange={e => setEssay(e.target.value)} placeholder="Escreva sua redação aqui..." className="mt-4 min-h-80 w-full rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm outline-none focus:border-indigo-500" /><div className="mt-3 flex items-center justify-between"><span className="text-xs text-slate-500">{essay.length} caracteres</span><button onClick={() => localStorage.setItem("aprova-essay", essay)} className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold">Salvar rascunho</button></div></Card><Card className="mt-4"><h3 className="font-semibold">Correção IA</h3><p className="mt-2 text-sm text-amber-300">A correção real depende da configuração segura de um provedor de IA no backend. Nenhuma nota fictícia será exibida.</p></Card></Section>}
        {view === "tutor" && <Section title="Tutor IA" subtitle="Explicações contextualizadas para o vestibular."><Card><textarea value={tutorQuestion} onChange={e => setTutorQuestion(e.target.value)} placeholder="Ex.: Não entendi por que 3/4 é maior que 2/3." className="min-h-36 w-full rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm outline-none focus:border-indigo-500" /><button onClick={() => alert("O Tutor IA precisa de uma chave de provedor configurada em backend. Não vou simular uma resposta de IA.")} className="mt-4 rounded-xl bg-indigo-500 px-5 py-3 font-semibold">Enviar dúvida</button><p className="mt-4 text-xs text-amber-300">Integração externa pendente: configure a chave de IA como secret/backend antes de habilitar respostas reais.</p></Card></Section>}
      </div>
    </main>
  </div>;
}

function Dashboard({ setView, accuracy, attempts, errors }: { setView: (v: View) => void; accuracy: number; attempts: Attempt[]; errors: Attempt[] }) { return <div><div className="mb-6"><div className="text-sm text-indigo-300">SEMANA 1 · DIA 1</div><h2 className="mt-1 text-3xl font-black">Vamos começar. 🚀</h2><p className="mt-2 text-slate-400">26 de agosto de 2026 · 53 dias até a prova.</p></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><Metric label="Questões" value={String(attempts.length)} /><Metric label="Taxa de acerto" value={`${accuracy}%`} /><Metric label="Erros" value={String(errors.length)} /><Metric label="Prova" value="18/10" /></div><div className="mt-6 grid gap-5 lg:grid-cols-3"><Card className="lg:col-span-2"><div className="flex items-start justify-between"><div><div className="text-xs font-bold text-indigo-300">MISSÃO DE HOJE</div><h3 className="mt-2 text-xl font-bold">Reconstrução da base</h3><p className="mt-2 text-sm text-slate-400">Frações · compreensão de texto · célula · estrutura de redação</p></div><span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">0% concluída</span></div><button onClick={() => setView("missao")} className="mt-5 rounded-xl bg-indigo-500 px-5 py-3 font-semibold">Começar missão</button></Card><Card><div className="text-xs font-bold text-slate-500">PRÓXIMO SIMULADO</div><h3 className="mt-2 font-bold">Simulado semanal</h3><p className="mt-2 text-sm text-slate-400">Questões reais dentro do aplicativo, com timer e resultado.</p><button onClick={() => setView("simulados")} className="mt-4 text-sm font-semibold text-indigo-300">Abrir simulados →</button></Card></div><Card className="mt-5"><h3 className="font-bold">Regra do plano</h3><p className="mt-2 text-sm leading-6 text-slate-400">Base → consolidação → vestibular → exercícios → revisão → simulados → revisão dos erros → reta final.</p></Card></div> }

function Exercise({ q, selected, setSelected, checked, answer, next }: any) { const ok = selected === q.correct; return <Section title="Pratique" subtitle={`${q.subject} · ${q.topic}`}><Card><div className="flex justify-between text-xs text-slate-500"><span>Questão</span><span>Base progressiva</span></div><h3 className="mt-5 text-lg font-semibold leading-7">{q.text}</h3><div className="mt-5 space-y-2">{q.options.map((o: string, i: number) => <button disabled={checked} key={o} onClick={() => setSelected(i)} className={`w-full rounded-xl border p-4 text-left text-sm transition ${selected === i ? "border-indigo-400 bg-indigo-500/10" : "border-slate-800 bg-slate-900 hover:border-slate-700"}`}>{String.fromCharCode(65 + i)}) {o}</button>)}</div>{checked && <div className={`mt-5 rounded-xl p-4 ${ok ? "bg-emerald-500/10 text-emerald-300" : "bg-red-500/10 text-red-300"}`}><div className="font-bold">{ok ? "CORRETO" : "INCORRETO"}</div><p className="mt-2 text-sm">{q.explanation}</p></div>}<div className="mt-5 flex gap-2">{!checked ? <button disabled={selected === null} onClick={answer} className="rounded-xl bg-indigo-500 px-5 py-3 font-semibold disabled:opacity-40">Responder</button> : <button onClick={next} className="rounded-xl bg-slate-800 px-5 py-3 font-semibold">Próxima questão</button>}</div></Card></Section> }

function SimulationView({ simulation, setSimulation, simIndex, setSimIndex, simAnswers, setSimAnswers, finish }: any) { if (!simulation) return <Section title="Simulados" subtitle="Sistema real de prova, não vídeo."><Card><h3 className="text-xl font-bold">Simulado semanal</h3><div className="mt-5 grid gap-3 sm:grid-cols-3"><Metric label="Questões" value="5" /><Metric label="Duração" value="20 min" /><Metric label="Dificuldade" value="Base" /></div><button onClick={() => {setSimulation(true); setSimIndex(0); setSimAnswers({})}} className="mt-6 rounded-xl bg-indigo-500 px-5 py-3 font-semibold">Começar simulado</button></Card></Section>; const q = questions[simIndex]; const answer = simAnswers[simIndex]; return <Section title={`Simulado · ${simIndex + 1}/${questions.length}`} subtitle="Timer e respostas persistem durante esta tentativa."><Card><h3 className="text-lg font-semibold">{q.text}</h3><div className="mt-5 space-y-2">{q.options.map((o, i) => <button key={o} onClick={() => setSimAnswers({...simAnswers, [simIndex]: i})} className={`w-full rounded-xl border p-4 text-left ${answer === i ? "border-indigo-400 bg-indigo-500/10" : "border-slate-800 bg-slate-900"}`}>{String.fromCharCode(65+i)}) {o}</button>)}</div><div className="mt-5 flex flex-wrap gap-2"><button disabled={simIndex === 0} onClick={() => setSimIndex(simIndex - 1)} className="rounded-xl bg-slate-800 px-4 py-2 disabled:opacity-40">Anterior</button>{simIndex < questions.length - 1 ? <button onClick={() => setSimIndex(simIndex + 1)} className="rounded-xl bg-indigo-500 px-4 py-2">Próxima</button> : <button onClick={finish} className="rounded-xl bg-emerald-500 px-4 py-2 font-semibold">Finalizar</button>}</div></Card></Section> }

function Section({ title, subtitle, children }: any) { return <div><div className="mb-6"><h2 className="text-2xl font-black">{title}</h2><p className="mt-1 text-sm text-slate-500">{subtitle}</p></div>{children}</div> }
function Card({ children, className = "" }: any) { return <div className={`rounded-2xl border border-slate-800 bg-slate-900/70 p-5 ${className}`}>{children}</div> }
function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4"><div className="text-xs text-slate-500">{label}</div><div className="mt-2 text-2xl font-black">{value}</div></div> }
function Empty({ text }: { text: string }) { return <Card><p className="text-sm text-slate-500">{text}</p></Card> }
