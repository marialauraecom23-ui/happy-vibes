REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

INSERT INTO public.subjects (id, name, position) VALUES
 ('port','Língua Portuguesa',1),
 ('lit','Literatura',2),
 ('mat','Matemática',3),
 ('bio','Biologia',4),
 ('qui','Química',5),
 ('fis','Física',6);

INSERT INTO public.topics (id, subject_id, name, position, objective, learn_md, example_md, review_md, resource_label, resource_url, duration_min) VALUES
('port-interpretacao','port','Interpretação de textos',1,
 'Localizar informação explícita, inferir sentidos e identificar a tese do texto.',
 $t$A interpretação de texto se apoia em três movimentos.

1. **Leitura global**: descubra o assunto e a finalidade do texto (informar, convencer, narrar).
2. **Informação explícita**: o que está escrito com todas as letras. Sempre comece por aqui — a maioria das questões cobra isso.
3. **Inferência**: conclusão obrigatória a partir do que está escrito. Inferir não é opinar: se o texto não sustenta, a alternativa está errada.

Estratégia de prova: leia o enunciado antes do texto, sublinhe a pergunta (ideia principal? sentido de uma palavra? intenção do autor?) e volte ao trecho exato. Palavras como *sempre*, *nunca*, *todos* costumam marcar alternativas exageradas.$t$,
 $t$**Texto**: "Apesar do aumento do número de bibliotecas na cidade, o empréstimo de livros caiu pela metade em cinco anos."

**Pergunta**: o que se pode concluir?

**Análise**: o conector *apesar de* indica contraste. O texto afirma dois fatos: mais bibliotecas e menos empréstimos. Conclusão sustentada: a ampliação da estrutura não garantiu aumento da leitura. Conclusão NÃO sustentada: "as pessoas não gostam de ler" — isso é opinião, o texto não diz.$t$,
 $t$Revise em 3 passos: (1) diferencie informação explícita de inferência; (2) liste os conectores de contraste (mas, porém, apesar de) e de causa (porque, já que); (3) refaça duas questões erradas explicando por que a alternativa correta é a única sustentada pelo texto.$t$,
 NULL, NULL, 35),

('port-classes','port','Classes de palavras e concordância',2,
 'Reconhecer substantivo, adjetivo, verbo e pronome e aplicar a concordância verbal e nominal.',
 $t$**Classes essenciais**
- *Substantivo*: nomeia (casa, prova, coragem).
- *Adjetivo*: caracteriza o substantivo (prova difícil).
- *Verbo*: indica ação, estado ou fenômeno (estudar, ser, chover).
- *Pronome*: substitui ou acompanha o substantivo (ela, meu, aquele).
- *Advérbio*: modifica verbo/adjetivo (muito, hoje, rapidamente).

**Concordância verbal**: o verbo concorda com o sujeito. Ache o sujeito perguntando "quem?" antes do verbo.
**Concordância nominal**: artigo e adjetivo concordam em gênero e número com o substantivo.

Armadilha clássica: sujeito distante do verbo. "A caixa de livros *chegou*" — o núcleo do sujeito é *caixa*, não *livros*.$t$,
 $t$"Os alunos que estudam todos os dias **conseguem** melhores resultados."

Sujeito: *os alunos* (plural) → verbo *conseguem* no plural. O adjetivo *melhores* concorda com *resultados* (masculino plural).

Errado: "Os aluno que estuda todos os dia consegue melhor resultado."$t$,
 $t$Escreva 5 frases suas, sublinhe o núcleo do sujeito e confira o verbo. Depois releia uma redação sua procurando apenas erros de concordância.$t$,
 NULL, NULL, 30),

('lit-escolas','lit','Escolas literárias: Romantismo, Realismo e Modernismo',1,
 'Identificar as características centrais e os principais autores de cada escola.',
 $t$**Romantismo (séc. XIX)**: subjetividade, idealização do amor e da mulher, nacionalismo, indianismo. José de Alencar, Gonçalves Dias, Álvares de Azevedo.

**Realismo/Naturalismo**: objetividade, crítica social, análise psicológica, ironia. Machado de Assis (*Dom Casmurro*, *Memórias Póstumas de Brás Cubas*), Aluísio Azevedo (*O Cortiço*).

**Modernismo (a partir de 1922)**: ruptura com a forma tradicional, verso livre, linguagem coloquial, valorização do Brasil real. Mário de Andrade, Oswald de Andrade, Manuel Bandeira, Carlos Drummond de Andrade.

Chave de prova: Romantismo idealiza, Realismo desmascara, Modernismo experimenta.$t$,
 $t$Trecho: "Bentinho narra sua própria história e acusa Capitu sem provas."

Isso é Realismo (Machado de Assis, *Dom Casmurro*): narrador em 1ª pessoa, não confiável, foco psicológico e ironia. Não é Romantismo, pois não há idealização — há dúvida e crítica.$t$,
 $t$Monte uma tabela de 3 colunas (Romantismo / Realismo / Modernismo) com: visão de mundo, linguagem, 2 autores e 1 obra. Revise em voz alta.$t$,
 NULL, NULL, 30),

('mat-fracoes','mat','Frações e números racionais',1,
 'Comparar, somar, subtrair, multiplicar e dividir frações com segurança.',
 $t$Uma fração a/b representa *a* partes de um todo dividido em *b* partes.

- **Comparar**: transforme em decimal (2/3 ≈ 0,67) ou iguale os denominadores.
- **Somar/subtrair**: só com o mesmo denominador. Use o MMC. 1/2 + 1/3 = 3/6 + 2/6 = 5/6.
- **Multiplicar**: numerador × numerador e denominador × denominador. 2/3 × 3/4 = 6/12 = 1/2.
- **Dividir**: multiplique pelo inverso. (2/3) ÷ (4/5) = 2/3 × 5/4 = 10/12 = 5/6.
- **Equivalentes**: multiplique ou divida os dois termos pelo mesmo número. 2/3 = 4/6 = 6/9.$t$,
 $t$Calcule 3/4 − 1/6.

MMC(4,6) = 12 → 3/4 = 9/12 e 1/6 = 2/12.
9/12 − 2/12 = **7/12** ≈ 0,583.$t$,
 $t$Refaça 5 operações trocando a ordem (soma, subtração, multiplicação, divisão) e confira o resultado em decimal. Se errar, o problema quase sempre está no MMC.$t$,
 NULL, NULL, 35),

('mat-porcentagem','mat','Porcentagem e regra de três',2,
 'Resolver aumentos, descontos e proporções diretas e inversas.',
 $t$**Porcentagem** é uma fração de denominador 100: 25% = 25/100 = 0,25.

- Calcular: 25% de 80 = 0,25 × 80 = 20.
- Aumento de x%: multiplique por (1 + x/100). +20% → ×1,20.
- Desconto de x%: multiplique por (1 − x/100). −30% → ×0,70.
- Aumentos sucessivos **não** se somam: +10% e depois +10% = ×1,1×1,1 = ×1,21 (21%).

**Regra de três direta**: quando uma grandeza aumenta, a outra aumenta. Multiplique em cruz.
**Inversa**: quando uma aumenta, a outra diminui (ex.: mais operários, menos tempo). Multiplique em linha.$t$,
 $t$Um produto de R$ 200 recebe desconto de 15%. Qual o preço final?

200 × (1 − 0,15) = 200 × 0,85 = **R$ 170**.

Se depois subir 15%: 170 × 1,15 = 195,50 — não volta a 200, porque o percentual incide sobre bases diferentes.$t$,
 $t$Resolva 3 situações do dia a dia (desconto, juros simples, proporção de receita) escrevendo a montagem antes de calcular.$t$,
 NULL, NULL, 30),

('mat-funcoes','mat','Função do 1º e do 2º grau',3,
 'Interpretar gráficos, calcular raízes e reconhecer crescimento e concavidade.',
 $t$**Função do 1º grau**: f(x) = ax + b. Gráfico: reta. *a* é a taxa de variação (a>0 cresce, a<0 decresce) e *b* é onde a reta corta o eixo y. Raiz: x = −b/a.

**Função do 2º grau**: f(x) = ax² + bx + c. Gráfico: parábola. a>0 concavidade para cima (ponto de mínimo), a<0 para baixo (máximo).
Raízes por Bhaskara: x = (−b ± √Δ)/2a, com Δ = b² − 4ac.
- Δ > 0: duas raízes reais; Δ = 0: uma; Δ < 0: nenhuma raiz real.
Vértice: x_v = −b/2a.$t$,
 $t$Resolva x² − 5x + 6 = 0.

Δ = (−5)² − 4·1·6 = 25 − 24 = 1.
x = (5 ± 1)/2 → x = 3 ou x = 2.
Como a = 1 > 0, a parábola tem concavidade para cima e mínimo em x_v = 5/2.$t$,
 $t$Desenhe à mão o gráfico de uma reta crescente, uma decrescente e duas parábolas (a>0 e a<0), marcando raízes e vértice.$t$,
 NULL, NULL, 40),

('bio-celula','bio','Célula e organelas',1,
 'Diferenciar células procarióticas e eucarióticas e associar cada organela à sua função.',
 $t$A célula é a unidade básica da vida.

- **Procarionte** (bactérias): sem núcleo definido, sem organelas membranosas.
- **Eucarionte** (animais, plantas, fungos): núcleo com carioteca e organelas.

Principais organelas:
- **Mitocôndria**: respiração celular, produção de ATP.
- **Ribossomo**: síntese de proteínas.
- **Retículo endoplasmático rugoso**: transporte e produção de proteínas; **liso**: lipídios e desintoxicação.
- **Complexo golgiense**: armazena e secreta.
- **Lisossomo**: digestão intracelular.
- **Cloroplasto** (vegetal): fotossíntese.
- **Parede celular e vacúolo grande**: exclusivos da célula vegetal.$t$,
 $t$Por que uma célula muscular tem muitas mitocôndrias?

Porque o músculo gasta muita energia. A mitocôndria produz ATP na respiração celular; quanto maior a demanda energética do tecido, maior o número de mitocôndrias.$t$,
 $t$Feche o material e escreva a função de 6 organelas. Depois confira e reescreva apenas as que errou.$t$,
 NULL, NULL, 35),

('bio-ecologia','bio','Ecologia: cadeias alimentares e ciclos',2,
 'Interpretar cadeias e teias alimentares e explicar o fluxo de energia.',
 $t$**Níveis tróficos**: produtores (fazem fotossíntese) → consumidores primários (herbívoros) → secundários → terciários. **Decompositores** reciclam matéria.

O **fluxo de energia é unidirecional**: entra pelo Sol e se perde como calor. Só cerca de 10% da energia passa de um nível para o outro — por isso as cadeias são curtas.

A **matéria é reciclada** (ciclos do carbono, da água e do nitrogênio); a energia não.

Conceitos: *habitat* (onde vive), *nicho* (o papel que exerce), *biomassa* (massa de matéria orgânica).$t$,
 $t$Cadeia: capim → gafanhoto → sapo → cobra.

Capim = produtor; gafanhoto = consumidor primário; sapo = secundário; cobra = terciário.
Se os sapos desaparecerem, os gafanhotos aumentam e o capim diminui — efeito em cascata.$t$,
 $t$Desenhe uma teia alimentar com 6 seres e classifique cada nível trófico. Explique em uma frase por que a energia diminui a cada nível.$t$,
 NULL, NULL, 30),

('qui-materia','qui','Matéria, misturas e separação',1,
 'Classificar substâncias e misturas e escolher o método de separação correto.',
 $t$**Substância pura**: composição fixa (água destilada, O₂). **Mistura**: duas ou mais substâncias.
- *Homogênea* (solução): uma fase — água + sal.
- *Heterogênea*: mais de uma fase — água + óleo.

Métodos de separação:
- **Filtração**: sólido insolúvel + líquido.
- **Decantação**: líquidos imiscíveis ou sólido mais denso.
- **Destilação simples**: sólido dissolvido em líquido (recupera o líquido).
- **Destilação fracionada**: líquidos miscíveis com pontos de ebulição diferentes.
- **Catação, peneiração, separação magnética**: sólidos.

Transformação **física** muda o estado/forma; **química** forma nova substância.$t$,
 $t$Como separar água e sal, recuperando os dois?

Destilação simples: aquecendo, a água evapora (100 °C) e é condensada em outro frasco; o sal permanece no balão. Só filtrar não funciona, porque o sal está dissolvido.$t$,
 $t$Liste 5 misturas da sua casa, classifique em homogênea/heterogênea e indique o método de separação.$t$,
 NULL, NULL, 30),

('qui-tabela','qui','Tabela periódica e ligações químicas',2,
 'Localizar elementos na tabela e prever o tipo de ligação formada.',
 $t$A tabela é organizada por **número atômico** crescente. **Período** = linha (nº de camadas). **Família/grupo** = coluna (elétrons na camada de valência).

Famílias: 1 metais alcalinos, 2 alcalinoterrosos, 17 halogênios, 18 gases nobres (estáveis).

**Ligações**
- **Iônica**: metal + ametal; há transferência de elétrons (NaCl). Sólidos duros, conduzem corrente dissolvidos.
- **Covalente**: ametal + ametal; compartilhamento de elétrons (H₂O, CO₂).
- **Metálica**: entre metais; mar de elétrons, boa condução.

Regra do octeto: os átomos tendem a ficar com 8 elétrons na camada de valência.$t$,
 $t$Que ligação existe no NaCl?

Na (família 1, metal) cede 1 elétron; Cl (família 17, ametal) recebe. Formam-se Na⁺ e Cl⁻ e a atração eletrostática gera a **ligação iônica**.$t$,
 $t$Escreva 5 compostos e classifique a ligação. Confira olhando se cada elemento é metal ou ametal.$t$,
 NULL, NULL, 35),

('fis-cinematica','fis','Cinemática: MU e MUV',1,
 'Aplicar as equações do movimento uniforme e uniformemente variado.',
 $t$**Movimento uniforme (MU)**: velocidade constante.
S = S₀ + v·t

**Movimento uniformemente variado (MUV)**: aceleração constante.
- v = v₀ + a·t
- S = S₀ + v₀t + (a·t²)/2
- Torricelli: v² = v₀² + 2·a·ΔS (útil quando não há tempo no enunciado)

Cuidado com unidades: 1 m/s = 3,6 km/h. Divida km/h por 3,6 para obter m/s.
Sinal negativo de *a* significa desaceleração no sentido adotado.$t$,
 $t$Um carro a 20 m/s freia com a = −4 m/s². Que distância percorre até parar?

Torricelli: 0² = 20² + 2(−4)·ΔS → 0 = 400 − 8ΔS → ΔS = **50 m**.$t$,
 $t$Refaça o exemplo trocando a velocidade para 30 m/s e a aceleração para −5 m/s². Depois converta 72 km/h para m/s.$t$,
 NULL, NULL, 35),

('fis-newton','fis','Leis de Newton',2,
 'Reconhecer as três leis e resolver problemas simples de força resultante.',
 $t$**1ª lei (inércia)**: sem força resultante, o corpo mantém repouso ou movimento retilíneo uniforme.
**2ª lei (fundamental)**: F_R = m·a. Força em newtons (N), massa em kg, aceleração em m/s².
**3ª lei (ação e reação)**: forças aos pares, mesma intensidade, sentidos opostos, em **corpos diferentes** — por isso não se anulam.

Peso: P = m·g (g ≈ 10 m/s²). Peso é força (N); massa é kg e não muda com o local.
Normal é a força de contato perpendicular à superfície e nem sempre é igual ao peso.$t$,
 $t$Uma força resultante de 30 N atua em um corpo de 6 kg. Qual a aceleração?

F_R = m·a → 30 = 6·a → a = **5 m/s²**.
Se o corpo estiver em repouso e a força cessar, ele segue em MRU (1ª lei), não para instantaneamente.$t$,
 $t$Explique com suas palavras por que ação e reação não se anulam e calcule o peso de um corpo de 8 kg.$t$,
 NULL, NULL, 35);

INSERT INTO public.questions (id, subject_id, topic_id, difficulty, statement, options, correct_answer, explanation) VALUES
('q-port-int-1','port','port-interpretacao',1,'Na compreensão de um texto, o primeiro tipo de informação que se deve buscar é:', '{"A":"Uma opinião pessoal do leitor","B":"Uma informação explícita no texto","C":"Uma regra gramatical","D":"Um dado externo ao texto","E":"A biografia do autor"}','B','A leitura começa pelo que está escrito. Só depois de identificar a informação explícita é possível inferir com segurança.'),
('q-port-int-2','port','port-interpretacao',2,'"Apesar do aumento do número de bibliotecas, o empréstimo de livros caiu." A conclusão sustentada pelo texto é:', '{"A":"As pessoas não gostam de ler","B":"As bibliotecas fecharam","C":"A ampliação da estrutura não garantiu aumento da leitura","D":"O número de bibliotecas diminuiu","E":"Os livros ficaram mais caros"}','C','O conector "apesar de" marca contraste entre mais estrutura e menos empréstimos. As demais alternativas extrapolam o texto.'),
('q-port-int-3','port','port-interpretacao',2,'Inferir, em interpretação de textos, significa:', '{"A":"Opinar livremente sobre o assunto","B":"Concluir algo sustentado pelas informações do texto","C":"Copiar um trecho do texto","D":"Resumir o texto em uma frase","E":"Buscar a intenção do leitor"}','B','Inferência é conclusão obrigatória a partir do texto; opinião não sustentada pelo texto é erro clássico de prova.'),
('q-port-cla-1','port','port-classes',1,'Em "A caixa de livros chegou hoje", o núcleo do sujeito é:', '{"A":"livros","B":"caixa","C":"hoje","D":"chegou","E":"de"}','B','O núcleo é "caixa"; "de livros" é adjunto. Por isso o verbo fica no singular: chegou.'),
('q-port-cla-2','port','port-classes',2,'Assinale a frase com concordância correta:', '{"A":"Os aluno estuda todo dia","B":"Fazem dois anos que estudo","C":"Os alunos que estudam conseguem melhores resultados","D":"Chegaram a encomenda","E":"Menas pessoas vieram"}','C','Sujeito plural ("os alunos") exige verbo plural, e o adjetivo "melhores" concorda com "resultados".'),
('q-port-cla-3','port','port-classes',1,'A palavra que caracteriza o substantivo é o:', '{"A":"verbo","B":"advérbio","C":"adjetivo","D":"pronome","E":"artigo"}','C','O adjetivo atribui característica ao substantivo (prova difícil, texto claro).'),
('q-lit-esc-1','lit','lit-escolas',2,'Narrador em primeira pessoa, ironia e análise psicológica em Dom Casmurro caracterizam o:', '{"A":"Romantismo","B":"Realismo","C":"Barroco","D":"Arcadismo","E":"Parnasianismo"}','B','Machado de Assis é o principal nome do Realismo brasileiro: objetividade crítica, ironia e foco psicológico.'),
('q-lit-esc-2','lit','lit-escolas',1,'A idealização amorosa e o indianismo são traços do:', '{"A":"Modernismo","B":"Realismo","C":"Naturalismo","D":"Romantismo","E":"Simbolismo"}','D','O Romantismo idealiza o amor, a mulher e o índio como herói nacional (José de Alencar, Gonçalves Dias).'),
('q-lit-esc-3','lit','lit-escolas',2,'A Semana de Arte Moderna de 1922 marca o início do:', '{"A":"Modernismo","B":"Realismo","C":"Romantismo","D":"Parnasianismo","E":"Barroco"}','A','1922 inaugura o Modernismo brasileiro: ruptura formal, verso livre e linguagem coloquial.'),
('q-mat-fra-1','mat','mat-fracoes',1,'Qual fração é maior?', '{"A":"2/3","B":"3/4","C":"1/2","D":"3/5","E":"5/9"}','B','3/4 = 0,75, maior que 2/3 ≈ 0,67, 3/5 = 0,6, 1/2 = 0,5 e 5/9 ≈ 0,56.'),
('q-mat-fra-2','mat','mat-fracoes',2,'O resultado de 3/4 − 1/6 é:', '{"A":"2/10","B":"7/12","C":"1/2","D":"11/12","E":"5/12"}','B','MMC(4,6)=12: 9/12 − 2/12 = 7/12.'),
('q-mat-fra-3','mat','mat-fracoes',2,'Uma fração equivalente a 2/3 é:', '{"A":"3/5","B":"4/6","C":"5/8","D":"6/8","E":"7/9"}','B','Multiplicando numerador e denominador por 2 obtém-se 4/6.'),
('q-mat-por-1','mat','mat-porcentagem',1,'25% de 80 é:', '{"A":"16","B":"20","C":"25","D":"32","E":"18"}','B','0,25 × 80 = 20.'),
('q-mat-por-2','mat','mat-porcentagem',2,'Um produto de R$ 200 com desconto de 15% passa a custar:', '{"A":"R$ 185","B":"R$ 170","C":"R$ 175","D":"R$ 160","E":"R$ 150"}','B','200 × 0,85 = 170.'),
('q-mat-por-3','mat','mat-porcentagem',3,'Dois aumentos sucessivos de 10% equivalem a um aumento único de:', '{"A":"20%","B":"21%","C":"19%","D":"11%","E":"22%"}','B','1,10 × 1,10 = 1,21, ou seja, 21%. Percentuais sucessivos não se somam.'),
('q-mat-fun-1','mat','mat-funcoes',2,'As raízes de x² − 5x + 6 = 0 são:', '{"A":"1 e 6","B":"2 e 3","C":"−2 e −3","D":"0 e 5","E":"5 e 6"}','B','Δ = 25 − 24 = 1 → x = (5 ± 1)/2 → 3 e 2.'),
('q-mat-fun-2','mat','mat-funcoes',1,'Na função f(x) = 3x − 6, a raiz é:', '{"A":"x = −2","B":"x = 2","C":"x = 6","D":"x = 3","E":"x = 0"}','B','3x − 6 = 0 → x = 2.'),
('q-mat-fun-3','mat','mat-funcoes',2,'Se, em f(x) = ax² + bx + c, temos a < 0, então a parábola:', '{"A":"tem concavidade para cima e ponto de mínimo","B":"tem concavidade para baixo e ponto de máximo","C":"é uma reta","D":"não tem vértice","E":"nunca corta o eixo x"}','B','Com a < 0 a concavidade é para baixo e o vértice é ponto de máximo.'),
('q-bio-cel-1','bio','bio-celula',1,'A organela diretamente responsável pela produção de ATP na respiração celular é:', '{"A":"Mitocôndria","B":"Ribossomo","C":"Lisossomo","D":"Complexo golgiense","E":"Centríolo"}','A','A mitocôndria realiza a respiração celular aeróbica, principal fonte de ATP.'),
('q-bio-cel-2','bio','bio-celula',2,'São estruturas exclusivas da célula vegetal:', '{"A":"Mitocôndria e ribossomo","B":"Parede celular e cloroplasto","C":"Núcleo e lisossomo","D":"Membrana e citoplasma","E":"Centríolo e flagelo"}','B','Parede celular, cloroplasto e vacúolo central são típicos de células vegetais.'),
('q-bio-cel-3','bio','bio-celula',1,'Células procarióticas caracterizam-se por:', '{"A":"Possuir núcleo organizado","B":"Não possuir núcleo delimitado por membrana","C":"Ter cloroplastos","D":"Ser sempre pluricelulares","E":"Não possuir material genético"}','B','Procariontes (bactérias) têm DNA disperso no citoplasma, sem carioteca.'),
('q-bio-eco-1','bio','bio-ecologia',1,'Na cadeia capim → gafanhoto → sapo → cobra, o sapo é consumidor:', '{"A":"primário","B":"secundário","C":"terciário","D":"produtor","E":"decompositor"}','B','O sapo come o herbívoro (gafanhoto), portanto é consumidor secundário.'),
('q-bio-eco-2','bio','bio-ecologia',2,'Sobre energia e matéria nos ecossistemas, é correto afirmar:', '{"A":"A energia é reciclada e a matéria se perde","B":"Ambas são recicladas","C":"A matéria é reciclada e o fluxo de energia é unidirecional","D":"Não há perda de energia entre níveis","E":"Decompositores não participam dos ciclos"}','C','A matéria circula em ciclos; a energia entra pelo Sol e se dissipa como calor, em fluxo unidirecional.'),
('q-qui-mat-1','qui','qui-materia',1,'Água e óleo formam uma mistura:', '{"A":"homogênea","B":"heterogênea","C":"substância pura","D":"solução","E":"composto"}','B','São líquidos imiscíveis: formam duas fases, portanto mistura heterogênea.'),
('q-qui-mat-2','qui','qui-materia',2,'Para separar sal dissolvido em água recuperando os dois componentes, usa-se:', '{"A":"filtração","B":"catação","C":"destilação simples","D":"separação magnética","E":"peneiração"}','C','A destilação simples evapora e condensa a água, deixando o sal no recipiente.'),
('q-qui-tab-1','qui','qui-tabela',2,'A ligação existente no NaCl é:', '{"A":"covalente","B":"metálica","C":"iônica","D":"de hidrogênio","E":"dativa"}','C','Metal (Na) cede elétron para ametal (Cl), formando íons que se atraem: ligação iônica.'),
('q-qui-tab-2','qui','qui-tabela',1,'Os elementos da família 18 são chamados de:', '{"A":"halogênios","B":"metais alcalinos","C":"gases nobres","D":"alcalinoterrosos","E":"calcogênios"}','C','A família 18 reúne os gases nobres, estáveis por já terem a camada de valência completa.'),
('q-fis-cin-1','fis','fis-cinematica',2,'Um carro a 20 m/s freia com aceleração de −4 m/s². A distância até parar é:', '{"A":"25 m","B":"40 m","C":"50 m","D":"80 m","E":"100 m"}','C','Torricelli: 0 = 400 − 8ΔS → ΔS = 50 m.'),
('q-fis-cin-2','fis','fis-cinematica',1,'72 km/h correspondem a:', '{"A":"7,2 m/s","B":"20 m/s","C":"25 m/s","D":"36 m/s","E":"14,4 m/s"}','B','Divide-se por 3,6: 72/3,6 = 20 m/s.'),
('q-fis-new-1','fis','fis-newton',1,'Uma força resultante de 30 N atua em um corpo de 6 kg. A aceleração é:', '{"A":"3 m/s²","B":"5 m/s²","C":"180 m/s²","D":"0,2 m/s²","E":"36 m/s²"}','B','F = m·a → a = 30/6 = 5 m/s².'),
('q-fis-new-2','fis','fis-newton',2,'As forças de ação e reação não se anulam porque:', '{"A":"têm intensidades diferentes","B":"atuam em corpos diferentes","C":"têm o mesmo sentido","D":"uma é sempre maior","E":"dependem da massa"}','B','Pela 3ª lei, o par age em corpos distintos; forças só se anulam quando atuam no mesmo corpo.');

INSERT INTO public.essay_prompts (id, week_number, theme, motivating_texts, command) VALUES
('red-1',1,'Os desafios do acesso à leitura no Brasil','[{"titulo":"Texto I","conteudo":"Pesquisa Retratos da Leitura aponta que parte significativa dos brasileiros não leu nenhum livro completo nos últimos três meses, e o preço e a distância das bibliotecas aparecem entre os motivos citados."},{"titulo":"Texto II","conteudo":"Programas de leitura em escolas públicas mostram que o contato diário com o livro, mesmo por 20 minutos, melhora o desempenho em interpretação de textos em todas as disciplinas."}]','Com base nos textos motivadores e em seus conhecimentos, redija um texto dissertativo-argumentativo em prosa sobre "Os desafios do acesso à leitura no Brasil", apresentando proposta de intervenção que respeite os direitos humanos.'),
('red-2',2,'Inteligência artificial e o futuro do trabalho','[{"titulo":"Texto I","conteudo":"Sistemas de inteligência artificial passaram a executar tarefas antes exclusivamente humanas, da triagem de currículos ao atendimento ao cliente."},{"titulo":"Texto II","conteudo":"Especialistas apontam que a automação elimina funções repetitivas, mas cria demanda por profissionais capazes de supervisionar, auditar e treinar sistemas."}]','Redija um texto dissertativo-argumentativo sobre os impactos da inteligência artificial no mundo do trabalho, com proposta de intervenção detalhada.'),
('red-3',3,'Saúde mental na adolescência','[{"titulo":"Texto I","conteudo":"Dados de saúde pública indicam aumento de quadros de ansiedade entre jovens em idade escolar."},{"titulo":"Texto II","conteudo":"Escolas que adotaram acolhimento psicológico e rotinas de descanso relatam queda na evasão escolar."}]','Redija um texto dissertativo-argumentativo sobre os caminhos para o cuidado da saúde mental de adolescentes no Brasil.'),
('red-4',4,'O consumo consciente e o descarte de resíduos','[{"titulo":"Texto I","conteudo":"O Brasil produz milhões de toneladas de resíduos sólidos por ano, e parte relevante ainda vai para lixões a céu aberto."},{"titulo":"Texto II","conteudo":"Cooperativas de catadores comprovam que a coleta seletiva bem estruturada gera renda e reduz o volume de lixo aterrado."}]','Redija um texto dissertativo-argumentativo sobre consumo consciente e destinação de resíduos no Brasil, com proposta de intervenção.'),
('red-5',5,'Desinformação e responsabilidade nas redes sociais','[{"titulo":"Texto I","conteudo":"Conteúdos falsos circulam mais rápido do que checagens, especialmente em temas de saúde e eleições."},{"titulo":"Texto II","conteudo":"Projetos de educação midiática em escolas melhoram a capacidade dos estudantes de identificar fontes confiáveis."}]','Redija um texto dissertativo-argumentativo sobre o enfrentamento da desinformação nas redes sociais.'),
('red-6',6,'Mobilidade urbana e qualidade de vida','[{"titulo":"Texto I","conteudo":"Trabalhadores de grandes cidades gastam horas diárias em deslocamento, com impacto em saúde e produtividade."},{"titulo":"Texto II","conteudo":"Cidades que investiram em transporte coletivo e ciclovias reduziram acidentes e emissões."}]','Redija um texto dissertativo-argumentativo sobre os caminhos para melhorar a mobilidade urbana no Brasil.'),
('red-7',7,'Educação em tempo integral: avanços e obstáculos','[{"titulo":"Texto I","conteudo":"A ampliação da jornada escolar é meta de planos nacionais de educação, mas depende de infraestrutura e formação docente."},{"titulo":"Texto II","conteudo":"Escolas de tempo integral apresentam melhores indicadores de aprendizagem e menor evasão."}]','Redija um texto dissertativo-argumentativo sobre os desafios da educação em tempo integral no Brasil.'),
('red-8',8,'Valorização da ciência e do conhecimento no Brasil','[{"titulo":"Texto I","conteudo":"O investimento em pesquisa é apontado como fator decisivo para desenvolvimento econômico e soberania tecnológica."},{"titulo":"Texto II","conteudo":"A divulgação científica tem papel central no combate a crenças sem base empírica."}]','Redija um texto dissertativo-argumentativo sobre a importância da valorização da ciência no Brasil, com proposta de intervenção.');