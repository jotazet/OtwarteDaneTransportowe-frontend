document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("dark-mode-toggle");
  const body = document.body;

  // Check for saved user preference
  if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    toggleButton.textContent = "🔆";
  }

  // Toggle dark mode on button click
  toggleButton.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
      body.classList.remove("dark-mode");
      toggleButton.textContent = "🌙";
      localStorage.setItem("dark-mode", "disabled");
    } else {
      body.classList.add("dark-mode");
      toggleButton.textContent = "🔆";
      localStorage.setItem("dark-mode", "enabled");
    }
  });
});