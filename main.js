/**
 * main.js
 * Student-friendly JS for multi-page site:
 * - small interactive features
 * - form validation (client-side)
 * - mobile nav toggle
 * - simple dynamic content injection
 *
 * All code uses plain JavaScript (no libraries).
 */

(function () {
  "use strict";

  /* ----------------------------
     NAVIGATION (mobile toggle)
     ---------------------------- */
  function initNavToggle() {
    const toggles = document.querySelectorAll(".nav-toggle");
    toggles.forEach(btn => {
      // Find related nav by aria-controls OR the nearest .main-nav in header
      btn.addEventListener("click", function () {
        // For simplicity: toggle first .main-nav sibling
        // if the nav is hidden by CSS, toggle inline display
        const header = btn.closest(".header-inner");
        let nav = header && header.querySelector(".main-nav");
        if (!nav) {
          // fallback to global mainNav
          nav = document.querySelector(".main-nav");
        }
        if (!nav) return;
        const isOpen = nav.style.display === "block";
        nav.style.display = isOpen ? "none" : "block";
        btn.setAttribute("aria-expanded", (!isOpen).toString());
      });
    });
  }

  /* ----------------------------
     DYNAMIC UPDATES (example of JS injecting content)
     - demonstrates a function with parameters and return value
     ---------------------------- */
  function formatUpdate(date, text) {
    // returns a DOM <li> element ready to append
    const li = document.createElement("li");
    li.textContent = `${date} — ${text}`;
    return li;
  }

  function initUpdates() {
    const updatesList = document.getElementById("updatesList");
    const loadBtn = document.getElementById("loadUpdates");
    if (!updatesList || !loadBtn) return;

    loadBtn.addEventListener("click", function () {
      // sample updates (in real project this could be fetched)
      const sample = [
        { d: "2025-03-01", t: "New study guide posted for Physics." },
        { d: "2025-03-05", t: "Group study scheduled for Saturday." },
        { d: "2025-03-10", t: "Registration opens for next term." }
      ];

      // inject items (function demonstrates usage of parameters and return)
      sample.forEach(item => {
        const el = formatUpdate(item.d, item.t);
        updatesList.appendChild(el);
      });

      // disable button after loading to avoid duplicates
      loadBtn.disabled = true;
      loadBtn.textContent = "Updates loaded";
    });
  }

  /* ----------------------------
     CALCULATOR (area) — functions + validation
     ---------------------------- */
  function parseNumber(value) {
    // returns number or null
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
  }

  function calculateArea(width, height) {
    // returns null for invalid input, or number for area
    const w = parseNumber(width);
    const h = parseNumber(height);
    if (w === null || h === null || w <= 0 || h <= 0) return null;
    return w * h;
  }

  function initCalculator() {
    const calcBtn = document.getElementById("calcBtn");
    if (!calcBtn) return;
    calcBtn.addEventListener("click", function () {
      const wEl = document.getElementById("width");
      const hEl = document.getElementById("height");
      const resultEl = document.getElementById("calcResult");
      const area = calculateArea(wEl.value, hEl.value);
      if (area === null) {
        resultEl.textContent = "❌ Please enter valid positive numbers for width and height.";
        resultEl.style.color = "#b63b3b";
      } else {
        resultEl.textContent = `✅ The area of your rectangle is: ${area}`;
        resultEl.style.color = "#0b3b2b";
      }
    });
  }

  /* ----------------------------
     FORM VALIDATION (contact form)
     - demonstrates event handling, regex, and friendly messages
     ---------------------------- */
  function validateEmail(email) {
    // simple regex (suitable for student assignment)
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return re.test(email);
  }

  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;
    const feedback = document.getElementById("formFeedback");

    form.addEventListener("submit", function (e) {
      e.preventDefault(); // prevent default submit
      feedback.textContent = ""; // reset

      const name = document.getElementById("fullName").value.trim();
      const email = document.getElementById("emailAddr").value.trim();
      const message = document.getElementById("message").value.trim();

      let valid = true;
      if (name.length < 2) {
        feedback.textContent = "Please provide your full name (at least 2 characters).";
        feedback.style.color = "#b63b3b";
        valid = false;
      } else if (!validateEmail(email)) {
        feedback.textContent = "Please enter a valid email address.";
        feedback.style.color = "#b63b3b";
        valid = false;
      } else if (message.length < 10) {
        feedback.textContent = "Message must be at least 10 characters.";
        feedback.style.color = "#b63b3b";
        valid = false;
      }

      if (!valid) return;

      // If valid — simulate successful send (no backend)
      feedback.textContent = "✅ Thank you! Your message has been received (simulated).";
      feedback.style.color = "#0b3b2b";
      form.reset();
    });
  }

  /* ----------------------------
     ANIMATION TRIGGERS
     - animate the logo box by toggling CSS class
     ---------------------------- */
  function initAnimationToggle() {
    const animateBtn = document.getElementById("animateBtn");
    const animatedLogo = document.getElementById("animatedLogo");
    const toggleFloatBtn = document.getElementById("toggleFloat");

    if (!animateBtn || !animatedLogo) return;

    animateBtn.addEventListener("click", function () {
      // Toggle move-box to trigger one-shot animation
      // For re-triggering, the CSS animationend handler removes the class
      if (!animatedLogo.classList.contains("move-box")) {
        animatedLogo.classList.add("move-box");
        // Remove class after animation ends so it can be re-triggered
        animatedLogo.addEventListener("animationend", function handler() {
          animatedLogo.classList.remove("move-box");
          animatedLogo.removeEventListener("animationend", handler);
        });
      }
    });

    // Optional: Pause/resume floating animation if toggle exists
    if (toggleFloatBtn && animatedLogo) {
      toggleFloatBtn.addEventListener("click", function () {
        const paused = animatedLogo.classList.toggle("paused");
        toggleFloatBtn.textContent = paused ? "Resume Floating" : "Pause Floating";
      });
    }
  }

  /* ----------------------------
     INITIALIZE ALL
     ---------------------------- */
  function init() {
    initNavToggle();
    initUpdates();
    initCalculator();
    initContactForm();
    initAnimationToggle();
  }

  // run init on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
