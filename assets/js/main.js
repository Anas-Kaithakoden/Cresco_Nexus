/* Cresco Nexus — site scripts (vanilla JS, no dependencies) */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ---------- Sticky header shadow ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    var closeMenu = function () {
      toggle.setAttribute("aria-expanded", "false");
      links.classList.remove("is-open");
    };
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      links.classList.toggle("is-open", !open);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var reveal = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            reveal.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      if (reduceMotion) {
        el.classList.add("is-visible");
      } else {
        reveal.observe(el);
      }
    });
  }

  /* ---------- Sign-up form (Formspree) ---------- */
  var form = document.querySelector("[data-form='join']");
  if (form) {
    var status = form.querySelector(".form-status");
    var PLACEHOLDER = "YOUR_FORM_ID";

    var setStatus = function (type, message) {
      status.classList.remove("is-visible", "form-status--success", "form-status--error", "form-status--info");
      status.classList.add("is-visible", "form-status--" + type);
      status.textContent = message;
      status.setAttribute("role", "status");
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var button = form.querySelector("[type='submit']");
      var endpoint = form.getAttribute("action") || "";
      var isPlaceholder = endpoint.indexOf(PLACEHOLDER) !== -1;

      var interestInputs = form.querySelectorAll("[name='interests']");
      var pickedAny = Array.prototype.some.call(interestInputs, function (el) {
        return el.checked;
      });
      if (interestInputs.length && !pickedAny) {
        setStatus("error", "Please select at least one area of interest (or choose “Not sure yet”).");
        return;
      }

      if (isPlaceholder) {
        setStatus(
          "info",
          "This form is not connected yet. Replace the placeholder Formspree ID in join.html (see assets/js/main.js) with your form ID to receive submissions."
        );
        return;
      }

      button.disabled = true;
      button.textContent = "Submitting…";
      setStatus("info", "Sending your registration…");

      var data = new FormData(form);
      data.set("_subject", "New Cresco Nexus join request from " + (data.get("name") || "a student"));

      fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Request failed");
          return response.json();
        })
        .then(function () {
          form.reset();
          setStatus(
            "success",
            "Registration received — welcome to Cresco Nexus! The core team will be in touch with next steps."
          );
        })
        .catch(function () {
          setStatus(
            "error",
            "Something went wrong and your registration could not be sent. Please try again, or contact the core team directly."
          );
        })
        .finally(function () {
          button.disabled = false;
          button.textContent = button.getAttribute("data-label") || "Register";
        });
    });
  }

  /* ---------- Current year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();