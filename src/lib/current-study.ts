export const PLAN_START = "2026-08-27";
export const EXAM_DATE = "2026-10-18";
export const STUDY_START_HOUR = 16;

export function localDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function dayNumber(date = new Date()) {
  const start = new Date(`${PLAN_START}T00:00:00`);
  const current = new Date(`${localDateKey(date)}T00:00:00`);
  const diff = Math.floor((current.getTime() - start.getTime()) / 86400000);
  return diff + 1;
}

export function weekNumber(date = new Date()) {
  return Math.ceil(dayNumber(date) / 7);
}

export function isPlanDate(date = new Date()) {
  return localDateKey(date) >= PLAN_START && localDateKey(date) <= EXAM_DATE;
}

export function nextStudyDate(date = new Date()) {
  const next = new Date(date);
  if (next.getHours() >= 21) next.setDate(next.getDate() + 1);
  if (next.getHours() < STUDY_START_HOUR) next.setHours(STUDY_START_HOUR, 0, 0, 0);
  return next;
}
