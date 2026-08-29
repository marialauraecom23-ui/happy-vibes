export type Question = { id:string; subjectId:string; topicId:string; difficulty:1|2|3|4|5; statement:string; options:{A:string;B:string;C:string;D:string;E:string}; correctAnswer:"A"|"B"|"C"|"D"|"E"; explanation:string };
export type QuestionAttempt = { questionId:string; selectedAnswer:"A"|"B"|"C"|"D"|"E"; isCorrect:boolean; timeSeconds:number; attemptedAt:string };
export type TopicPerformance = { topicId:string; attempts:number; correct:number; errorCount:number };

export function accuracy(attempts: QuestionAttempt[]) { return attempts.length ? Math.round(attempts.filter(a=>a.isCorrect).length / attempts.length * 100) : 0; }
export function prioritizeWeakTopics(performance: TopicPerformance[]) { return [...performance].sort((a,b)=> (b.errorCount-b.correct/Math.max(b.attempts,1)) - (a.errorCount-a.correct/Math.max(a.attempts,1))); }
export function buildErrorReviewQuestionSet(attempts: QuestionAttempt[], limit=10) { return attempts.filter(a=>!a.isCorrect).slice(-limit).map(a=>a.questionId); }
