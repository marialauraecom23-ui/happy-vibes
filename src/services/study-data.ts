import { supabase } from "@/integrations/supabase/client";

export async function currentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}

export async function requireUser() {
  const user = await currentUser();
  if (!user) throw new Error("Faça login para salvar seu progresso.");
  return user;
}

export async function saveQuestionAttempt(input:{questionId:string;subjectId:string;topicId:string;selectedAnswer:string;isCorrect:boolean;elapsedSeconds?:number;source?:string}) {
  const user=await requireUser();
  const { error }=await supabase.from("question_attempts").insert({user_id:user.id,question_id:input.questionId,subject_id:input.subjectId,topic_id:input.topicId,selected_answer:input.selectedAnswer,is_correct:input.isCorrect,elapsed_seconds:input.elapsedSeconds??0,source:input.source??"exercicios"});
  if(error) throw error;
}

export async function saveTaskCompletion(input:{taskKey:string;dayNumber:number;kind:string;topicId?:string}) {
  const user=await requireUser();
  const { error }=await supabase.from("task_completions").upsert({user_id:user.id,task_key:input.taskKey,day_number:input.dayNumber,kind:input.kind,topic_id:input.topicId??null},{onConflict:"user_id,task_key"});
  if(error) throw error;
}

export async function saveStudySession(input:{kind:string;topicId?:string;durationSeconds:number}) {
  const user=await requireUser();
  const { error }=await supabase.from("study_sessions").insert({user_id:user.id,kind:input.kind,topic_id:input.topicId??null,duration_seconds:input.durationSeconds});
  if(error) throw error;
}

export async function saveAiMessage(role:"user"|"assistant",content:string) {
  const user=await requireUser();
  const { error }=await supabase.from("ai_messages").insert({user_id:user.id,role,content});
  if(error) throw error;
}

export async function listAiMessages(limit=50) {
  const user=await requireUser();
  const { data,error }=await supabase.from("ai_messages").select("id,role,content,created_at").eq("user_id",user.id).order("created_at",{ascending:true}).limit(limit);
  if(error) throw error;
  return data??[];
}

export async function saveEssay(input:{id?:string;promptId:string;body:string;status:string;submittedAt?:string|null}) {
  const user=await requireUser();
  const payload={...(input.id?{id:input.id}:{}),user_id:user.id,prompt_id:input.promptId,body:input.body,status:input.status,submitted_at:input.submittedAt??null,updated_at:new Date().toISOString()};
  const { data,error }=await supabase.from("essays").upsert(payload).select("id").single();
  if(error) throw error;
  return data;
}

export async function saveEssayCorrection(input:{essayId:string;score:number;summary:string;strengths:string[];weaknesses:string[];errors:unknown[];rewrites:unknown[];improvementPlan:string[]}) {
  const user=await requireUser();
  const { data,error }=await supabase.from("essay_corrections").upsert({essay_id:input.essayId,user_id:user.id,score:input.score,strengths:input.strengths as never,weaknesses:input.weaknesses as never,errors:input.errors as never,rewrites:input.rewrites as never,improvement_plan:input.improvementPlan as never},{onConflict:"essay_id"}).select("id").single();
  if(error) throw error;
  return data;
}

export async function saveErrorNotebook(questionId:string,topicId:string) {
  const user=await requireUser();
  const existing=await supabase.from("error_notebook").select("id,error_count").eq("user_id",user.id).eq("question_id",questionId).maybeSingle();
  if(existing.error) throw existing.error;
  if(existing.data) {
    const {error}=await supabase.from("error_notebook").update({error_count:existing.data.error_count+1,last_error_at:new Date().toISOString(),resolved:false}).eq("id",existing.data.id).eq("user_id",user.id);
    if(error) throw error;
    return;
  }
  const {error}=await supabase.from("error_notebook").insert({user_id:user.id,question_id:questionId,topic_id:topicId,error_count:1,resolved:false,last_error_at:new Date().toISOString()});
  if(error) throw error;
}

export async function addXp(amount:number) {
  const user=await requireUser();
  const {data,error}=await supabase.from("user_progress").select("xp,streak_days,last_study_date").eq("user_id",user.id).maybeSingle();
  if(error) throw error;
  const today=new Date().toISOString().slice(0,10);
  const previous=data?.last_study_date??null;
  let streak=data?.streak_days??0;
  if(previous!==today) streak+=1;
  const {error:upsertError}=await supabase.from("user_progress").upsert({user_id:user.id,xp:(data?.xp??0)+amount,streak_days:streak,last_study_date:today,updated_at:new Date().toISOString()});
  if(upsertError) throw upsertError;
}
