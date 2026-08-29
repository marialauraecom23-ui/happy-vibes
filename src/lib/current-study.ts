export const PLAN_START = "2026-08-26";
export const EXAM_DATE = "2026-10-18";
export const STUDY_START_HOUR = 16;

export function localDateKey(date = new Date()) { const y=date.getFullYear(); const m=String(date.getMonth()+1).padStart(2,"0"); const d=String(date.getDate()).padStart(2,"0"); return `${y}-${m}-${d}`; }
export function dayNumber(date=new Date()){const start=new Date(`${PLAN_START}T00:00:00`),current=new Date(`${localDateKey(date)}T00:00:00`);return Math.floor((current.getTime()-start.getTime())/86400000)+1}
export function weekNumber(date=new Date()){return Math.ceil(dayNumber(date)/7)}
export function isPlanDate(date=new Date()){const k=localDateKey(date);return k>=PLAN_START&&k<=EXAM_DATE}
export function nextStudyDate(date=new Date()){const next=new Date(date);if(next.getHours()>=21)next.setDate(next.getDate()+1);if(next.getHours()<STUDY_START_HOUR)next.setHours(STUDY_START_HOUR,0,0,0);return next}
export const DAILY_END_HOUR=21;
export type StudySession={date:Date;dateKey:string;day:number;week:number;weekday:number;state:"before-start"|"upcoming-today"|"in-progress"|"next-day"|"after-exam"};
export function currentSession(now=new Date()):StudySession{const start=new Date(`${PLAN_START}T00:00:00`),key=localDateKey(now);let date=new Date(`${key}T00:00:00`);let state:StudySession["state"]="in-progress";if(key<PLAN_START){date=start;state="before-start"}else if(key>EXAM_DATE){state="after-exam";date=new Date(`${EXAM_DATE}T00:00:00`)}else if(now.getHours()<STUDY_START_HOUR){state="upcoming-today"}else if(now.getHours()>=DAILY_END_HOUR){const next=new Date(date);next.setDate(next.getDate()+1);if(localDateKey(next)<=EXAM_DATE){date=next;state="next-day"}else state="after-exam"}const dateKey=localDateKey(date),day=Math.floor((date.getTime()-start.getTime())/86400000)+1;return{date,dateKey,day,week:Math.max(1,Math.ceil(day/7)),weekday:((day-1)%7+7)%7,state}}
export function formatPlanDate(date:Date){return new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"long"}).format(date)}
export function shortPlanDate(date:Date){return new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"2-digit"}).format(date)}
export function planWeekDates(session:StudySession){const first=new Date(session.date);first.setDate(first.getDate()-session.weekday);return Array.from({length:7},(_,i)=>{const d=new Date(first);d.setDate(d.getDate()+i);return d})}
export function daysUntilExam(now=new Date()){const today=new Date(`${localDateKey(now)}T00:00:00`),exam=new Date(`${EXAM_DATE}T00:00:00`);return Math.max(0,Math.round((exam.getTime()-today.getTime())/86400000))}
