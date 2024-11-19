const playButton = document.querySelector(".bi-play-circle-fill");
const skipBackwardButton = document.querySelector(".bi-skip-start-fill");
const skipForwardButton = document.querySelector(".bi-skip-end-fill");
const timeBar = document.querySelector("#timeBar");
const volumeBar = document.querySelector(".player-info input[type='range']");

const audio = new Audio("./assets/audio/sample.mp3");