const sidebar = document.getElementById("sidebar");
const toggleButton = document.getElementById("toggleSidebar");

toggleButton.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  toggleButton.textContent = sidebar.classList.contains("active") ? "Chiudi Menù" : "Apri Menù";
});
