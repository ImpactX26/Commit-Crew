import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  UserProfile,
  Course,
  ResourceItem,
  ApprovedDocument,
  CalendarEvent,
  StudyPlan,
  StudyTask,
  RescueOption,
  ProposedPlanRevision,
  NotificationSettings,
} from "./src/types";

export type {
  UserProfile,
  Course,
  ResourceItem,
  ApprovedDocument,
  CalendarEvent,
  StudyPlan,
  StudyTask,
  RescueOption,
  ProposedPlanRevision,
  NotificationSettings,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "data");
const DB_FILE = path.join(DATA_DIR, "edupilot_db.json");

export interface DatabaseSchema {
  users: Record<string, UserProfile>;
  courses: Record<string, Course>;
  resources: Record<string, ResourceItem>;
  documents: Record<string, ApprovedDocument>;
  calendarEvents: Record<string, CalendarEvent>;
  studyPlans: Record<string, StudyPlan>;
  proposedPlanRevisions: Record<string, ProposedPlanRevision>;
  notificationSettings: Record<string, NotificationSettings>;
}

// Initial default seed dataset
const initialSeed: DatabaseSchema = {
  users: {
    "default": {
      name: "Puneet Sharma",
      email: "demo@edupilot.ai",
      degree: "B.Tech CSE • Sem 6",
    },
  },
  courses: {
    "crs-cs601": {
      id: "crs-cs601",
      userId: "default",
      code: "CS601",
      title: "Operating Systems & Virtual Memory",
      semester: "Semester 6",
      instructor: "Dr. K. V. Ramanathan",
      examDate: "2026-10-24",
      description: "Kernel architecture, paging, MMU address translation, page faults, and Peter Denning's Working Set model.",
      color: "indigo",
      badgeColor: "text-indigo-600 bg-indigo-50 border border-indigo-200",
      barColor: "bg-indigo-600",
      progress: 82,
      lecturesCount: 18,
      completedLectures: 14,
      createdAt: "2026-10-01",
    },
    "crs-cs602": {
      id: "crs-cs602",
      userId: "default",
      code: "CS602",
      title: "Engineering Mathematics III",
      semester: "Semester 6",
      instructor: "Prof. S. R. Deshmukh",
      examDate: "2026-10-30",
      description: "Fourier transforms, partial differential equations, and complex analysis.",
      color: "blue",
      badgeColor: "text-blue-600 bg-blue-50 border border-blue-200",
      barColor: "bg-blue-600",
      progress: 76,
      lecturesCount: 16,
      completedLectures: 12,
      createdAt: "2026-10-01",
    },
    "crs-cs603": {
      id: "crs-cs603",
      userId: "default",
      code: "CS603",
      title: "Engineering Chemistry & Nanomaterials",
      semester: "Semester 6",
      instructor: "Dr. Sunita Rao",
      examDate: "2026-10-28",
      description: "Water hardness EDTA titration, Galvanic Daniell cells, Nernst equation, and Carbon Nanotubes.",
      color: "emerald",
      badgeColor: "text-emerald-600 bg-emerald-50 border border-emerald-200",
      barColor: "bg-emerald-600",
      progress: 88,
      lecturesCount: 17,
      completedLectures: 15,
      createdAt: "2026-10-01",
    },
    "crs-cs604": {
      id: "crs-cs604",
      userId: "default",
      code: "CS604",
      title: "Database Management & Systems",
      semester: "Semester 6",
      instructor: "Dr. Rajesh Narayan",
      examDate: "2026-11-02",
      description: "Relational algebra, normalization BCNF/3NF, transaction concurrency control, and SQL query optimization.",
      color: "purple",
      badgeColor: "text-purple-600 bg-purple-50 border border-purple-200",
      barColor: "bg-purple-600",
      progress: 79,
      lecturesCount: 14,
      completedLectures: 11,
      createdAt: "2026-10-01",
    },
  },
  resources: {
    "res-1": {
      id: "res-1",
      userId: "default",
      courseId: "crs-cs601",
      courseName: "Operating Systems & Virtual Memory",
      title: "Operating Systems: Algorithm & Numerical Cheat Sheet",
      subject: "Operating Systems",
      topic: "Virtual Memory & Paging",
      resourceType: "Cheat Sheet",
      format: "PDF",
      fileSize: "2.4 MB",
      description: "Includes FIFO, LRU, Optimal algorithms, Belady's anomaly, and Peter Denning's Thrashing formulas.",
      documentId: "doc-os-unit3",
      isOfficial: true,
      createdAt: "2026-10-01",
    },
    "res-2": {
      id: "res-2",
      userId: "default",
      courseId: "crs-cs603",
      courseName: "Engineering Chemistry & Nanomaterials",
      title: "Engineering Chemistry: High-Yield Formulas & Exam Reactions",
      subject: "Engineering Chemistry",
      topic: "Electrochemistry & Corrosion",
      resourceType: "Cheat Sheet",
      format: "PDF",
      fileSize: "3.2 MB",
      description: "EDTA complexometric titration, Nernst equation at 298K, and sacrificial anode cathodic protection.",
      documentId: "doc-eng-chem",
      isOfficial: true,
      createdAt: "2026-10-02",
    },
    "res-3": {
      id: "res-3",
      userId: "default",
      courseId: "crs-cs604",
      courseName: "Database Management & Systems",
      title: "CS302 Internal Assessment 1 Tabulation & Marks Sheet",
      subject: "Database Management Systems",
      topic: "IA-1 Student Marks Roster",
      resourceType: "Exam Paper",
      format: "PDF",
      fileSize: "1.9 MB",
      description: "Verified student marks roster (USNs, quiz marks, midterm marks, total score, and class statistics).",
      documentId: "doc-student-marks",
      isOfficial: true,
      createdAt: "2026-10-04",
    },
    "res-4": {
      id: "res-4",
      userId: "default",
      courseId: "crs-cs601",
      courseName: "Operating Systems & Virtual Memory",
      title: "Semester 5 & 6 Previous Solved University Papers",
      subject: "Operating Systems",
      topic: "Previous 3-Year Exam Papers",
      resourceType: "Exam Paper",
      format: "PDF",
      fileSize: "5.1 MB",
      description: "Solved university examination question papers with step-by-step marking rubrics.",
      isOfficial: true,
      createdAt: "2026-10-03",
    },
  },
  documents: {
    "doc-os-unit3": {
      id: "doc-os-unit3",
      courseId: "crs-cs601",
      name: "OS_Virtual_Memory_Unit3.pdf",
      subject: "Operating Systems",
      pagesCount: 3,
      wordsCount: 4890,
      uploadedAt: "2026-10-01",
      isOfficial: true,
      status: "ready",
      pages: [
        {
          pageNumber: 1,
          title: "Virtual Memory Architecture & Paging",
          text: `Virtual memory is a memory management capability of an operating system that uses hardware and software to allow a computer to compensate for physical memory shortages by temporarily transferring data from random access memory to disk storage. 
Paging divides memory into fixed-size blocks called frames in physical memory and pages in logical memory. 
The Memory Management Unit (MMU) translates virtual addresses into physical addresses using a page table.
A virtual address consists of a page number (p) and a page offset (d). The page number is used as an index into the page table, which contains the base address of each page in physical memory.
Multi-level paging and Inverted Page Tables are used to reduce page table memory overhead in 64-bit architectures.
Page size is determined by hardware, typically power of 2, between 4 KB and 64 KB.`,
        },
        {
          pageNumber: 2,
          title: "Page Faults & Page Replacement Algorithms",
          text: `A page fault occurs when an executing program accesses a memory page that is currently not mapped into physical RAM (invalid bit in page table entry).
Handling sequence:
1. Access to page marked invalid generates an MMU hardware trap to OS kernel.
2. OS saves process state and registers.
3. OS determines reference was valid and finds a free physical frame in RAM.
4. OS schedules disk I/O operation to read desired page from swap space into allocated frame.
5. Page table is updated (valid bit set, frame number registered).
6. Instruction that trapped is restarted from scratch.

Page Replacement Policies:
- FIFO (First-In, First-Out): Suffers from Belady's Anomaly where increasing the number of page frames results in an increased number of page faults.
- Optimal (OPT / MIN): Replaces the page that will not be used for the longest period of time. It is a clairvoyant theoretical benchmark.
- LRU (Least Recently Used): Replaces the page that has not been used for the longest period of time. Approximated using reference bits and aging counters.
- Clock (Second Chance): Uses a circular queue with reference bits to approximate LRU with low overhead.`,
        },
        {
          pageNumber: 3,
          title: "Thrashing and Peter Denning's Working Set Model",
          text: `Thrashing occurs when an operating system's CPU spends more time swapping pages into and out of memory than executing actual instructions, causing system throughput to collapse to near zero.
Root Cause: High degree of multiprogramming without adequate physical frames causes processes to page-fault repeatedly. In an attempt to increase CPU utilization, the OS admits more processes, which compounds page fault frequency until CPU throughput drops to near zero.
Peter Denning introduced the Working Set Model based on the Locality Model of program behavior.
The working set W(t, delta) is the set of pages referenced in the most recent delta time units.
If total memory demand D = sum(WSS_i) > Total Available Memory Frames M, thrashing is imminent.
Operating System Solutions for Thrashing:
1. Working Set Strategy: Only allocate frames to processes that have enough memory to cover their full working set. If total demand exceeds frames, suspend or swap out lower-priority processes.
2. Page Fault Frequency (PFF): Establish upper and lower bounds for page fault rates. If a process exceeds the upper threshold, allocate it more frames; if below lower threshold, reclaim frames.
3. Local Replacement Algorithm: Prevent thrashing from cascading across other non-offending processes by restricting replacement to the process's own allocated frames.`,
        },
      ],
    },
    "doc-eng-chem": {
      id: "doc-eng-chem",
      courseId: "crs-cs603",
      name: "Engineering_Chemistry.pdf",
      subject: "Engineering Chemistry",
      pagesCount: 7,
      wordsCount: 6850,
      uploadedAt: "2026-10-02",
      isOfficial: true,
      status: "ready",
      pages: [
        {
          pageNumber: 1,
          title: "Water Technology & Boiler Feed Water",
          text: `Water hardness is caused by dissolved polyvalent metallic ions, primarily Calcium (Ca2+) and Magnesium (Mg2+).
Temporary hardness (carbonate hardness) is caused by bicarbonates of calcium and magnesium and can be removed by boiling.
Permanent hardness (non-carbonate hardness) is caused by chlorides, sulfates, and nitrates of Ca and Mg.
Determination of hardness: EDTA complexometric titration method using Eriochrome Black T (EBT) as indicator at pH 10 buffer. EDTA forms stable wine-red to steel-blue chelates.
Boiler troubles include: Scale and sludge formation, priming and foaming, caustic embrittlement, and boiler corrosion.
Softening methods: Zeolite (permutit) process and Ion-exchange demineralization process.`,
        },
        {
          pageNumber: 2,
          title: "Electrochemistry, Galvanic Cells & Nernst Equation",
          text: `Electrochemical cells are devices that produce electrical energy from chemical reactions or use electrical energy to cause chemical reactions.
Galvanic (or voltaic) cells convert spontaneous chemical energy into electrical energy through redox reactions.
A classic example is the Daniell Cell consisting of a Zinc electrode immersed in 1M ZnSO4 solution (anode) and a Copper electrode in 1M CuSO4 solution (cathode), linked by an external conductor and a salt bridge containing agar-agar with KCl or KNO3.
Electrode reactions:
- Anode (Oxidation): Zn(s) -> Zn2+(aq) + 2e- (releases electrons, negative polarity).
- Cathode (Reduction): Cu2+(aq) + 2e- -> Cu(s) (accepts electrons, positive polarity).
- Overall Cell Reaction: Zn(s) + Cu2+(aq) -> Zn2+(aq) + Cu(s).
Cell notation: Zn(s) | Zn2+(aq) (1M) || Cu2+(aq) (1M) | Cu(s).
Standard Cell Potential: E°cell = E°cathode - E°anode = +0.34V - (-0.76V) = +1.10V.
Nernst Equation for electrode potential:
E = E° - (RT / nF) * ln([Reduced form] / [Oxidized form]).
At 298 K (25°C), the equation simplifies to:
E = E° - (0.0591 / n) * log10([Anode ion concentration] / [Cathode ion concentration]).
Reference Electrodes: Standard Hydrogen Electrode (SHE, assigned 0.00 V) and Secondary Calomel Electrode (Hg/Hg2Cl2/KCl, +0.2422 V).`,
        },
        {
          pageNumber: 3,
          title: "Corrosion Engineering & Protective Coatings",
          text: `Corrosion is the decay and destruction of metals by electrochemical reaction with the surrounding environment.
Mechanism of wet/galvanic corrosion: Anodic reaction causes metal oxidation (M -> M^n+ + ne-). Cathodic reaction involves oxygen reduction in alkaline/neutral media (O2 + 2H2O + 4e- -> 4OH-) or hydrogen evolution in acidic media (2H+ + 2e- -> H2).
Galvanic series: Metals higher in electromotive series corrode preferentially when coupled with lower metals.
Corrosion prevention:
1. Cathodic protection: Sacrificial anode method (e.g. Zinc or Magnesium blocks attached to steel ship hulls and underground pipelines).
2. Impressed current cathodic protection: External DC source makes structure cathodic.
3. Protective coatings: Galvanization (coating zinc over iron) and Tinning (coating tin over iron).`,
        },
        {
          pageNumber: 4,
          title: "Energy Storage Systems & Modern Batteries",
          text: `Batteries are commercial electrochemical power sources consisting of one or more galvanic cells connected in series.
Classification:
1. Primary Batteries (Non-rechargeable): Irreversible cell reactions (e.g., Alkaline Zn-MnO2 cell, Zinc-Carbon Leclanché cell).
2. Secondary Batteries (Rechargeable / Accumulators): Reversible electrode reactions through external charging.
- Lead-Acid Storage Battery: Pb anode, PbO2 cathode, and 38% H2SO4 electrolyte (specific gravity 1.28). Discharging produces PbSO4 on both plates.
- Lithium-Ion Battery (LIB): Intercalation compounds. LiCoO2 cathode, graphite (carbon) anode, and LiPF6 in organic solvent electrolyte. High energy density (~250 Wh/kg), no memory effect, and long cycle life.
3. Fuel Cells: Direct conversion of fuel chemical energy into electricity without combustion.
- Alkaline H2-O2 Fuel Cell: Porous carbon electrodes impregnated with Pt catalyst, hot KOH electrolyte. Overall reaction: 2H2 + O2 -> 2H2O (eco-friendly zero-emission output).`,
        },
        {
          pageNumber: 5,
          title: "Polymers & Engineering Plastics",
          text: `Polymers are high-molecular-weight macromolecules formed by repetitive linkage of reactive monomers.
Classification by thermal behavior:
- Thermoplastics: Linear or branched polymers with weak intermolecular van der Waals forces. Soften on heating and harden upon cooling reversibly (e.g., Polyethylene, PVC, Polystyrene, Teflon).
- Thermosetting Plastics: Heavily cross-linked 3D network polymers formed by condensation. Undergo irreversible chemical cross-linking upon heat curing and decompose rather than melting (e.g., Bakelite phenol-formaldehyde, Epoxy resins).
Conducting Polymers: Conjugated pi-electron backbones that conduct electricity when doped (e.g., polyacetylene, polyaniline).
Biodegradable Polymers: Polylactic acid (PLA) and Polyhydroxyalkanoates (PHA) that hydrolyze safely into non-toxic metabolites.`,
        },
        {
          pageNumber: 6,
          title: "Lubricants & Phase Rule",
          text: `Lubrication reduces friction, wear, and heat generation between two moving solid surfaces.
Mechanisms of Lubrication:
1. Fluid Film (Hydrodynamic) Lubrication: Thick continuous oil film prevents direct metal-metal contact in light-load, high-speed machinery.
2. Thin Film (Boundary) Lubrication: Adsorbed monolayer of polar lubricant molecules under high pressure and low speed.
3. Extreme Pressure (EP) Lubrication: Additives containing chlorine, sulfur, or phosphorus reacting with metal to form protective shearable halides or sulfides.
Key properties: Viscosity, Viscosity Index (VI), Flash Point, Fire Point, and Cloud/Pour points.
Gibbs Phase Rule: F = C - P + 2 (where F = degrees of freedom, C = number of components, P = number of phases).
For water (one-component system C=1):
At triple point (ice, water, vapor in equilibrium P=3), F = 1 - 3 + 2 = 0 (invariant point at 0.0098°C and 4.58 mmHg).`,
        },
        {
          pageNumber: 7,
          title: "Engineering Nanomaterials & Spectroscopic Analysis",
          text: `Nanomaterials possess at least one physical dimension in the nanoscale domain (1 to 100 nm), exhibiting high surface-area-to-volume ratio and quantum confinement effects.
Carbon Nanotubes (CNTs): Cylindrical graphene sheets.
- Single-Walled Carbon Nanotubes (SWCNTs): Diameter ~1-2 nm.
- Multi-Walled Carbon Nanotubes (MWCNTs): Concentric cylindrical tubes with interlayer spacing of 0.34 nm.
Synthesis methods: Chemical Vapor Deposition (CVD), Arc Discharge, Laser Ablation.
Applications: High-strength lightweight composites, field emission displays, nano-electronics, and biosensors.
Instrumental Chemical Analysis:
- Beer-Lambert Law: Absorbance A = log10(I0 / I) = ε * c * l (where ε = molar absorptivity, c = concentration, l = path length).
- UV-Visible Spectrophotometry: Electronic transitions (pi -> pi*, n -> pi*) used for quantitative metal ion estimation.
- FTIR Spectroscopy: Infrared absorption matching vibrational modes for organic functional group identification.`,
        },
      ],
    },
    "doc-student-marks": {
      id: "doc-student-marks",
      courseId: "crs-cs604",
      name: "CS302_Course_Assessment_Marks.pdf",
      subject: "Database Management Systems",
      pagesCount: 3,
      wordsCount: 1950,
      uploadedAt: "2026-10-04",
      isOfficial: true,
      status: "ready",
      pages: [
        {
          pageNumber: 1,
          title: "Course Grading Policy & Evaluation Breakdown",
          text: `Course Code: CS302 - Database Management Systems
Department: Computer Science & Engineering
Semester: 5th Semester B.Tech (Academic Year 2026-2027)

EVALUATION SCHEME:
- Continuous Internal Evaluation (CIE): 50 Marks
  * Internal Assessment Test 1 (Quiz 20M + Midterm 50M scaled down): 25 Marks
  * Internal Assessment Test 2: 25 Marks
- Semester End Examination (SEE): 50 Marks
- Total: 100 Marks

MINIMUM PASSING CRITERIA:
Students must secure a minimum of 40% aggregate in CIE (20 out of 50) to be eligible for the Semester End Examination.`,
        },
        {
          pageNumber: 2,
          title: "Internal Assessment 1 - Student Marks & USN Roster",
          text: `INTERNAL ASSESSMENT 1 (IA-1) TABULATION SHEET
Course: CS302 Database Management Systems | Test Date: 2026-09-28

| USN | Student Name | Quiz (20M) | Midterm (50M) | Total IA-1 (70M) | Scaled (25M) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1MS21CS001 | Aarav Sharma | 18 | 42 | 60 | 21.4 | Pass |
| 1MS21CS002 | Ananya Rao | 20 | 48 | 68 | 24.3 | Pass |
| 1MS21CS019 | Devansh Gupta | 14 | 36 | 50 | 17.9 | Pass |
| 1MS21CS045 | Puneet Sharma | 19 | 46 | 65 | 23.2 | Pass |
| 1MS21CS062 | Rohan Varma | 12 | 28 | 40 | 14.3 | Borderline |
| 1MS21CS088 | Riya Patel | 17 | 44 | 61 | 21.8 | Pass |
| 1MS21CS103 | Sneha Kulkarni | 19 | 47 | 66 | 23.6 | Pass |

Class Statistics for IA-1:
- Highest Total: 68/70 (Ananya Rao, USN 1MS21CS002)
- Class Average Total: 58.5/70
- Lowest Total: 40/70 (Rohan Varma, USN 1MS21CS062)`,
        },
        {
          pageNumber: 3,
          title: "Remedial Coaching Plan & Faculty Sign-off",
          text: `REMEDIAL ACTIONS & FEEDBACK:
1. Students scoring below 18 on scaled IA-1 (e.g., Rohan Varma, USN 1MS21CS062) must attend remedial lab sessions on SQL Joins and Query Optimization.
2. Lab assignment submissions for Normalization (BCNF/3NF) due on 2026-10-18.

Course Instructor: Dr. Rajesh Narayan, Dept. of CSE
HOD Approval: Dr. S. Meenakshi`,
        },
      ],
    },
  },
  calendarEvents: {
    "evt-1": {
      id: "evt-1",
      userId: "default",
      title: "Operating Systems Mid-Term Lab Exam",
      type: "Lab",
      course: "Operating Systems & Virtual Memory",
      description: "Practical exam on Virtual Memory Paging simulation and Page Replacement (FIFO/LRU).",
      date: "2026-10-12",
      startTime: "09:30",
      endTime: "11:30",
      location: "Computing Lab 3",
      source: "Academic_Calendar_Fall2026.pdf (Page 2)",
      sourceDocument: "Academic_Calendar_Fall2026.pdf",
      sourcePage: 2,
      reminders: ["7 days before", "2 days before", "On the day"],
      status: "approved",
      createdAt: "2026-10-01T09:00:00Z",
      updatedAt: "2026-10-01T09:00:00Z",
    },
    "evt-4": {
      id: "evt-4",
      userId: "default",
      title: "Operating Systems Semester Final Exam",
      type: "Exam",
      course: "Operating Systems & Virtual Memory",
      description: "Comprehensive theory final covering Units 1-5, Virtual Memory, Scheduling, and Deadlocks.",
      date: "2026-10-24",
      startTime: "10:00",
      endTime: "13:00",
      location: "Exam Hall B-201",
      source: "Academic_Calendar_Fall2026.pdf (Page 5)",
      sourceDocument: "Academic_Calendar_Fall2026.pdf",
      sourcePage: 5,
      reminders: ["7 days before", "3 days before", "1 day before", "On the day"],
      status: "approved",
      createdAt: "2026-10-01T09:00:00Z",
      updatedAt: "2026-10-01T09:00:00Z",
    },
    "evt-5": {
      id: "evt-5",
      userId: "default",
      title: "Engineering Chemistry Theory Exam",
      type: "Exam",
      course: "Engineering Chemistry & Nanomaterials",
      description: "University end-semester written exam on Water Technology, Electrochemistry, Polymers, and Corrosion.",
      date: "2026-10-28",
      startTime: "09:00",
      endTime: "12:00",
      location: "Main Auditorium",
      source: "Academic_Calendar_Fall2026.pdf (Page 5)",
      sourceDocument: "Academic_Calendar_Fall2026.pdf",
      sourcePage: 5,
      reminders: ["7 days before", "5 days before", "2 days before", "1 day before"],
      status: "approved",
      createdAt: "2026-10-01T09:00:00Z",
      updatedAt: "2026-10-01T09:00:00Z",
    },
  },
  studyPlans: {
    "default": {
      id: "plan-default-os",
      userId: "default",
      courseId: "crs-cs601",
      subject: "Operating Systems",
      topics: [
        "Virtual Memory Architecture & Paging",
        "Page Faults & Handling Sequence",
        "Page Replacement Numerical (FIFO vs LRU)",
        "Thrashing & Denning's Working Set Model",
        "Comprehensive Mock Exam & Numerical Practice",
      ],
      examDate: "2026-10-24",
      dailyHours: 2.5,
      targetGrade: "A",
      createdAt: "2026-10-08",
      status: "active",
      tasks: [
        {
          id: "task-1",
          day: "Monday",
          date: "2026-10-12",
          topic: "Virtual Memory: Paging & MMU",
          task: "Review Address Translation, Multi-level page tables, and MMU frame mapping.",
          durationHours: 2.0,
          priority: "High",
          completed: true,
          statusTag: "Today",
          whyPrioritized: "Core foundation required for all downstream virtual memory concepts.",
        },
        {
          id: "task-2",
          day: "Tuesday",
          date: "2026-10-13",
          topic: "Page Faults & Handling Sequence",
          task: "Study 6-step kernel trap sequence, disk swap latency, and interrupt handling.",
          durationHours: 2.5,
          priority: "High",
          completed: false,
          statusTag: "Upcoming",
          whyPrioritized: "High-probability 10-mark question on university exams.",
        },
        {
          id: "task-3",
          day: "Wednesday",
          date: "2026-10-14",
          topic: "Page Replacement Numerical (FIFO vs LRU)",
          task: "Solve 4 reference string problems and identify Belady's anomaly in FIFO.",
          durationHours: 2.0,
          priority: "Medium",
          completed: false,
          statusTag: "Upcoming",
          whyPrioritized: "Essential numerical section for scoring full marks.",
        },
        {
          id: "task-4",
          day: "Thursday",
          date: "2026-10-15",
          topic: "Thrashing & Peter Denning's Working Set",
          task: "Master Working Set equation W(t, delta), demand vs frames, and PFF control.",
          durationHours: 2.5,
          priority: "High",
          completed: false,
          statusTag: "Upcoming",
          whyPrioritized: "Complex concept with frequent conceptual questions.",
        },
        {
          id: "task-5",
          day: "Friday",
          date: "2026-10-16",
          topic: "Comprehensive Semester Revision & Mock Exam",
          task: "Timed 45-minute practice test on 14-mark university exam questions.",
          durationHours: 2.0,
          priority: "High",
          completed: false,
          statusTag: "Upcoming",
          whyPrioritized: "Final retention benchmark before the exam.",
        },
      ],
    },
  },
  proposedPlanRevisions: {},
  notificationSettings: {
    "default": {
      pushEnabled: true,
      examReminders: true,
      assignmentReminders: true,
      projectReminders: true,
      labReminders: true,
      generalReminders: true,
      quietHoursEnabled: true,
      quietHoursStart: "22:00",
      quietHoursEnd: "07:00",
    },
  },
};

// Memory cache of DB
let dbCache: DatabaseSchema | null = null;

// Initialize or load DB
export function getDb(): DatabaseSchema {
  if (dbCache) return dbCache;

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      dbCache = JSON.parse(raw);
      // Ensure all top-level keys exist
      if (!dbCache?.courses) dbCache!.courses = { ...initialSeed.courses };
      if (!dbCache?.resources) dbCache!.resources = { ...initialSeed.resources };
      if (!dbCache?.documents) dbCache!.documents = { ...initialSeed.documents };
      if (!dbCache?.calendarEvents) dbCache!.calendarEvents = { ...initialSeed.calendarEvents };
      if (!dbCache?.studyPlans) dbCache!.studyPlans = { ...initialSeed.studyPlans };
      if (!dbCache?.proposedPlanRevisions) dbCache!.proposedPlanRevisions = {};
      if (!dbCache?.notificationSettings) dbCache!.notificationSettings = { ...initialSeed.notificationSettings };
      if (!dbCache?.users) dbCache!.users = { ...initialSeed.users };
      return dbCache!;
    } catch (e) {
      console.warn("Could not read db file, re-initializing seed:", e);
    }
  }

  dbCache = JSON.parse(JSON.stringify(initialSeed));
  saveDb(dbCache!);
  return dbCache!;
}

// Atomically save DB to disk
export function saveDb(db: DatabaseSchema): void {
  dbCache = db;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(db, null, 2), "utf-8");
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error("Failed to save database to disk:", err);
  }
}

// Helper: resolve effective user ID (or default)
export function resolveUserKey(userId?: string): string {
  if (!userId || userId.trim() === "" || userId === "null" || userId === "undefined") {
    return "default";
  }
  return userId.trim().toLowerCase();
}

// Courses access
export function getUserCourses(userId?: string): Course[] {
  const db = getDb();
  const uKey = resolveUserKey(userId);
  return Object.values(db.courses).filter(
    (c) => resolveUserKey(c.userId) === uKey || resolveUserKey(c.userId) === "default"
  );
}

export function saveCourse(course: Course): Course {
  const db = getDb();
  db.courses[course.id] = {
    ...course,
    updatedAt: new Date().toISOString(),
  };
  saveDb(db);
  return db.courses[course.id];
}

export function deleteCourse(id: string): boolean {
  const db = getDb();
  if (db.courses[id]) {
    delete db.courses[id];
    saveDb(db);
    return true;
  }
  return false;
}

// Resources access
export function getUserResources(userId?: string, courseId?: string): ResourceItem[] {
  const db = getDb();
  const uKey = resolveUserKey(userId);
  return Object.values(db.resources).filter((r) => {
    const userMatch = resolveUserKey(r.userId) === uKey || resolveUserKey(r.userId) === "default";
    if (!userMatch) return false;
    if (courseId && r.courseId && r.courseId !== courseId) return false;
    return true;
  });
}

export function saveResource(resItem: ResourceItem): ResourceItem {
  const db = getDb();
  db.resources[resItem.id] = {
    ...resItem,
    updatedAt: new Date().toISOString(),
  };
  saveDb(db);
  return db.resources[resItem.id];
}

export function deleteResource(id: string): boolean {
  const db = getDb();
  if (db.resources[id]) {
    delete db.resources[id];
    saveDb(db);
    return true;
  }
  return false;
}

// Study Plan access
export function getUserStudyPlan(userId?: string): StudyPlan {
  const db = getDb();
  const uKey = resolveUserKey(userId);
  if (db.studyPlans[uKey]) {
    return db.studyPlans[uKey];
  }
  return db.studyPlans["default"] || initialSeed.studyPlans["default"];
}

export function saveUserStudyPlan(userId: string, plan: StudyPlan): StudyPlan {
  const db = getDb();
  const uKey = resolveUserKey(userId);
  db.studyPlans[uKey] = plan;
  saveDb(db);
  return plan;
}

export function getUserProposal(userId?: string): ProposedPlanRevision | null {
  const db = getDb();
  const uKey = resolveUserKey(userId);
  return db.proposedPlanRevisions[uKey] || null;
}

export function saveUserProposal(userId: string, proposal: ProposedPlanRevision): void {
  const db = getDb();
  const uKey = resolveUserKey(userId);
  db.proposedPlanRevisions[uKey] = proposal;
  saveDb(db);
}

export function clearUserProposal(userId?: string): void {
  const db = getDb();
  const uKey = resolveUserKey(userId);
  delete db.proposedPlanRevisions[uKey];
  saveDb(db);
}

// Calendar Events access
export function getUserCalendarEvents(userId?: string): CalendarEvent[] {
  const db = getDb();
  const uKey = resolveUserKey(userId);
  return Object.values(db.calendarEvents).filter(
    (e) => resolveUserKey(e.userId) === uKey || resolveUserKey(e.userId) === "default"
  );
}

export function saveCalendarEvent(ev: CalendarEvent): CalendarEvent {
  const db = getDb();
  db.calendarEvents[ev.id] = {
    ...ev,
    updatedAt: new Date().toISOString(),
  };
  saveDb(db);
  return db.calendarEvents[ev.id];
}

export function deleteCalendarEvent(id: string): boolean {
  const db = getDb();
  if (db.calendarEvents[id]) {
    delete db.calendarEvents[id];
    saveDb(db);
    return true;
  }
  return false;
}

// User Profile access
export function upsertUser(user: UserProfile): UserProfile {
  const db = getDb();
  const key = resolveUserKey(user.email);
  db.users[key] = {
    ...user,
    id: user.id || `usr-${Date.now()}`,
  };
  saveDb(db);
  return db.users[key];
}

export function findUserByEmail(email: string): UserProfile | null {
  const db = getDb();
  const key = resolveUserKey(email);
  return db.users[key] || null;
}
