/* ---------- AUTO DARK MODE ---------- */
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
} else if (prefersDark) {
  document.documentElement.setAttribute("data-theme", "dark");
}

/* ---------- TOGGLE ---------- */
document.getElementById("themeToggle").addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

/* ---------- SCROLL REVEAL ---------- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* ---------- ACTIVE NAV ---------- */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const top = window.scrollY;
    if (top >= section.offsetTop - 200) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* ---------- FILTER PROJECTS ---------- */
document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => {
      card.style.display =
        filter === "all" || card.dataset.category === filter
          ? "block"
          : "none";
    });
  });
});

/* ---------- MODAL ---------- */
const modal = document.querySelector(".modal");
document.querySelectorAll(".open-modal").forEach(btn =>
  btn.addEventListener("click", () => modal.classList.remove("hidden"))
);

document.querySelector(".close").addEventListener("click", () =>
  modal.classList.add("hidden")
);

/* ---------- LOTTIE ---------- */
lottie.loadAnimation({
  container: document.getElementById("lottie"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "assets/lottie.json" // replace with your own
});
