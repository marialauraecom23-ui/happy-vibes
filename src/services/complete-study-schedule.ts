import { CURRICULUM, PLAN_START, EXAM_DATE } from "@/services/study-plan";
export type ReminderItem={id:string;subject:string;topic:string;day:number;date:Date;kind:"study"|"essay"};
const subjects=Object.keys(CURRICULUM).filter(s=>s!=="Redação");
const topics=subjects.flatMap(subject=>(CURRICULUM[subject]??[]).map(topic=>({subject,topic})));
export const TOTAL_STUDY_DAYS=Math.round((EXAM_DATE.getTime()-PLAN_START.getTime())/86400000)+1;
export function remindersForDay(day:number):ReminderItem[]{
 if(day<1||day>TOTAL_STUDY_DAYS)return[];
 const start=Math.floor((day-1)*topics.length/TOTAL_STUDY_DAYS);
 const end=Math.floor(day*topics.length/TOTAL_STUDY_DAYS);
 const result:ReminderItem[]=[];
 const date=new Date(PLAN_START);date.setDate(date.getDate()+day-1);
 for(let i=start;i<end;i++){const item=topics[i];if(item)result.push({id:`study-${day}-${i}`,subject:item.subject,topic:item.topic,day,date:new Date(date),kind:"study"})}
 if(day%7===0&&day<TOTAL_STUDY_DAYS)result.push({id:`essay-${day}`,subject:"Redação",topic:"Produção semanal",day,date:new Date(date),kind:"essay"});
 return result;
}
export function allReminderDays(){return Array.from({length:TOTAL_STUDY_DAYS},(_,i)=>i+1)}
export function totalTopics(){return topics.length}
