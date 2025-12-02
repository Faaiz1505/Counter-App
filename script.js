document.addEventListener("DOMContentLoaded", function () {
  const settingsBtn = document.getElementById("settings-btn");
  const settingsDisplay = document.getElementById("settings-display");
  const resetBtn = document.getElementById("reset");
  const increaseBtn = document.getElementById("increase");
  const countDisplay = document.getElementById("count");
  const counterDisplay = document.getElementById("counter-display");
  const themeBtn = document.getElementById("theme");
  const cleanBtn = document.getElementById("clean-btn");
  const pinkBtn = document.getElementById("pink-btn");
  const purpleBtn = document.getElementById("purple-btn");
  const luxuryBtn = document.getElementById("luxury-btn");
  const blueBtn = document.getElementById("blue-btn");
  const card = document.getElementById("card");

  // Load saved count OR set to 0 (handle invalid / missing values)
  let stored = localStorage.getItem("counterValue");
  let count = Number.isFinite(Number(stored)) ? Number(stored) : 0;

  // Load saved theme
  let savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeBtn.classList.add("fa-moon");
  } else {
    themeBtn.classList.add("fa-sun");
  }

  function saveTheme(style) {
    localStorage.setItem("theme", style);
  }

  themeBtn?.addEventListener("click", () => {
    document.body.classList.toggle("light");
    themeBtn.classList.toggle("fa-sun");
    themeBtn.classList.toggle("fa-moon");
    saveTheme(document.body.classList.contains("light") ? "light" : "dark");
  });

  // Load saved style
  let savedStyle = localStorage.getItem("counterStyle");
  if (savedStyle) {
    card.className = savedStyle;
  }

  function saveStyle(style) {
    localStorage.setItem("counterStyle", style);
  }

  function applyStyle(className) {
    card.className = className;
    saveStyle(className);

    settingsDisplay.classList.add("hidden");
    counterDisplay.classList.remove("hidden");
  }

  cleanBtn?.addEventListener("click", () => applyStyle("card"));
  pinkBtn?.addEventListener("click", () => applyStyle("card pink"));
  purpleBtn?.addEventListener("click", () => applyStyle("card purple"));
  luxuryBtn?.addEventListener("click", () => applyStyle("card luxury"));
  blueBtn?.addEventListener("click", () => applyStyle("card blue"));

  // Render saved count
  countDisplay.textContent = count;

  // Toggle settings (guard in case button missing)
  if (settingsBtn) {
    settingsBtn.addEventListener("click", () => {
      counterDisplay?.classList.toggle("hidden");
      settingsDisplay?.classList.toggle("hidden");
    });
  }

  // Increase button (guard)
  if (increaseBtn) {
    increaseBtn.addEventListener("click", (e) => {
      e.preventDefault?.();
      if (count >= 999999999) {
        return; // don't increase
      }
      count++;
      countDisplay.textContent = count;
      saveCount();
    });
  }

  // Reset button: guard, prevent default (stops form submit), update UI and storage
  if (resetBtn) {
    resetBtn.addEventListener("click", (e) => {
      // prevent form submission if the button is inside a form
      if (e && typeof e.preventDefault === "function") e.preventDefault();

      count = 0;
      countDisplay.textContent = count;
      saveCount();
      // optional visual feedback
      resetBtn.blur();
    });
  }

  // SAVE FUNCTION
  function saveCount() {
    localStorage.setItem("counterValue", String(count));
  }
});
