document.getElementById("shuffle").addEventListener("click", function () {
  const shuffleIcon = document.getElementById("shuffle");
  const dotIcon = document.getElementById("point");

  const currentColor = shuffleIcon.getAttribute("fill");

  if (currentColor === "#3F3F3F") {
    shuffleIcon.setAttribute("fill", "#1BC257");
    dotIcon.style.display = "inline";
  } else {
    shuffleIcon.setAttribute("fill", "#3F3F3F");
    dotIcon.style.display = "none";
  }
});
