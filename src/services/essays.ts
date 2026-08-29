export type EssayStatus='draft'|'submitted'|'corrected';
export type EssayRecord={id:string;weekNumber:number;promptDate:string;theme:string;command:string;content:string;status:EssayStatus;score?:number};
export function canSubmitEssay(content:string){return content.trim().length>=100;}
export function canRequestCorrection(essay:EssayRecord){return essay.status==='submitted'&&essay.content.trim().length>=100;}
export function nextEssayWeek(completedWeeks:number[]){for(let w=1;w<=8;w++)if(!completedWeeks.includes(w))return w;return null;}
