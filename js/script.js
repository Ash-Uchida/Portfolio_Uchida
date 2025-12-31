/* ---------- PAGE LOADER ---------- */
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

/* ---------- REVEAL ---------- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* ---------- PARALLAX + COLOR TRANSITIONS ---------- */
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const progress = Math.min(scrolled / maxScroll, 1);

  /* Parallax */
  document.querySelectorAll(".parallax").forEach(el => {
    el.style.transform = `translateY(${scrolled * 0.25}px)`;
  });

  /* COLOR INTERPOLATION */
  const bgStart = [132, 218, 175]; // green
  const bgEnd = [11, 2, 41];       // blue-black

  const textStart = [11, 2, 41];
  const textEnd = [210, 240, 230]; // soft light text

  const blend = (start, end) =>
    start.map((s, i) =>
      Math.round(s + (end[i] - s) * progress)
    );

  const bg = blend(bgStart, bgEnd);
  const text = blend(textStart, textEnd);

  document.documentElement.style.setProperty("--bg", `rgb(${bg.join(",")})`);
  document.documentElement.style.setProperty("--text", `rgb(${text.join(",")})`);
  document.documentElement.style.setProperty("--accent", `rgb(${text.join(",")})`);
});

/* ---------- ACTIVE NAV ---------- */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
});

/* ---------- MODAL ---------- */
const modal = document.querySelector(".modal");
const modalTitle = document.getElementById("modalTitle");

document.querySelectorAll(".open-modal").forEach(btn => {
  btn.addEventListener("click", e => {
    modalTitle.textContent =
      e.target.closest(".project-card").dataset.title;
    modal.classList.remove("hidden");
  });
});

document.querySelector(".close").addEventListener("click", () => {
  modal.classList.add("hidden");
});
