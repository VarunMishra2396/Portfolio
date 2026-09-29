// ---------- project data ----------
const PROJECTS = [
  {
    name: "Baby-Feed-Tracker",
    tagline: "Fast baby-care logging for exhausted parents.",
    description:
      "An Android app for fast baby-care logging, clear daily summaries, and pediatrician-ready reporting. Built for speed when you're running on no sleep, log a feed or diaper in seconds and turn it into meaningful trends over the last 24 hours.",
    stack: ["Kotlin", "Android", "Gradle", "Firebase"],
    lang: "Kotlin",
    isPrivate: true,
    url: "https://github.com/VarunMishra2396/Baby-Feed-Tracker",
    highlights: [
      "Live breastfeeding, bottle-feed and pumping tracking",
      "Diaper and sleep logging with daily stats views",
      "Growth charts for weight, height and head circumference",
      "Visit summaries and export flows for pediatrician visits",
      "Multi-baby support with privacy-first local storage",
    ],
  },
  {
    name: "finance-app",
    tagline: "Personal finance tracking on the go.",
    description:
      "A cross-platform personal finance app built with Expo and React Native, backed by Supabase. Track income, expenses and spending patterns from your phone, one codebase running on Android, iOS and the web.",
    stack: ["TypeScript", "Expo", "React Native", "Supabase"],
    lang: "TypeScript",
    isPrivate: true,
    url: "https://github.com/VarunMishra2396/finance-app",
    highlights: [
      "One codebase for Android, iOS and web via Expo",
      "Supabase backend for auth and data",
      "Tab-based navigation with React Navigation",
    ],
  },
  {
    name: "retro-runner",
    tagline: "A retro-inspired 2D platformer for the web.",
    description:
      "An original retro-inspired 2D platformer built with Phaser 3, TypeScript and Vite. A complete browser-playable core loop: run, jump, grab pickups, dodge hazards and unlock the exit door.",
    stack: ["TypeScript", "Phaser 3", "Vite"],
    lang: "TypeScript",
    isPrivate: true,
    url: "https://github.com/VarunMishra2396/retro-runner",
    highlights: [
      "Scene flow: Boot, Preload, Menu, Level, HUD, Game Over",
      "Arcade physics with smooth camera follow",
      "Handcrafted level with collectibles that unlock the exit",
      "Lives, score and lose conditions",
    ],
  },
  {
    name: "AIDevAssistant",
    tagline: "An AI debugging companion for Android developers.",
    description:
      "An Android-first debugging companion that helps developers fix crashes faster than a general chatbot. Paste a stack trace and get structured, Android-specific answers with likely fixes and Jetpack Compose snippets. Local-first core with an optional remote backend.",
    stack: ["Kotlin", "Android", "Jetpack Compose", "Backend API"],
    lang: "Kotlin",
    isPrivate: true,
    url: "https://github.com/VarunMishra2396/AIDevAssistant",
    highlights: [
      "Structured answers for stack traces and Android errors",
      "Jetpack Compose UI snippets on demand",
      "Local history of past fixes for reuse",
      "Local-first design with cloud-enhanced option",
    ],
  },
  {
    name: "Android",
    tagline: "Android builds and experiments.",
    description:
      "A private repo for Android work. Details coming soon.",
    stack: ["Kotlin", "Android"],
    lang: "Kotlin",
    isPrivate: true,
    url: "https://github.com/VarunMishra2396/Android",
    highlights: [],
  },
  {
    name: "Portfolio",
    tagline: "This site, my corner of the web.",
    description:
      "My personal portfolio: a fast, responsive single page built with plain HTML, CSS and JavaScript, hosted free on GitHub Pages. No build step, no framework, just the web platform.",
    stack: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    lang: "CSS",
    isPrivate: false,
    url: "https://github.com/VarunMishra2396/Portfolio",
    highlights: [
      "Responsive, mobile-first design",
      "Zero build step, pure static hosting",
    ],
  },
];

// ---------- render cards ----------
const grid = document.getElementById("projectsGrid");

grid.innerHTML = PROJECTS.map(
  (p, i) => `
  <article class="project-card" data-index="${i}" tabindex="0" role="button" aria-label="Open details for ${p.name}">
    <div class="project-top">
      <span class="lang-dot"><i></i>${p.lang}</span>
      <span class="${p.isPrivate ? "badge-private" : "badge-public"}">${p.isPrivate ? "Private" : "Public"}</span>
    </div>
    <h3>${p.name}</h3>
    <p class="tagline">${p.tagline}</p>
    <div class="project-tags">${p.stack.slice(0, 3).map((s) => `<span>${s}</span>`).join("")}</div>
    <p class="card-hint">Click to expand →</p>
  </article>`
).join("");

// ---------- modal ----------
const overlay = document.getElementById("modalOverlay");
const modalBox = document.getElementById("modalBox");

function openModal(i) {
  const p = PROJECTS[i];
  modalBox.innerHTML = `
    <button class="modal-close" id="modalClose" aria-label="Close">✕</button>
    <div class="project-top">
      <span class="lang-dot"><i></i>${p.lang}</span>
      <span class="${p.isPrivate ? "badge-private" : "badge-public"}">${p.isPrivate ? "Private repo" : "Public repo"}</span>
    </div>
    <h3>${p.name}</h3>
    <p class="tagline">${p.tagline}</p>
    <p class="desc">${p.description}</p>
    <h4>Tech stack</h4>
    <div class="project-tags">${p.stack.map((s) => `<span>${s}</span>`).join("")}</div>
    ${p.highlights.length ? `<h4>Highlights</h4><ul>${p.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>` : ""}
    <div class="modal-actions">
      <a href="${p.url}" target="_blank" rel="noopener" class="btn btn-primary">View on GitHub</a>
      ${p.isPrivate ? `<span class="modal-note">Private repo, visible to collaborators only.</span>` : ""}
    </div>`;
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.getElementById("modalClose").addEventListener("click", closeModal);
}

function closeModal() {
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

grid.addEventListener("click", (e) => {
  const card = e.target.closest(".project-card");
  if (card) openModal(Number(card.dataset.index));
});
grid.addEventListener("keydown", (e) => {
  const card = e.target.closest(".project-card");
  if (card && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault();
    openModal(Number(card.dataset.index));
  }
});
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
});

// ---------- mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ---------- nav shadow on scroll ----------
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 10);
}, { passive: true });

// ---------- reveal on scroll ----------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
