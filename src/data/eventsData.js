// Centralized Event & Committee Data for M.A.M. College of Engineering CSE Symposium

export const SYMPOSIUM_INFO = {
  name: "COMBLAZE 2K26",
  tagline: "National Level Technical Symposium",
  theme: "Innovate, Code & Conquer",
  college: "M.A.M. College of Engineering",
  department: "Department of Computer Science & Engineering",
  location: "Trichy - Chennai Trunk Road, Siruganur, Tiruchirappalli, Tamil Nadu 621105",
  date: "September 10, 2026",
  eventIsoDate: "2026-09-10T08:30:00+05:30",
  time: "08:30 AM - 04:30 PM",
  fee: 250, // Flat ₹250 per participant for 2 events
  maxEventsPerParticipant: 2,
  totalPrizePool: "₹30,000+",
  contactEmail: "comblaze2k26@mamce.org",
  contactPhone: "+91 98424 12345 / +91 97890 12345"
};

export const EVENTS = [
  // TECHNICAL EVENTS (3)
  {
    id: "a1111111-1111-4111-a111-111111111111",
    slug: "code-battle",
    name: "Code Battle",
    subtitle: "Speed Coding & Syntax Debugging",
    category: "technical",
    icon: "Code2",
    description: "Code Battle is a technical event designed to test participants' knowledge of Computer Science fundamentals and coding skills.",
    shortDesc: "CS Fundamentals 20 MCQs & live HackerRank coding challenge.",
    teamSize: "1 - 2 Members",
    maxTeamSize: 2,
    prize: "₹5,000 + Trophy + Certificate",
    venue: "CSE Computer Lab 1",
    timing: "10:30 AM - 12:00 PM",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    rules: [
      "Round 1: CS Fundamentals 20 MCQs covering core Computer Science concepts.",
      "Round 2: Participants solve coding problems on HackerRank within the given time.",
      "Objective: To test participants' conceptual knowledge, problem-solving ability, and coding skills.",
      "Plagiarism or use of generative AI tools will lead to immediate disqualification.",
      "Judges decision on performance and execution speed is final."
    ],
    coords: "Lab Wing A"
  },
  {
    id: "a2222222-2222-4222-a222-222222222222",
    slug: "paper-presentation",
    name: "Paper Presentation",
    subtitle: "Innovative PPT Research Presentation",
    category: "technical",
    icon: "Presentation",
    description: "Present your innovative research ideas, technological breakthroughs, and engineering solutions to an expert panel. Focus areas include AI/ML, Cloud Computing, Cybersecurity, IoT, Blockchain, and Next-Gen Web.",
    shortDesc: "PPT research presentation on futuristic tech domains.",
    teamSize: "1 - 2 Members",
    maxTeamSize: 2,
    prize: "₹4,000 + Trophy + Certificate",
    venue: "CSE Seminar Hall",
    timing: "10:00 AM - 01:30 PM",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    rules: [
      "Maximum 2 members per team.",
      "Presentation duration: 7 minutes presentation + 3 minutes Q&A.",
      "PPT deck must be submitted in PDF/PPTX format before 9:30 AM on event day.",
      "Evaluation based on novelty, technical depth, presentation clarity, and Q&A handling."
    ],
    coords: "Main Block 2nd Floor"
  },
  {
    id: "a3333333-3333-4333-a333-333333333333",
    slug: "db-detectives",
    name: "DB Detectives",
    subtitle: "DBMS Concepts & SQL Query Challenge",
    category: "technical",
    icon: "Database",
    description: "DB Detectives is a technical event focused on Database Management Systems and SQL. Solve 30 DBMS MCQs followed by live database problem solving by writing SQL queries.",
    shortDesc: "DBMS fundamentals 30 MCQs & live SQL query challenge.",
    teamSize: "1 - 2 Members",
    maxTeamSize: 2,
    prize: "₹5,000 + Trophy + Certificate",
    venue: "CSE Database Systems Lab",
    timing: "11:30 AM - 01:00 PM",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
    image_url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
    rules: [
      "Round 1 – DBMS Fundamentals: 30 MCQs covering important DBMS concepts.",
      "Round 2 – Query Challenge: Participants solve database problems by writing SQL queries.",
      "Objective: Test database conceptual knowledge, schema analysis, and query optimization.",
      "Evaluation based on query correctness, execution efficiency, and syntax precision."
    ],
    coords: "Lab Wing B"
  },

  // NON-TECHNICAL EVENTS (7)
  {
    id: "c1111111-1111-4111-c111-111111111111",
    slug: "maniax",
    name: "Maniax (Management Games)",
    subtitle: "Think • Strategize • Collaborate • Conquer",
    category: "non-technical",
    icon: "Sparkles",
    description: "Maniax is a high-octane management competition testing strategic thinking, team balancing under pressure, and card-clue treasure hunting across 3 exciting 30-minute rounds.",
    shortDesc: "Triple power challenge, team balance blitz & rummy treasure hunt.",
    teamSize: "3 Members",
    maxTeamSize: 3,
    prize: "₹4,500 + Trophy + Certificates",
    venue: "CSE Seminar Hall 2",
    timing: "02:00 PM - 03:30 PM",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    image_url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    rules: [
      "Format: 3 rounds, 30 minutes each. Theme: Think • Strategize • Collaborate • Conquer.",
      "Round 1 — Triple Power Challenge: Think Smart | Act Fast | Decide Wisely (Time limit: 30 minutes).",
      "Round 2 — Team Balance Blitz: Balance the Team | Solve the Challenge | Beat the Clock (Time limit: 30 minutes).",
      "Round 3 — Rummy Treasure Hunt: Play the Cards | Crack the Clues | Find the Treasure (Time limit: 30 minutes)."
    ],
    coords: "Seminar Block"
  },
  {
    id: "b9999999-9999-4999-b999-999999999999",
    slug: "connectrix",
    name: "Connectrix",
    subtitle: "Screen Sync, Picture Connections & Signature Step Challenge",
    category: "non-technical",
    icon: "Sparkles",
    description: "Connectrix is a fun-filled team game for 3-member squads. Crack movie/song object clues in Screen Sync, decode 3-4 picture connections, and perform signature dance steps without speaking in the ultimate challenge round!",
    shortDesc: "Screen sync, picture connection & signature dance step battle.",
    teamSize: "3 Members",
    maxTeamSize: 3,
    prize: "₹4,000 + Trophy + Certificates",
    venue: "Main Stage Amphitheatre",
    timing: "01:30 PM - 03:00 PM",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    image_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    rules: [
      "Round 1 — Screen Sync: 3 clues / 3-4 signature objects from a movie/song displayed (30–60s per Q). Each team discusses and gives 1 final answer. Correct answer = 10 points. No answer within time = 0 points.",
      "Round 2 — Picture Connection: 3 or 4 pictures displayed on screen (30–60s per Q). Identify common connection within time limit. Correct answer = 10 points. Top scoring teams qualify for Round 3.",
      "Round 3 — Signature Step Challenge: Popular song plays for a few seconds. 1 member performs signature dance step without singing, speaking, or verbal hints. Team gets 30s to guess song. Correct = 10 points, with hint = 5 points."
    ],
    coords: "Central Amphitheatre"
  },
  {
    id: "b8888888-8888-4888-b888-888888888888",
    slug: "reverse-charades",
    name: "Reverse Charades",
    subtitle: "Speed Mime & Team Guessing Battle",
    category: "non-technical",
    icon: "Sparkles",
    description: "Reverse Charades is a fun-filled non-technical team game where 3 members act together simultaneously while 1 member tries to guess the given word or phrase.",
    shortDesc: "3 team members act together while 1 member guesses the word.",
    teamSize: "4 Members",
    maxTeamSize: 4,
    prize: "₹4,000 + Trophy + Certificates",
    venue: "Main Stage Amphitheatre",
    timing: "02:00 PM - 03:30 PM",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    image_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    rules: [
      "Round 1 — Decode the Act: 60 seconds to decode the act, where faster guesses earn higher points. Score starts at 30 points and decreases by 5 points as guessing time increases.",
      "Round 2 — Creative Confusion: A 45-second challenge where teams race against time to identify given acts. Points increase by 10 based on the speed of the correct guess.",
      "Round 3 — Master of Mimes: The ultimate 30-second challenge where every second counts. Points rise or fall by 20, making speed, teamwork, and accuracy crucial.",
      "No speaking, lip-syncing, or pointing to physical objects allowed during acting."
    ],
    coords: "Central Amphitheatre"
  },
  {
    id: "b4444444-4444-4444-b444-444444444444",
    slug: "gaming-arena",
    name: "Gaming Arena",
    subtitle: "High-Octane BGMI Squad Battle",
    category: "non-technical",
    icon: "Gamepad2",
    description: "Gear up for high-octane esports battles! Outplay, out-maneuver, and outlast opposing squads in custom BGMI match rooms to claim victory and champion status.",
    shortDesc: "BGMI squad battle royale tournament.",
    teamSize: "1 - 4 Members",
    maxTeamSize: 4,
    prize: "₹6,000 + Championship Trophy",
    venue: "Auditorium E-Zone",
    timing: "01:30 PM - 03:30 PM",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    image_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    rules: [
      "Squad of 4 players (or duo fallback).",
      "Matches played on Erangel & Miramar custom rooms.",
      "No emulators, triggers, or hacks allowed. All devices inspected prior to match start.",
      "Points allocated based on placement rank + elimination kills."
    ],
    coords: "Auditorium Arena"
  },
  {
    id: "b5555555-5555-4555-b555-555555555555",
    slug: "short-film",
    name: "Short Film & Reel Contest",
    subtitle: "Cinematic Storytelling & Reel Editing Contest",
    category: "non-technical",
    icon: "Film",
    description: "Showcase your cinematic storytelling and videography skills. Submit your short film or social media reel capturing campus life, social awareness, or creative tech themes.",
    shortDesc: "On-spot campus photography & short reel editing.",
    teamSize: "1 - 3 Members",
    maxTeamSize: 3,
    prize: "₹3,500 + Certificate + Memento",
    venue: "Entire Campus Grounds",
    timing: "10:00 AM - 03:00 PM",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
    image_url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
    rules: [
      "Maximum video duration: Short Film (max 7 mins), Reel (max 60 seconds).",
      "Original content only. Copyright-free background music must be used.",
      "File format: MP4 1080p high quality.",
      "Judged on storyline, camera work, editing finesse, and emotional impact."
    ],
    coords: "Outdoor Central Quad"
  },
  {
    id: "b6666666-6666-4666-b666-666666666666",
    slug: "treasure-hunt",
    name: "Tech Treasure Hunt",
    subtitle: "Campus Cryptic Clues & QR Treasure Quest",
    category: "non-technical",
    icon: "Compass",
    description: "Embark on an exhilarating quest across the college campus! Solve cryptograms, decode QR clues, and navigate physical hurdles to unearth the ultimate hidden treasure chest.",
    shortDesc: "Campus Cryptic Clues & QR Treasure Quest.",
    teamSize: "2 - 3 Members",
    maxTeamSize: 3,
    prize: "₹4,000 + Cash Prize + Certificates",
    venue: "Sports Complex Box Turf",
    timing: "10:00 AM - 03:30 PM",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80",
    image_url: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80",
    rules: [
      "Team size: 2 to 3 members.",
      "Clues located across designated campus zones.",
      "Physical or verbal tampering with clues leads to team disqualification.",
      "First team to locate the master chest wins."
    ],
    coords: "MAMCE Campus Grounds"
  },
  {
    id: "b7777777-7777-4777-b777-777777777777",
    slug: "tech-quiz-memes",
    name: "Tech Quiz & Meme Craft",
    subtitle: "Tech Trivia Mastery & Live Meme Creation",
    category: "non-technical",
    icon: "Sparkles",
    description: "Unleash your pop culture knowledge, tech trivia mastery, and humorous meme creativity in a fun 2-in-1 battle of wits and laughs!",
    shortDesc: "High-energy mystery challenge & meme round.",
    teamSize: "1 - 2 Members",
    maxTeamSize: 2,
    prize: "₹3,000 + Goodies + Certificate",
    venue: "Main Stage Amphitheatre",
    timing: "02:30 PM - 04:00 PM",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    image_url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    rules: [
      "Round 1: Rapid-fire Tech & Pop Culture Quiz (20 questions).",
      "Round 2: On-spot Meme Creation based on given tech scenarios.",
      "Memes must be original, humorous, and respectful.",
      "Top score combination wins the title."
    ],
    coords: "Central Amphitheatre"
  }
];

export const SCHEDULE_TIMELINE = [
  { time: "08:30 AM - 09:30 AM", title: "Registration & Welcome Kit Distribution", venue: "Main Quadrangle", category: "general" },
  { time: "09:30 AM - 10:15 AM", title: "Grand Inauguration Ceremony", venue: "Auditorium", category: "ceremony" },
  { time: "10:00 AM - 01:30 PM", title: "Paper Presentation (PPT Research)", venue: "CSE Seminar Hall", category: "technical" },
  { time: "10:30 AM - 12:00 PM", title: "Code Battle (Speed Coding & Debugging)", venue: "CSE Computer Lab 1", category: "technical" },
  { time: "11:30 AM - 01:00 PM", title: "DB Detectives (DBMS & SQL Challenge)", venue: "Database Systems Lab", category: "technical" },
  { time: "10:00 AM - 03:00 PM", title: "Short Film & Reel Contest", venue: "Campus Grounds", category: "non-technical" },
  { time: "10:00 AM - 03:30 PM", title: "Tech Treasure Hunt", venue: "Campus Grounds", category: "non-technical" },
  { time: "01:00 PM - 02:00 PM", title: "Buffet Lunch & Networking Hour", venue: "College Dining Hall", category: "general" },
  { time: "01:30 PM - 03:00 PM", title: "Connectrix (Screen Sync & Dance Step Challenge)", venue: "Main Stage Amphitheatre", category: "non-technical" },
  { time: "01:30 PM - 03:30 PM", title: "Gaming Arena (BGMI Squad Clash)", venue: "Auditorium E-Zone", category: "non-technical" },
  { time: "02:00 PM - 03:30 PM", title: "Maniax (Management Games)", venue: "CSE Seminar Hall 2", category: "non-technical" },
  { time: "02:00 PM - 03:30 PM", title: "Reverse Charades (Speed Mime Battle)", venue: "Main Stage Amphitheatre", category: "non-technical" },
  { time: "02:30 PM - 04:00 PM", title: "Tech Quiz & Meme Craft", venue: "Main Stage", category: "non-technical" },
  { time: "04:00 PM - 04:30 PM", title: "Valedictory & Prize Distribution", venue: "Auditorium", category: "ceremony" }
];

export const ORGANIZING_COMMITTEE = {
  patrons: [
    { name: "Dr. M. A. Mohamed Nizam", role: "Secretary & Correspondent", department: "M.A.M. Group of Institutions" },
    { name: "Dr. P. Rajendran", role: "Principal", department: "M.A.M. College of Engineering" }
  ],
  conveners: [
    { name: "Dr. K. Senthil Kumar", role: "Professor & HOD", department: "Department of Computer Science & Engineering", phone: "+91 98424 12345", email: "hod.cse@mamce.org" }
  ],
  coordinators: [
    { name: "Prof. R. Kavitha", role: "Associate Professor", department: "Department of CSE", phone: "+91 97890 12345" },
    { name: "Prof. S. Karthik", role: "Assistant Professor", department: "Department of CSE", phone: "+91 96291 54321" }
  ],
  studentLeads: [
    { name: "P. Vignesh", role: "Student President (IV Year CSE)", phone: "+91 91234 56789" },
    { name: "M. Ananya", role: "Student Vice-President (IV Year CSE)", phone: "+91 98765 43210" },
    { name: "K. Rahul", role: "Technical Event Lead (III Year CSE)", phone: "+91 90123 45678" }
  ]
};
