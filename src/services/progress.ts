export type ProgressSnapshot = { questionsAnswered:number; correctAnswers:number; studySeconds:number; essaysCompleted:number; simulationsCompleted:number; xp:number };

export function calculateAccuracy(p: Pick<ProgressSnapshot,"questionsAnswered"|"correctAnswers">) { return p.questionsAnswered ? Math.round((p.correctAnswers / p.questionsAnswered) * 100) : 0; }

export function xpForQuestion(correct:boolean) { return correct ? 10 : 2; }
export function xpForCompletedSession(minutes:number) { return Math.max(0, Math.floor(minutes)); }
