const SYSTEM_PROMPT = `Você é o corretor pedagógico do APROVA UNIMAR 2027. Corrija somente o texto enviado considerando a proposta fornecida. A redação do Vestibular Geral UNIMAR usa escala de 0 a 40 pontos. Não invente uma rubrica oficial detalhada que não foi fornecida. Use como dimensões pedagógicas: atendimento ao tema/comando, organização/estrutura, argumentação, coerência/coesão, domínio da norma padrão e conclusão. Seja rigoroso, didático e específico. Aponte trechos concretos da redação e não reescreva a redação inteira. Retorne SOMENTE JSON válido: {"score":number,"summary":string,"strengths":string[],"weaknesses":string[],"errors":[{"excerpt":string,"issue":string,"suggestion":string}],"rewriteSuggestions":[{"original":string,"suggested":string,"reason":string}],"improvementPlan":string[]}. score inteiro de 0 a 40.`;

const cors = {"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type","Access-Control-Allow-Methods":"POST, OPTIONS"};

function parseCorrection(text:string){
  const cleaned=text.replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/i,"").trim();
  const start=cleaned.indexOf("{"); const end=cleaned.lastIndexOf("}");
  if(start<0||end<=start) throw new Error("JSON inválido");
  const value=JSON.parse(cleaned.slice(start,end+1));
  if(!Number.isInteger(value.score)||value.score<0||value.score>40) throw new Error("Nota inválida");
  return {score:value.score,summary:String(value.summary??""),strengths:Array.isArray(value.strengths)?value.strengths.map(String):[],weaknesses:Array.isArray(value.weaknesses)?value.weaknesses.map(String):[],errors:Array.isArray(value.errors)?value.errors.map((e:Record<string,unknown>)=>({excerpt:String(e.excerpt??""),issue:String(e.issue??""),suggestion:String(e.suggestion??"")})):[],rewriteSuggestions:Array.isArray(value.rewriteSuggestions)?value.rewriteSuggestions.map((r:Record<string,unknown>)=>({original:String(r.original??""),suggested:String(r.suggested??""),reason:String(r.reason??"")})):[],improvementPlan:Array.isArray(value.improvementPlan)?value.improvementPlan.map(String):[]};
}

Deno.serve(async(req)=>{
  if(req.method==='OPTIONS') return new Response('ok',{headers:cors});
  try{
    const body=await req.json(); const essay=String(body.essay??'').trim();
    if(!essay) return new Response(JSON.stringify({error:'Redação vazia.'}),{status:400,headers:{...cors,'Content-Type':'application/json'}});
    const key=Deno.env.get('LOVABLE_API_KEY');
    if(!key) return new Response(JSON.stringify({error:'LOVABLE_API_KEY não está disponível no Edge Function.'}),{status:503,headers:{...cors,'Content-Type':'application/json'}});
    const input=[`TEMA: ${body.theme??''}`,`COMANDO: ${body.command??''}`,`TEXTOS MOTIVADORES:\n${(body.support??[]).join('\n\n')}`,`REDAÇÃO DO CANDIDATO:\n${essay}`].join('\n\n');
    const response=await fetch('https://ai.gateway.lovable.dev/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${key}`,'Lovable-API-Key':key},body:JSON.stringify({model:'openai/gpt-5.5',temperature:0.2,stream:false,messages:[{role:'system',content:SYSTEM_PROMPT},{role:'user',content:input}]})});
    if(response.status===402)return new Response(JSON.stringify({error:'O Gateway de IA está sem créditos.'}),{status:402,headers:{...cors,'Content-Type':'application/json'}});
    if(response.status===429)return new Response(JSON.stringify({error:'O Gateway de IA atingiu o limite temporário.'}),{status:429,headers:{...cors,'Content-Type':'application/json'}});
    if(!response.ok){console.error('AI gateway',response.status,await response.text());return new Response(JSON.stringify({error:'O Gateway de IA não conseguiu processar a correção.'}),{status:502,headers:{...cors,'Content-Type':'application/json'}})}
    const data=await response.json(); const raw=data.choices?.[0]?.message?.content;
    if(!raw) throw new Error('Resposta vazia');
    return new Response(JSON.stringify({correction:parseCorrection(raw)}),{headers:{...cors,'Content-Type':'application/json'}});
  }catch(error){console.error('essay correction',error);return new Response(JSON.stringify({error:'Não foi possível processar a correção agora.'}),{status:500,headers:{...cors,'Content-Type':'application/json'}})}
});
