export type ReviewResult = { topicId: string; dueAt: string; intervalDays: number; attempts: number; lastCorrect: boolean };

const NORMAL = [1, 7, 14, 30];
const DIFFICULT = [1, 3, 7, 14];

export function scheduleReviews(topicId: string, completedAt = new Date(), incorrect = false, attempts = 0): ReviewResult[] {
  const intervals = incorrect ? DIFFICULT : NORMAL;
  return intervals.map((intervalDays) => ({ topicId, intervalDays, attempts, lastCorrect: !incorrect, dueAt: new Date(completedAt.getTime() + intervalDays * 86400000).toISOString() }));
}

export function shouldAdvance(correctAnswers: number, totalAnswers: number) { return totalAnswers > 0 && correctAnswers / totalAnswers >= 0.8; }
export function shouldReinforce(correctAnswers: number, totalAnswers: number) { return totalAnswers > 0 && correctAnswers / totalAnswers < 0.6; }
