export const PLAN_START = new Date("2026-08-27T00:00:00");
export const EXAM_DATE = new Date("2026-10-18T00:00:00");
export const STUDY_START_HOUR = 16;

export type StudyPhase = "base" | "consolidation" | "vestibular" | "intensive" | "simulations" | "final";
export type StudyTaskKind = "learn" | "practice" | "review" | "essay" | "simulation";
export type StudyTask = { kind: StudyTaskKind; subject?: string; topic?: string; durationMin: number; title: string; description: string };

const phases: Array<[number, number, StudyPhase]> = [
  [1, 10, "base"], [11, 20, "consolidation"], [21, 35, "vestibular"], [36, 44, "intensive"], [45, 49, "simulations"], [50, 53, "final"],
];

export function planDayNumber(date: Date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const s = new Date(PLAN_START.getFullYear(), PLAN_START.getMonth(), PLAN_START.getDate());
  return Math.floor((d.getTime() - s.getTime()) / 86400000) + 1;
}
export function phaseForDay(day: number): StudyPhase { return phases.find(([a,b]) => day >= a && day <= b)?.[2] ?? "final"; }
export function isPlanDate(date: Date) { const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()); return d >= new Date(PLAN_START.getFullYear(),PLAN_START.getMonth(),PLAN_START.getDate()) && d <= new Date(EXAM_DATE.getFullYear(),EXAM_DATE.getMonth(),EXAM_DATE.getDate()); }

const baseRotation = [
  ["Matemática", "Operações básicas e números", "learn"], ["Língua Portuguesa", "Compreensão e interpretação de textos", "learn"], ["Biologia", "Organização da vida e célula", "learn"],
  ["Química", "Matéria, propriedades e misturas", "learn"], ["Matemática", "Frações e porcentagem", "practice"], ["Língua Portuguesa", "Classes de palavras", "practice"], ["Biologia", "Membrana e organelas", "practice"],
] as const;

export function tasksForDay(day: number): StudyTask[] {
  const phase = phaseForDay(day);
  const seed = baseRotation[(day - 1) % baseRotation.length]!;
  const tasks: StudyTask[] = [
    { kind: "learn", subject: seed[0], topic: seed[1], durationMin: 35, title: `Aprenda: ${seed[1]}`, description: "Conteúdo dentro do aplicativo, com exemplo e explicação progressiva." },
    { kind: "practice", subject: seed[0], topic: seed[1], durationMin: 30, title: `Pratique: ${seed[1]}`, description: "Questões do banco relacionadas ao conteúdo estudado." },
  ];
  if (phase !== "base") tasks.push({ kind: "review", subject: seed[0], topic: seed[1], durationMin: 20, title: `Revise: ${seed[1]}`, description: "Revisão baseada no desempenho e nas revisões vencidas." });
  if (day % 7 === 0) tasks.push({ kind: "essay", durationMin: 60, title: "Redação semanal", description: "Proposta com textos motivadores, produção e correção." });
  if (phase === "simulations" || phase === "final") tasks.push({ kind: "simulation", durationMin: 120, title: "Simulado", description: "Simulado construído a partir do banco real de questões." });
  return tasks;
}

export function nextAvailableStart(now = new Date()) {
  const result = new Date(now);
  if (result.getHours() < STUDY_START_HOUR) result.setHours(STUDY_START_HOUR, 0, 0, 0);
  else if (result.getHours() >= 21) { result.setDate(result.getDate() + 1); result.setHours(STUDY_START_HOUR, 0, 0, 0); }
  return result;
}
