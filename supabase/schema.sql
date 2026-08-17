-- ========================================================
-- M.A.M. College of Engineering - Department of CSE
-- Symposium Database Schema & Initial Seed Data
-- ========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. EVENTS TABLE
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  subtitle text,
  category text check (category in ('technical', 'non-technical')) not null,
  description text,
  rules text[],
  team_size text default 'Individual',
  prize text,
  image_url text,
  created_at timestamp with time zone default now()
);

-- SQL Migration to add subtitle if table already exists
alter table events add column if not exists subtitle text;

-- 2. COORDINATORS TABLE
create table if not exists coordinators (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  name text not null,
  phone text,
  role text check (role in ('faculty', 'student')) default 'student',
  created_at timestamp with time zone default now()
);

-- 3. REGISTRATIONS TABLE
create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  college text not null,
  department text,
  year text,
  phone text not null,
  email text not null,
  event_ids uuid[] not null check (array_length(event_ids, 1) = 2),
  team_members jsonb default '[]'::jsonb,
  payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'failed')),
  razorpay_order_id text,
  razorpay_payment_id text,
  amount numeric default 250,
  qr_ticket_url text,
  checked_in boolean default false,
  checked_in_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

alter table events enable row level security;
alter table coordinators enable row level security;
alter table registrations enable row level security;

-- Events Policies: Public read-only
create policy "Allow public read access on events"
  on events for select using (true);

-- Coordinators Policies: Public read-only
create policy "Allow public read access on coordinators"
  on coordinators for select using (true);

-- Registrations Policies: Public insert-only & select for check-in
create policy "Allow public insert on registrations"
  on registrations for insert with check (true);

create policy "Allow public select on registrations"
  on registrations for select using (true);

-- Service Role full access on registrations
create policy "Allow service_role full update on registrations"
  on registrations for update using (true);

-- ========================================================
-- ENABLE SUPABASE REALTIME REPLICATION (LIVE UPDATES)
-- ========================================================

begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime for table events, coordinators, registrations;
commit;

-- ========================================================
-- SEED DATA (7 SYMPOSIUM EVENTS WITH SUBTITLES)
-- ========================================================

delete from events where slug in (
  'code-blitz', 'paper-craft', 'web-craft',
  'gaming-arena', 'short-film', 'treasure-hunt', 'tech-quiz-memes'
);

-- Technical Events (3)
insert into events (id, slug, name, subtitle, category, description, rules, team_size, prize, image_url) values
(
  'a1111111-1111-4111-a111-111111111111',
  'code-blitz',
  'Code Blitz (Speed Coding & Debugging)',
  'Speed Coding & Syntax Debugging',
  'technical',
  'Test your algorithmic speed and bug-hunting skills in a multi-round competitive programming clash! Solve real-world coding problems, optimize time complexity, and debug complex syntax snippets under tight time constraints.',
  array[
    'Round 1: Online Prelims MCQ & syntax bug identification (30 mins).',
    'Round 2: Live Problem Solving in C++, Java, or Python (60 mins).',
    'Plagiarism or use of generative AI tools will lead to immediate disqualification.',
    'Judges decision on performance and execution speed is final.'
  ],
  '1 - 2 Members',
  '₹5,000 + Trophy + Certificate',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
),
(
  'a2222222-2222-4222-a222-222222222222',
  'paper-craft',
  'Paper Craft (PPT Presentation)',
  'Innovative PPT Research Presentation',
  'technical',
  'Present your innovative research ideas, technological breakthroughs, and engineering solutions to an expert panel. Focus areas include AI/ML, Cloud Computing, Cybersecurity, IoT, Blockchain, and Next-Gen Web.',
  array[
    'Maximum 2 members per team.',
    'Presentation duration: 7 minutes presentation + 3 minutes Q&A.',
    'PPT deck must be submitted in PDF/PPTX format before 9:30 AM on event day.',
    'Evaluation based on novelty, technical depth, presentation clarity, and Q&A handling.'
  ],
  '1 - 2 Members',
  '₹4,000 + Trophy + Certificate',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
),
(
  'a3333333-3333-4333-a333-333333333333',
  'web-craft',
  'Web Craft (UI/UX & Web Development)',
  'UI/UX & Live Web Application Development',
  'technical',
  'Build visually stunning, responsive, and functional web applications on the spot based on a surprise theme disclosed at the start of the event. Express your frontend design flair and interactive web development prowess!',
  array[
    'Individual or pair participation allowed.',
    'Time duration: 90 minutes live development time.',
    'Allowed technologies: HTML5, CSS3, Tailwind CSS, JavaScript/React.',
    'Judging criteria: UI aesthetics, responsiveness, user experience, feature completeness.'
  ],
  '1 - 2 Members',
  '₹4,000 + Trophy + Certificate',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'
);

-- Non-Technical Events (4)
insert into events (id, slug, name, subtitle, category, description, rules, team_size, prize, image_url) values
(
  'b4444444-4444-4444-b444-444444444444',
  'gaming-arena',
  'Gaming Arena (BGMI Squad Clash)',
  'High-Octane BGMI Squad Battle',
  'non-technical',
  'Gear up for high-octane esports battles! Outplay, out-maneuver, and outlast opposing squads in custom BGMI match rooms to claim victory and champion status.',
  array[
    'Squad of 4 players (or duo fallback).',
    'Matches played on Erangel & Miramar custom rooms.',
    'No emulators, triggers, or hacks allowed. All devices inspected prior to match start.',
    'Points allocated based on placement rank + elimination kills.'
  ],
  '1 - 4 Members',
  '₹6,000 + Championship Trophy',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'
),
(
  'b5555555-5555-4555-b555-555555555555',
  'short-film',
  'Short Film & Reel Contest',
  'Cinematic Storytelling & Reel Editing Contest',
  'non-technical',
  'Showcase your cinematic storytelling and videography skills. Submit your short film or social media reel capturing campus life, social awareness, or creative tech themes.',
  array[
    'Maximum video duration: Short Film (max 7 mins), Reel (max 60 seconds).',
    'Original content only. Copyright-free background music must be used.',
    'File format: MP4 1080p high quality.',
    'Judged on storyline, camera work, editing finesse, and emotional impact.'
  ],
  '1 - 3 Members',
  '₹3,500 + Certificate + Memento',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80'
),
(
  'b6666666-6666-4666-b666-666666666666',
  'treasure-hunt',
  'Tech Treasure Hunt',
  'Campus Cryptic Clues & QR Treasure Quest',
  'non-technical',
  'Embark on an exhilarating quest across the college campus! Solve cryptograms, decode QR clues, and navigate physical hurdles to unearth the ultimate hidden treasure chest.',
  array[
    'Team size: 2 to 3 members.',
    'Clues located across designated campus zones.',
    'Physical or verbal tampering with clues leads to team disqualification.',
    'First team to locate the master chest wins.'
  ],
  '2 - 3 Members',
  '₹4,000 + Cash Prize + Certificates',
  'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80'
),
(
  'b7777777-7777-4777-b777-777777777777',
  'tech-quiz-memes',
  'Tech Quiz & Meme Craft',
  'Tech Trivia Mastery & Live Meme Creation',
  'non-technical',
  'Unleash your pop culture knowledge, tech trivia mastery, and humorous meme creativity in a fun 2-in-1 battle of wits and laughs!',
  array[
    'Round 1: Rapid-fire Tech & Pop Culture Quiz (20 questions).',
    'Round 2: On-spot Meme Creation based on given tech scenarios.',
    'Memes must be original, humorous, and respectful.',
    'Top score combination wins the title.'
  ],
  '1 - 2 Members',
  '₹3,000 + Goodies + Certificate',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
);
