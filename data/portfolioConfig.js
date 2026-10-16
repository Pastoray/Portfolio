/**
 * SINGLE SOURCE OF TRUTH
 * ---------------------------------------------------------------------------
 * Edit this file to change what the site shows when no database is configured,
 * and run `npm run db:seed` to push the same data into PostgreSQL / Supabase.
 *
 * Rules of thumb
 *  - Every array can be empty: the matching section/route disappears from the
 *    navigation, and a direct visit shows a friendly empty state.
 *  - Order does not matter: items are sorted newest-first automatically.
 *  - `key` / `slug` / `name` are the stable identifiers used by the seed script
 *    to upsert (so re-seeding updates rather than duplicates).
 *  - Dates are ISO strings (YYYY-MM-DD). `endDate: null` means "present".
 *  - Plain ESM, no imports: it must stay loadable from Node (seed) and Next.
 */

export const profile = {
  fullName: "Reda Araar",
  headline: "Systems Programmer | Backend Engineer | Distributed Infrastructure",
  intro: {
    prefix: "I'm Reda Araar, ",
    emphasis: "a Systems & Backend Engineer",
    suffix: " focused on building resilient distributed infrastructure, high-throughput backend services, and high-performance data systems.",
  },
  bio: "I specialize in systems programming, robust backend engineering, and distributed infrastructure design. My core focus lies in engineering fault-tolerant pipelines, optimizing network performance, and writing clean, concurrent code for high-performance architectures. I am currently looking for an engineering role where I can design, build, and scale reliable, high-bandwidth systems primitives.",
  heroWords: ["Designing", "Building", "Shipping"], // typed and backspaced in the hero; 0 words hides it
  location: "Khenchela, Algeria",
  timezone: "Africa/Algiers", // any IANA zone, e.g. "Europe/Paris" – drives the live clock
  avatarUrl: null, // e.g. "/avatar.jpg" or a Supabase Storage URL
  availability: "Open to new opportunities", // e.g. "Open to new opportunities"
  languages: ["English", "Arabic"],
  email: "ridhaaraar@gmail.com",
  resumeUrl: null,
  socials: [
    // type must be one of: github | linkedin | email | twitter | website
    { type: "github", label: "GitHub", url: "https://github.com/Pastoray" },
    { type: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/ridha-araar/" },
    { type: "email", label: "Email", url: "mailto:ridhaaraar@gmail.com" },
  ],
};

/** Headings and subtitles for each route (config-only, not stored in the DB). */
export const pages = {
  home: {
    stack: "Tech stack",
    featuredWork: "Selected work",
    latestPosts: "Latest writing",
  },
  about: { eyebrow: "About", skills: "Skills & tools", experience: "Experience & education" },
  work: { 
    eyebrow: "Work", 
    title: "Projects", 
    subtitle: "High-throughput backend architecture, distributed systems, and systems-level infrastructure." 
  },
  blog: { 
    eyebrow: "Blog", 
    title: "Writing", 
    subtitle: "Technical deep-dives on backend design patterns, distributed protocols, and engineering performance." 
  },
  gallery: { eyebrow: "Gallery", title: "Gallery", subtitle: "" },
};

export const workExperience = [
  {
    key: "work-freelance",
    title: "Freelance Backend & Infrastructure Engineer",
    organization: "Independent Contractor",
    location: "Remote",
    description: "Designed, built, and optimized high-performance backend systems and custom data pipelines for various independent clients.",
    highlights: [
      "Architected fault-tolerant REST and gRPC API layers, ensuring reliable service-to-service communication.",
      "Optimized database schemas and index configurations to handle heavy write loads and high-throughput application demands.",
      "Containerized backend infrastructure using Docker to streamline multi-environment testing and deployment pipelines."
    ],
    technologies: ["Go", "C++", "Python", "PostgreSQL", "Docker", "gRPC"],
    startDate: "2024-01-10",
    endDate: null, // 'null' perfectly signals 'Present' to the frontend component
  },
];

export const education = [
  {
    key: "edu-masters",
    title: "Master of Science in Artificial Intelligence",
    organization: "University of Khenchela",
    location: "Khenchela, Algeria",
    description: "Advanced study of intelligent systems, machine learning architectures, neural networks, and advanced data analysis algorithms.",
    highlights: ["Expected Graduation: June 2028"],
    technologies: ["Python", "C++", "PyTorch", "TensorFlow", "Scikit-Learn", "NumPy", "Pandas", "OpenCV"],
    startDate: "2026-10-01",
    endDate: "2028-06-30",
  },
  {
    key: "edu-bachelors",
    title: "Bachelor of Science in Computer Science",
    organization: "University of Khenchela",
    location: "Khenchela, Algeria",
    description: "Core academic foundation covering fundamental computation principles, computer systems, and standard software engineering methodologies.",
    highlights: ["Graduated with honours"],
    technologies: ["C", "C++", "Java", "Python", "JavaScript", "PHP", "HTML", "CSS", "Linux"],
    startDate: "2023-09-01",
    endDate: "2026-06-30",
  },
];

export const projects = [
  {
    slug: "flume-storage-engine",
    title: "Flume: LSM-Tree Storage Engine",
    summary: "A high-performance Log-Structured Merge-tree storage engine optimized for persistent, fast, and concurrent key-value write performance.",
    description: "Flume is an enterprise-grade LSM-tree storage engine built from scratch to handle heavy write amplification challenges under significant continuous disk load. The architecture leverages a Write-Ahead Log (WAL) to guarantee durability, combined with multi-layered L0 to L6 leveled compaction mechanics to manage high-throughput data volumes and reduce read amplification bottlenecks over time.\n\nThe core challenge centered on eliminating deep race conditions between active user readers and asynchronous background compaction engines. By implementing an MVCC snapshot strategy, sequence-number recency tracking, and fine-grained reference-counted SSTable lifetimes, I resolved multiple hidden concurrency deadlocks. The final system incorporates Prometheus observability, structured slog instances, and a native HTTP JSON API.",
    imageUrl: null,
    liveUrl: null,
    repoUrl: "https://github.com/Pastoray/Flume",
    technologies: ["Go", "Distributed Systems", "Concurrency", "Prometheus"],
    featured: true,
    publishedAt: "2026-08-15",
  },
  {
    slug: "logflow-aggregator",
    title: "Logflow: Distributed Log Aggregator",
    summary: "A high-availability streaming log ingestion pipeline capable of sustaining 20,000 events per second with zero data drops.",
    description: "Logflow is a fault-tolerant, high-throughput distributed log aggregation engine built to ingest, queue, and dispatch massive event streams reliably. The architecture utilizes pluggable gRPC sources and sinks to maintain reliable streaming contexts across distributed node topologies under severe burst loads.\n\nTo ensure durability against unexpected node crashes, I built a persistent FileChannel featuring a custom CRC32 Write-Ahead Log (WAL) that enables at-least-once delivery guarantees. This is backed by a spillable memory channel that gracefully offloads up to 98,000 burst events to disk without dropping packets. The edge topology includes priority-based failover hooks, load-balancing sink groups, dynamic token authentication via mTLS, and graceful staged shutdown handling using SIGTERM traps.",
    imageUrl: null,
    liveUrl: null,
    repoUrl: "https://github.com/Pastoray/Logflow",
    technologies: ["Go", "gRPC", "WAL", "High Availability", "mTLS"],
    featured: true,
    publishedAt: "2026-05-20",
  },
  {
    slug: "peb-edge-proxy",
    title: "Peb: High-Performance Edge Proxy",
    summary: "An asynchronous web server and zero-trust reverse proxy engineered to sustain over 50,000 concurrent network connections.",
    description: "Peb is a modern, high-throughput network proxy built to optimize request delivery times and maximize connection density. The core application runs on an asynchronous architecture blending native epoll notification loops with cutting-edge Linux io_uring I/O submission queues to achieve extreme concurrent scaling across high-bandwidth traffic pipelines.\n\nTo optimize network resource usage, I implemented a full HTTP/2 stream multiplexing layer with custom HPACK header compression and dynamic stream flow control, resulting in a 3.4x throughput increase over legacy configurations. For security and routing reliability, the engine integrates an active zero-trust OpenSSL mTLS certificate validation layer coupled with fault-tolerant upstream load-balancing backend pools.",
    imageUrl: null,
    liveUrl: null,
    repoUrl: "https://github.com/Pastoray/Peb",
    technologies: ["C++17", "io_uring", "epoll", "HTTP/2", "OpenSSL", "mTLS"],
    featured: false,
    publishedAt: "2026-07-22",
  },
  {
    slug: "pttdb-time-travel-debugger",
    title: "PTTDB: Time-Travel Debugger",
    summary: "A ptrace-powered deterministic record/replay time-travel debugger for Linux/x86_64 utilizing custom kernel virtualization.",
    description: "PTTDB is a low-level systems utility engineered to capture deterministic execution histories by tracking target processes instruction-by-instruction. It forks and traces binaries using raw ptrace(2) PTRACE_SINGLESTEP loops, logging the full processor register file at every instruction step alongside full-process memory snapshots reconstructed dynamically via periodic /proc/<pid>/mem checkpoints. Once recorded, debugging is entirely decoupled from execution, allowing backward and forward navigation by treating time-travel steps like a structured data cursor.\n\nTo safely intercept non-deterministic mutations like filesystem modifications, I built a feature called Total Kernel Virtualization. By trapping calls with PTRACE_SYSCALL at both entry and exit boundaries, the debugger captures full buffers for file I/O operations (open, read, pread64, close). During virtualized replays, file subsystem requests are systematically hijacked, rewriting active operations into harmless no-op primitives (getpid) while streaming the originally captured execution bytes directly into the caller's process allocation memory space. This lets you delete the real asset from disk entirely while the process still executes perfectly.\n\nTo tackle concurrent multi-threaded execution traces without corruption, the engine implements a custom round-robin single-instruction scheduler that actively enforces strict deterministic interleaving across pthreads captured via PTRACE_O_TRACECLONE hooks. Furthermore, the application is entirely dependency-free, implementing a custom ELF64 section parser to map memory function strings and a DWARF version 5 line-number state machine to map raw memory pointers down to source-level file and line symbols. It also incorporates x86_64 hardware debug registers (DR0-DR3) to capture exact per-instruction memory watchpoints for deep cross-thread data race analysis.",
    imageUrl: null,
    liveUrl: null,
    repoUrl: "https://github.com/Pastoray/PTTDB",
    technologies: ["C++17", "Linux Kernel", "ptrace", "ELF/DWARF5", "Concurrency", "CMake"],
    featured: true,
    publishedAt: "2026-08-16",
  },
  {
    slug: "p-compiler-toolchain",
    title: "P: Custom Compiler & Runtime Toolchain",
    summary: "A dependency-free x86-64 compiler pipeline written in C++17 featuring a freestanding custom standard library runtime.",
    description: "P is a statically-typed, general-purpose programming language featuring a strongly validation-driven C-like syntax model. To map high-level constructs smoothly down to bare hardware targets without heavy structural toolkits like LLVM, I architected a completely standalone compilation engineering pipeline from scratch. The system transforms source definitions by executing sequentially through a custom Tokenizer stream, a structured Abstract Syntax Tree (AST) Parser layout, a rigorous type-validating Semantic Analyzer (Sema), a low-level platform-independent Intermediate Representation (IR) layer, and a target Code Generator that emits native x86-64 assembly in standard AT&T syntax formats.\n\nTo complement the compiler execution, I developed a minimal, freestanding custom standard runtime library (libp) written in pure C and Assembly. This sub-architecture handles core environment lifecycle requirements directly above the Linux boundary layer—including manual low-level memory block allocators (malloc/free), low-latency I/O operations, structural signal handling, and raw OS system call wrappers. Crucially, the runtime incorporates full multi-threaded concurrency abstractions (spawn_thread, mutex_lock) and dynamic dispatch mechanisms, allowing the language to handle advanced parallel workloads natively. The codebase is supported by automated regression diagnostics engines and isolated compilation benchmarking tools to prevent logic drift.",
    imageUrl: null,
    liveUrl: null,
    repoUrl: "https://github.com/Pastoray/P",
    technologies: ["C++17", "Assembly x86-64", "Compiler Design", "Linux Kernel", "Concurrency", "CMake"],
    featured: false,
    publishedAt: "2026-05-01",
  }
];

export const posts = [
  {
    slug: "mold-linker-cpp-to-rust",
    title: "Mold 3.0: A Case Study in Extreme Concurrency and Modern Systems Engineering",
    excerpt: "The blisteringly fast linker has been completely rewritten from C++ to Rust. Let's analyze this massive architectural shift at the absolute limits of memory bandwidth.",
    content: "Mold 3.0 is out, and it is a massive case study in modern systems engineering.\n\nThe blisteringly fast linker has been completely rewritten from C++ to Rust. For a tool that operates at the absolute limit of memory bandwidth and concurrency, this is a major architectural shift.\n\nLinkers are brutal to maintain. Shifting to Rust allows the maintainers to keep the raw execution speed of C++ while letting the compiler safely manage complex data races and pointer lifetimes. The result is a highly predictable, rock-solid codebase that does not sacrifice a single nanosecond of performance.\n\nIt is a perfect example of moving past language tribalism to choose the right tool for extreme concurrency.\n\nIf you want to kill your build times, drop it into your toolchain.",
    coverUrl: null,
    tags: ["Systems Engineering", "Rust", "C++", "Compilers", "Infrastructure"],
    publishedAt: "2026-10-10",
  },
  {
    slug: "in-production-boring-is-beautiful",
    title: "In Production, Boring is Beautiful: Why Go Wins the Cloud Infrastructure Layer",
    excerpt: "The tech industry has a dangerous obsession with complexity, but the entire bedrock of modern cloud computing runs on a language that is explicitly, intentionally boring.",
    content: "The tech industry has a dangerous obsession with complexity. We love to argue about Rust’s borrow checker or C++ metaprogramming, praising languages that let us write ultra-clever abstractions. Then you look at the bedrock of modern cloud computing. Kubernetes, Docker, Terraform, Prometheus. The entire modern infrastructure layer runs on Go. And Go is explicitly, intentionally boring.\n\nIt has no structural inheritance, no magic macros, and a syntax so barebones you can learn it in a weekend. It forces you to write out repetitive error checks instead of hiding them behind clever monads.\n\nTo a language enthusiast, Go looks like a step backward. But to a systems engineer deploying code at scale, Go is a masterpiece of restraint. When you are managing massive distributed systems, clever code is a liability. You do not want a wizard writing cryptographic syntax that requires a PhD to debug at 3 AM during an outage. You want code that is painfully obvious.\n\nGo rejects the jack of all trades trap. It doesn't try to be a low-level bare-metal language or a functional math playground. It focuses on exactly one thing: making it easy to write highly concurrent, predictable network services.\n\nBecause the language takes up zero cognitive load, your brain is entirely free to focus on the actual engineering problems: network I/O, race conditions, and architectural bottlenecks.\n\nTrue engineering maturity is realizing that the goal isn't to prove how smart you are through your code. It is to build reliable systems while keeping the implementation as simple as humanly possible.\n\nIn production, boring is beautiful.",
    coverUrl: null,
    tags: ["Golang", "Systems Engineering", "Software Architecture", "Cloud Computing", "Backend Development"],
    publishedAt: "2026-10-07",
  },

  {
    slug: "amrita-icpc-problem-solving-ai",
    title: "The Amrita ICPC Aftermath: Why Using AI to Solve Problems is Cheating Yourself",
    excerpt: "Using an LLM to solve a contest problem is like using a forklift at the gym. You didn't actually lift anything, and your own brain just atrophies.",
    content: "Today’s Amrita ICPC aftermath is a massive wake-up call. The discussion isnt about brilliant problem-solving. Instead, its flooded with complaints about unprecedented cheating and rampant AI usage.\n\nIt’s predictable. We’ve trained people to care only about getting a green tick by any means necessary. But using an LLM to solve a contest problem is like using a forklift at the gym. You didnt actually lift anything, and your own brain just atrophies.\n\nAn AI can effortlessly vomit out a standard template it has seen ten thousand times. But the entire soul of competitive programming is about finding the hidden mathematical invariant in a scenario that has never existed before.\n\nIn real-world systems engineering, there is no prompt that will magically fix a chaotic race condition or an architecture nightmare. You cant copy-paste your way out of a broken system.If you cheated today, you didn’t beat the platform. You just cheated yourself out of the only skill that matters: the ability to think.",
    coverUrl: null,
    tags: ["Competitive Programming", "ICPC", "Problem Solving", "Software Engineering", "Algorithms"],
    publishedAt: "2026-10-04"
  }
];


export const gallery = [
  // Leave empty to hide the Gallery route entirely. Example item:
  // { key: "photo-1", title: "[Title]", caption: "[Caption]", imageUrl: "/gallery/photo-1.jpg", takenAt: "2025-05-01" },
];

export const skills = [
  // iconSlug = any slug from https://simpleicons.org (optional).
  // Languages
  { name: "C++", category: "Languages", iconSlug: "cplusplus", sortOrder: 1 },
  { name: "C", category: "Languages", iconSlug: "c", sortOrder: 2 },
  { name: "Go", category: "Languages", iconSlug: "go", sortOrder: 3 },
  { name: "Rust", category: "Languages", iconSlug: "rust", sortOrder: 4 },
  { name: "Python", category: "Languages", iconSlug: "python", sortOrder: 5 },
  { name: "Java", category: "Languages", iconSlug: null, sortOrder: 6 },
  { name: "JavaScript", category: "Languages", iconSlug: "javascript", sortOrder: 7 },
  { name: "TypeScript", category: "Languages", iconSlug: "typescript", sortOrder: 8 },
  { name: "Bash", category: "Languages", iconSlug: "gnubash", sortOrder: 9 },
  { name: "Assembly", category: "Languages", iconSlug: "assemblyscript", sortOrder: 10 },

  // Distributed Systems & Infra
  { name: "MySQL", category: "Infrastructure", iconSlug: "mysql", sortOrder: 1 },
  { name: "PostgreSQL", category: "Infrastructure", iconSlug: "postgresql", sortOrder: 2 },
  { name: "Docker", category: "Infrastructure", iconSlug: "docker", sortOrder: 3 },
  { name: "Kubernetes", category: "Infrastructure", iconSlug: "kubernetes", sortOrder: 4 },
  { name: "Redis", category: "Infrastructure", iconSlug: "redis", sortOrder: 5 },
  { name: "Apache Kafka", category: "Infrastructure", iconSlug: "apachekafka", sortOrder: 6 },
  { name: "Nginx", category: "Infrastructure", iconSlug: "nginx", sortOrder: 7 },

  // Tooling & Observability
  { name: "Linux", category: "Tooling", iconSlug: "linux", sortOrder: 1 },
  { name: "Prometheus", category: "Tooling", iconSlug: "prometheus", sortOrder: 2 },
  { name: "Grafana", category: "Tooling", iconSlug: "grafana", sortOrder: 3 },
  { name: "CMake", category: "Tooling", iconSlug: "cmake", sortOrder: 4 },
  { name: "Git", category: "Tooling", iconSlug: "git", sortOrder: 5 },
  { name: "GitHub Actions", category: "Tooling", iconSlug: "githubactions", sortOrder: 6 }
];

const portfolioConfig = { profile, pages, workExperience, education, projects, posts, gallery, skills };
export default portfolioConfig;
