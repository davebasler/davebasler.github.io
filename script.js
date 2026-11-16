// Small progressive enhancements. The page is fully usable without JavaScript.
(function () {
  "use strict";

  document.documentElement.classList.add("js"); // also set inline in <head> to avoid a flash

  // --- Reveal elements as they scroll into view ---------------------------
  var reveals = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduceMotion) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    reveals.forEach(function (el, i) {
      // Gentle stagger for siblings that enter together
      el.style.transitionDelay = Math.min((i % 4) * 60, 180) + "ms";
      revealObserver.observe(el);
    });
  }

  // --- Header border once the page is scrolled -----------------------------
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // --- Highlight the nav link of the section in view ----------------------
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-list a[href^='#']"));
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });

  if ("IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = byId[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("is-active"); });
          link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    document.querySelectorAll("main section[id]").forEach(function (s) { navObserver.observe(s); });
  }

  // --- Language switch: stay in the same section when switching EN <-> DE --
  document.querySelectorAll(".lang-switch a").forEach(function (a) {
    a.addEventListener("click", function () {
      if (location.hash) a.setAttribute("href", a.getAttribute("href").split("#")[0] + location.hash);
    });
  });

  // --- Print / "Save as PDF" should include the full publication list -----
  window.addEventListener("beforeprint", function () {
    document.querySelectorAll("details").forEach(function (d) { d.open = true; });
  });

  // --- Keep time-based numbers current ------------------------------------
  var now = new Date();
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = now.getFullYear();
  });
  document.querySelectorAll("[data-years-since]").forEach(function (el) {
    var parts = el.getAttribute("data-years-since").split("-");
    var start = new Date(+parts[0], (+parts[1] || 1) - 1, 1);
    var years = Math.floor((now - start) / (365.25 * 24 * 3600 * 1000));
    if (years > 0) el.textContent = years;
  });
})();
