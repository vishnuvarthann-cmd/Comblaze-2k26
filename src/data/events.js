import techPoster from '../assets/tech_poster.jpg';
import nontechPoster from '../assets/nontech_poster.jpg';

export const EVENTS_DATA = [
  {
    id: "code-clash",
    title: "Code Clash",
    category: "technical",
    shortDescription: "A high-octane competitive coding challenge designed to test logic, algorithms, and rapid problem-solving skills under time pressure.",
    fullDescription: "Code Clash is the flagship competitive programming event of COMBLAZE2K26. Participants will engage in intense algorithmic battle across two challenging rounds involving data structures, problem optimization, and bug fixing. Show off your coding prowess and claim the ultimate title of Cyber Coder!",
    posterImage: techPoster,
    participationType: "Individual / Team (Max 2)",
    maxParticipants: 2,
    fee: 150,
    date: "March 25, 2026",
    time: "10:00 AM - 12:30 PM",
    duration: "150 Minutes",
    venue: "Main Computing Lab - Block B",
    hallNumber: "Lab 3 (Second Floor)",
    tagline: "Decode, Debug, Dominate!",
    coordinators: [
      {
        role: "Faculty Coordinator",
        name: "Dr. K. Rangarajan",
        designation: "Associate Professor, CSE",
        phone: "+91 98424 11223",
        email: "rangarajan.k@mamce.org"
      },
      {
        role: "Student Coordinator",
        name: "A. Vikram",
        designation: "Final Year CSE",
        phone: "+91 87654 32109",
        email: "vikram.a@student.mamce.org"
      }
    ],
    schedule: [
      { step: "Reporting & Check-in", time: "09:45 AM" },
      { step: "Round 1: Speed Debugging & MCQs", time: "10:00 AM" },
      { step: "Round 1 Results & Break", time: "11:00 AM" },
      { step: "Final Round: Algorithmic Duel", time: "11:15 AM" },
      { step: "Winner Announcement", time: "03:30 PM" }
    ],
    rules: [
      "Participants must report 15 minutes prior to the event schedule.",
      "Valid College Identity Card is mandatory for verification.",
      "Languages permitted: C, C++, Java, Python 3.",
      "Internet access or external reference materials are strictly prohibited during the competition.",
      "Decisions of the judge panel and event jury are final and binding.",
      "Plagiarism or malpractice will result in immediate disqualification."
    ],
    prizes: [
      { position: "First Prize", amount: "₹5,000", badge: "🥇" },
      { position: "Second Prize", amount: "₹3,000", badge: "🥈" },
      { position: "Third / Special Mention", amount: "₹1,500", badge: "🥉" }
    ]
  },
  {
    id: "tech-quiz",
    title: "Tech Quiz",
    category: "technical",
    shortDescription: "Test your brainpower with cutting-edge questions spanning AI, Quantum Computing, Cyber Security, and Tech History.",
    fullDescription: "Step into the arena of technology intelligence! Tech Quiz tests your awareness of modern technological advancements, tech giants, AI breakthroughs, and computer science fundamentals. Fast fingers, sharp instincts, and deep tech knowledge will determine the champion.",
    posterImage: techPoster,
    participationType: "Team (2 Members)",
    maxParticipants: 2,
    fee: 100,
    date: "March 25, 2026",
    time: "10:30 AM - 12:30 PM",
    duration: "120 Minutes",
    venue: "Seminar Hall 1 - Block A",
    hallNumber: "Hall A-102",
    tagline: "Ignite Your Synapses!",
    coordinators: [
      {
        role: "Faculty Coordinator",
        name: "Prof. S. Meenakshi",
        designation: "Assistant Professor, IT",
        phone: "+91 94433 88776",
        email: "meenakshi.s@mamce.org"
      },
      {
        role: "Student Coordinator",
        name: "R. Harish",
        designation: "Third Year CSE",
        phone: "+91 91234 56789",
        email: "harish.r@student.mamce.org"
      }
    ],
    schedule: [
      { step: "Briefing & Seating", time: "10:15 AM" },
      { step: "Prelims: Written Screening", time: "10:30 AM" },
      { step: "Buzzer Round (Top 6 Teams)", time: "11:30 AM" },
      { step: "Rapid Fire Final Round", time: "12:15 PM" },
      { step: "Winner Announcement", time: "03:30 PM" }
    ],
    rules: [
      "Teams must consist of exactly 2 members from the same college.",
      "Mobile phones and smartwatches must be switched off during all rounds.",
      "For buzzer rounds, pressing the buzzer before host prompt gives negative points.",
      "In case of a tie, sudden death tie-breaker questions will be posed.",
      "Judges' decisions will be absolute."
    ],
    prizes: [
      { position: "First Prize", amount: "₹4,000", badge: "🥇" },
      { position: "Second Prize", amount: "₹2,500", badge: "🥈" },
      { position: "Third Prize", amount: "₹1,000", badge: "🥉" }
    ]
  },
  {
    id: "project-expo",
    title: "Project Expo",
    category: "technical",
    shortDescription: "Showcase your working prototypes, innovative hardware/software solutions, and research innovations to industry experts.",
    fullDescription: "Got an idea that can change the future? Project Expo provides a prestigious platform for engineering students to demonstrate working hardware prototypes, IoT systems, Web/Mobile applications, and AI models. Present your project to expert judges, gain industry feedback, and win huge cash prizes!",
    posterImage: techPoster,
    participationType: "Team (Up to 4 Members)",
    maxParticipants: 4,
    fee: 200,
    date: "March 25, 2026",
    time: "10:00 AM - 01:00 PM",
    duration: "180 Minutes",
    venue: "Central Exhibition Hall - Central Block",
    hallNumber: "Exhibition Bay 4",
    tagline: "Transform Ideas into Reality!",
    coordinators: [
      {
        role: "Faculty Coordinator",
        name: "Dr. P. Karthikeyan",
        designation: "Professor & HOD, CSE",
        phone: "+91 97890 12345",
        email: "karthikeyan.p@mamce.org"
      },
      {
        role: "Student Coordinator",
        name: "S. Priya",
        designation: "Final Year IT",
        phone: "+91 88990 11223",
        email: "priya.s@student.mamce.org"
      }
    ],
    schedule: [
      { step: "Stall Setup & Poster Display", time: "09:15 AM" },
      { step: "Jury Inspection Round 1", time: "10:15 AM" },
      { step: "Public & Peer Demo", time: "11:30 AM" },
      { step: "Final Evaluation Round", time: "12:30 PM" },
      { step: "Winner Announcement", time: "03:30 PM" }
    ],
    rules: [
      "Maximum 4 members per team.",
      "Teams must bring their own laptops, microcontrollers, and specialized equipment.",
      "Standard 230V AC power supply and Wi-Fi will be provided at stalls.",
      "Project poster (A3/A2 size) explaining architecture must be displayed at stall.",
      "Evaluation will be based on Innovation, Feasibility, Technical Depth, and Presentation."
    ],
    prizes: [
      { position: "First Prize", amount: "₹7,000", badge: "🥇" },
      { position: "Second Prize", amount: "₹4,000", badge: "🥈" },
      { position: "Best Innovation Award", amount: "₹2,000", badge: "💡" }
    ]
  },
  {
    id: "ipl-auction",
    title: "IPL Auction",
    category: "non-technical",
    shortDescription: "Experience the thrill of a live cricket player bidding war! Manage virtual budgets, build your dream squad, and outsmart rivals.",
    fullDescription: "Enter the high-stakes boardroom of IPL Auction! Form your franchise team, analyze player statistics, strategically manage your budget purse, and bid against competing teams in live simulated auction rounds. Balance star power, team synergy, and financial tactics to build the champion XI.",
    posterImage: nontechPoster,
    participationType: "Team (2-3 Members)",
    maxParticipants: 3,
    fee: 150,
    date: "March 25, 2026",
    time: "11:30 AM - 02:30 PM",
    duration: "180 Minutes",
    venue: "Auditorium - Admin Block",
    hallNumber: "Main Auditorium",
    tagline: "Bid, Build, Triumph!",
    coordinators: [
      {
        role: "Faculty Coordinator",
        name: "Prof. M. Dinesh",
        designation: "Assistant Professor, ECE",
        phone: "+91 96291 44556",
        email: "dinesh.m@mamce.org"
      },
      {
        role: "Student Coordinator",
        name: "K. Surya",
        designation: "Final Year ECE",
        phone: "+91 99445 66778",
        email: "surya.k@student.mamce.org"
      }
    ],
    schedule: [
      { step: "Rule Briefing & Budget Allocation", time: "11:30 AM" },
      { step: "Preliminary Qualifier Quiz", time: "11:45 AM" },
      { step: "Main Auction Round (Top 8 Franchises)", time: "12:30 PM" },
      { step: "Squad Point Calculation", time: "02:15 PM" },
      { step: "Winner Announcement", time: "03:30 PM" }
    ],
    rules: [
      "Teams consist of 2 to 3 participants.",
      "Each franchise starts with an equal virtual budget purse (e.g. ₹80 Crores).",
      "Teams must purchase minimum required players fulfilling role constraints (Batsmen, Bowlers, All-rounders, Wicketkeepers).",
      "Going bankrupt before completing squad requirements leads to penalty deductions.",
      "Points matrix will be calculated based on real-world IPL player ratings."
    ],
    prizes: [
      { position: "First Prize", amount: "₹5,000", badge: "🏆" },
      { position: "Second Prize", amount: "₹3,000", badge: "🥈" },
      { position: "Third Prize", amount: "₹1,500", badge: "🥉" }
    ]
  },
  {
    id: "connections",
    title: "Connections",
    category: "non-technical",
    shortDescription: "Visual puzzle-solving game connecting cryptic images, symbols, logos, and movie clues to uncover hidden phrases.",
    fullDescription: "Unlock your lateral thinking in Connections! Connect seemingly unrelated images, pop culture clues, brand logos, technical terms, and movie titles to form the correct answer. Speed and visual reasoning are your greatest assets.",
    posterImage: nontechPoster,
    participationType: "Team (2 Members)",
    maxParticipants: 2,
    fee: 100,
    date: "March 25, 2026",
    time: "01:30 PM - 03:00 PM",
    duration: "90 Minutes",
    venue: "AV Hall - Main Library Block",
    hallNumber: "AV Hall 2",
    tagline: "Connect the Unconnected!",
    coordinators: [
      {
        role: "Faculty Coordinator",
        name: "Prof. N. Deepa",
        designation: "Assistant Professor, CSE",
        phone: "+91 93610 22334",
        email: "deepa.n@mamce.org"
      },
      {
        role: "Student Coordinator",
        name: "G. Nivetha",
        designation: "Third Year IT",
        phone: "+91 80567 44321",
        email: "nivetha.g@student.mamce.org"
      }
    ],
    schedule: [
      { step: "Instructions & Round 1", time: "01:30 PM" },
      { step: "Round 2: Rapid Picture Link", time: "02:15 PM" },
      { step: "Final Round: Audio-Visual Twist", time: "02:45 PM" },
      { step: "Winner Announcement", time: "03:30 PM" }
    ],
    rules: [
      "Maximum 2 participants per team.",
      "Mobile phone usage during rounds will result in immediate disqualification.",
      "Answers must be written clearly on official response sheets provided.",
      "In case of tie, time taken to submit will be considered.",
      "Judges' decisions will be final."
    ],
    prizes: [
      { position: "First Prize", amount: "₹4,000", badge: "🥇" },
      { position: "Second Prize", amount: "₹2,500", badge: "🥈" },
      { position: "Third Prize", amount: "₹1,000", badge: "🥉" }
    ]
  },
  {
    id: "meme-battle",
    title: "Meme Battle",
    category: "non-technical",
    shortDescription: "Unleash your humor and creativity! Create hilarious, relatable memes based on live tech topics and trending templates.",
    fullDescription: "Meme Battle is the ultimate test of tech humor, creativity, and pop-culture wit! Participants will be given surprise themes (e.g. 'Engineering Life', 'AI taking over', 'Vite vs Webpack') and standard templates to craft original, viral-worthy memes within the allocated time.",
    posterImage: nontechPoster,
    participationType: "Individual",
    maxParticipants: 1,
    fee: 50,
    date: "March 25, 2026",
    time: "02:00 PM - 03:30 PM",
    duration: "90 Minutes",
    venue: "CAD / Graphic Lab - Mech Block",
    hallNumber: "Lab M-04",
    tagline: "May the Memes Be With You!",
    coordinators: [
      {
        role: "Faculty Coordinator",
        name: "Prof. T. Vijay",
        designation: "Assistant Professor, Mech",
        phone: "+91 91590 66778",
        email: "vijay.t@mamce.org"
      },
      {
        role: "Student Coordinator",
        name: "M. Sanjay",
        designation: "Final Year CSE",
        phone: "+91 94881 33445",
        email: "sanjay.m@student.mamce.org"
      }
    ],
    schedule: [
      { step: "Topic Reveal & Template Access", time: "02:00 PM" },
      { step: "Meme Creation Phase", time: "02:15 PM" },
      { step: "Submission & Jury Review", time: "03:00 PM" },
      { step: "Winner Announcement", time: "03:30 PM" }
    ],
    rules: [
      "Individual participation event.",
      "Memes must be original and created during the event timeframe.",
      "Offensive, vulgar, political, or personal attacks are strictly forbidden and lead to instant disqualification.",
      "Submissions will be judged on originality, humor, relevance to topic, and visual design.",
      "Judges' decisions are final."
    ],
    prizes: [
      { position: "First Prize", amount: "₹3,000", badge: "🔥" },
      { position: "Second Prize", amount: "₹2,000", badge: "🥈" },
      { position: "Meme King / Queen Award", amount: "₹1,000", badge: "👑" }
    ]
  }
];
