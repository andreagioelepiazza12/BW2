const imgAlbum = document.getElementById("imgAlbum");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const currentSongTime = document.getElementById("currentSongTime");
const totalSongTime = document.getElementById("totalSongTime");
const progressBar = document.querySelector(".progress-bar .progress");
const playPauseButton = document.querySelector(".play-pause");
const volumeBar = document.querySelector(".volume-bar .progress");
const audio = new Audio(); // Audio player dinamico

// URL API per ottenere informazioni sulla canzone
// const apiUrl = "https://deezerdevs-deezer.p.rapidapi.com/track/"; 

const apiUrl = "https://deezerdevs-deezer.p.rapidapi.com/track/854914442";

const params = new URLSearchParams(window.location.search);//mi serve per prendere l'id dell'oggetto dall'url

const songId = params.get("id")

//${apiUrl}${songId}

// Funzione per caricare i dati della canzone
function loadSong(songId) {
    fetch(apiUrl, {
        headers: {
            "x-rapidapi-key" : "e4a6b96369msh024e416adbab052p1463e7jsn0462779a6da0",
            "x-rapidapi-host" : "deezerdevs-deezer.p.rapidapi.com"
        }
    })
        .then((response) => response.json())
        .then((song) => {
            // Popola i dettagli della canzone
            imgAlbum.src = song.album.cover;
            title.textContent = song.title;
            artist.textContent = song.artist.name;

            // Imposta la sorgente dell'audio
            audio.src = song.preview;
            audio.addEventListener("loadedmetadata", () => {
                totalSongTime.textContent = formatTime(audio.duration);
            });
        })
        .catch((error) => console.error("Errore nel caricamento della canzone:", error));
}

// formattazione del tempo 
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// aggiornamento della barra del tempo
audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentSongTime.textContent = formatTime(audio.currentTime);
});

// Controllo Play/Pause
playPauseButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.classList.replace("fa-play", "fa-pause");
    } else {
        audio.pause();
        playPauseButton.classList.replace("fa-pause", "fa-play");
    }
});

// Gestione del volume
volumeBar.parentElement.addEventListener("click", (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const clickX = e.clientX - rect.left;
    const volume = clickX / width;
    audio.volume = volume;
    volumeBar.style.width = `${volume * 100}%`;
});

// Carica la prima canzone
loadSong();