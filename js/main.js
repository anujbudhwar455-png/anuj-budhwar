(function () {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  const path = location.pathname.replace(/\/$/, "") || "/";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href") || "";
    const clean = href.replace(/^\.\//, "").replace(/\/$/, "");
    const here = path.split("/").pop() || "index.html";
    if (
      (here === "index.html" || here === "" || path.endsWith("/anuj-budhwar")) &&
      (clean === "index.html" || clean === "." || clean === "")
    ) {
      a.classList.add("active");
    } else if (clean && here === clean) {
      a.classList.add("active");
    } else if (clean && path.includes("/" + clean.replace(".html", ""))) {
      a.classList.add("active");
    }
  });

  document.querySelectorAll("[data-reveal]").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity .6s ease, transform .6s ease";
  });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "none";
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
})();
