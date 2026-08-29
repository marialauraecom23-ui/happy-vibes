export type SimulationConfig = { title:string; questionCount:number; durationMinutes:number; subjectIds?:string[]; topicIds?:string[]; onlyErrors?:boolean };
export type SimulationAnswer = { questionId:string; selectedAnswer:"A"|"B"|"C"|"D"|"E"; isCorrect:boolean; timeSeconds:number; markedForReview:boolean };
export type SimulationResult = { correct:number; total:number; percentage:number; bySubject:Record<string,{correct:number;total:number}> };

export function scoreSimulation(answers:SimulationAnswer[], subjects:Record<string,string>) {
  const bySubject:SimulationResult["bySubject"] = {};
  let correct=0;
  for (const a of answers) {
    if(a.isCorrect) correct++;
    const subject=subjects[a.questionId] ?? "Outros";
    bySubject[subject] ??= {correct:0,total:0};
    bySubject[subject].total++;
    if(a.isCorrect) bySubject[subject].correct++;
  }
  return {correct,total:answers.length,percentage:answers.length?Math.round(correct/answers.length*100):0,bySubject};
}

export function canStartSimulation(config:SimulationConfig) { return config.questionCount > 0 && config.durationMinutes > 0; }
