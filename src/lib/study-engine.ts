export type Review = { topic: string; dueAt: string; intervalDays: number; attempts: number; lastCorrect?: boolean };
export type StudyAction = { kind: "lesson" | "practice" | "review" | "essay" | "simulation"; topic: string; durationMin: number; priority: number };

export const EXAM_DATE = "2026-10-18";
export const PLAN_START = "2026-08-27";
export const DAILY_START_MINUTE = 16 * 60;
export const DAILY_END_MINUTE = 21 * 60;

export function spacedReviewDates(completedAt: Date, incorrect = false): Date[] {
  const days = incorrect ? [1, 3, 7, 14] : [1, 7, 14, 30];
  return days.map((d) => new Date(completedAt.getTime() + d * 86400000));
}

export function scheduleNextStudy(actions: StudyAction[], reviews: Review[], now = new Date()): StudyAction[] {
  const due = reviews.filter((r) => new Date(r.dueAt) <= now).map((r) => ({ kind: "review" as const, topic: r.topic, durationMin: 20, priority: r.lastCorrect === false ? 100 : 80 }));
  return [...due, ...actions].sort((a, b) => b.priority - a.priority);
}

export function nextAvailableStudyStart(now = new Date()): Date {
  const next = new Date(now);
  const minute = next.getHours() * 60 + next.getMinutes();
  if (minute < DAILY_START_MINUTE) next.setHours(16, 0, 0, 0);
  else if (minute >= DAILY_END_MINUTE) { next.setDate(next.getDate() + 1); next.setHours(16, 0, 0, 0); }
  return next;
}

export function planDays(start = new Date(PLAN_START + "T12:00:00"), end = new Date(EXAM_DATE + "T12:00:00")) {
  const days: string[] = [];
  for (const d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) days.push(d.toISOString().slice(0, 10));
  return days;
}
