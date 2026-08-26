-- Aprova Unimar: production-oriented schema draft.
-- Run through Supabase migrations once the project database is connected.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  goal text not null default 'Preparar para o Vestibular UNIMAR',
  target_course text not null default 'Inteligência Artificial',
  level text not null default 'Reconstruindo base do Ensino Médio',
  exam_date date not null default '2026-10-18',
  plan_start date not null default '2026-08-26',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subjects (id uuid primary key default gen_random_uuid(), name text not null unique, created_at timestamptz not null default now());
create table if not exists public.topics (id uuid primary key default gen_random_uuid(), subject_id uuid not null references public.subjects(id) on delete cascade, name text not null, position int not null default 0, unique(subject_id,name));
create table if not exists public.subtopics (id uuid primary key default gen_random_uuid(), topic_id uuid not null references public.topics(id) on delete cascade, name text not null, position int not null default 0, unique(topic_id,name));

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(), subject_id uuid references public.subjects(id), topic_id uuid references public.topics(id), subtopic_id uuid references public.subtopics(id), difficulty text not null default 'base', statement text not null, option_a text not null, option_b text not null, option_c text not null, option_d text not null, option_e text not null, correct_answer char(1) not null, explanation text not null, created_at timestamptz not null default now()
);
create table if not exists public.question_attempts (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, question_id uuid not null references public.questions(id) on delete cascade, selected_answer char(1) not null, is_correct boolean not null, elapsed_seconds int, created_at timestamptz not null default now());

create table if not exists public.study_plans (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, start_date date not null default '2026-08-26', exam_date date not null default '2026-10-18', created_at timestamptz not null default now());
create table if not exists public.study_days (id uuid primary key default gen_random_uuid(), plan_id uuid not null references public.study_plans(id) on delete cascade, study_date date not null, week_number int not null, day_number int not null, phase text not null, status text not null default 'pending', unique(plan_id,study_date));
create table if not exists public.study_sessions (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, study_day_id uuid references public.study_days(id) on delete set null, topic_id uuid references public.topics(id) on delete set null, started_at timestamptz, ended_at timestamptz, duration_seconds int not null default 0);

create table if not exists public.reviews (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, topic_id uuid not null references public.topics(id) on delete cascade, source_completed_at timestamptz not null, scheduled_for date not null, completed_at timestamptz, review_type text not null, created_at timestamptz not null default now());
create table if not exists public.error_notebook (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, question_id uuid not null references public.questions(id) on delete cascade, last_error_at timestamptz not null default now(), error_count int not null default 1, note text);

create table if not exists public.simulations (id uuid primary key default gen_random_uuid(), title text not null, duration_minutes int not null, difficulty text not null, created_at timestamptz not null default now());
create table if not exists public.simulation_questions (simulation_id uuid not null references public.simulations(id) on delete cascade, question_id uuid not null references public.questions(id) on delete cascade, position int not null, primary key(simulation_id,question_id));
create table if not exists public.simulation_attempts (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, simulation_id uuid not null references public.simulations(id), started_at timestamptz not null default now(), finished_at timestamptz, score numeric, correct_count int not null default 0, total_count int not null default 0);
create table if not exists public.simulation_answers (attempt_id uuid not null references public.simulation_attempts(id) on delete cascade, question_id uuid not null references public.questions(id), selected_answer char(1), marked_for_review boolean not null default false, elapsed_seconds int, primary key(attempt_id,question_id));

create table if not exists public.essays (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, title text, prompt text not null, body text not null default '', status text not null default 'draft', submitted_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists public.essay_corrections (id uuid primary key default gen_random_uuid(), essay_id uuid not null references public.essays(id) on delete cascade, score numeric, strengths jsonb not null default '[]', weaknesses jsonb not null default '[]', errors jsonb not null default '[]', rewrites jsonb not null default '[]', improvement_plan text, created_at timestamptz not null default now());

create table if not exists public.ai_conversations (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, context jsonb not null default '{}', created_at timestamptz not null default now());
create table if not exists public.ai_messages (id uuid primary key default gen_random_uuid(), conversation_id uuid not null references public.ai_conversations(id) on delete cascade, role text not null, content text not null, created_at timestamptz not null default now());
create table if not exists public.achievements (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, code text not null, unlocked_at timestamptz not null default now(), unique(user_id,code));
create table if not exists public.user_progress (user_id uuid primary key references auth.users(id) on delete cascade, xp int not null default 0, level int not null default 1, streak_days int not null default 0, updated_at timestamptz not null default now());

alter table public.profiles enable row level security;
alter table public.question_attempts enable row level security;
alter table public.study_plans enable row level security;
alter table public.study_days enable row level security;
alter table public.study_sessions enable row level security;
alter table public.reviews enable row level security;
alter table public.error_notebook enable row level security;
alter table public.simulation_attempts enable row level security;
alter table public.simulation_answers enable row level security;
alter table public.essays enable row level security;
alter table public.essay_corrections enable row level security;
alter table public.ai_conversations enable row level security;
alter table public.ai_messages enable row level security;
alter table public.achievements enable row level security;
alter table public.user_progress enable row level security;

-- Policies are intentionally explicit and user-scoped; public curriculum tables can later receive read-only policies.
create policy "profiles own row" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "attempts own rows" on public.question_attempts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "plans own rows" on public.study_plans for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "sessions own rows" on public.study_sessions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "reviews own rows" on public.reviews for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "errors own rows" on public.error_notebook for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "simulation attempts own rows" on public.simulation_attempts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "essays own rows" on public.essays for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "ai conversations own rows" on public.ai_conversations for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "progress own row" on public.user_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
