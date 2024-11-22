const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const url = "https://deezerdevs-deezer.p.rapidapi.com/album/119606";

function loadDetails() {
  fetch(url, {
    headers: {
      "x-rapidapi-key": "e4a6b96369msh024e416adbab052p1463e7jsn0462779a6da0",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero del prodotto");
      }
    })
    .then((album) => {
      const imgAlbum = document.getElementById("imgAlbum");
      const h1Banner = document.getElementById("h1banner");
      const artistName = document.getElementById("artistName");
      const nBrani = document.getElementById("nBrani");
      const duration = document.getElementById("duration");

      imgAlbum.src = album.cover;
      h1Banner.innerHTML = album.title;
      artistName.innerHTML = album.artist.name;
      nBrani.innerHTML = album.nb_tracks;

      function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
      }

      duration.innerHTML = formatTime(album.duration);

      //---------------tabella----------------------

      const tableContainer = document.getElementById("tableContainer");

      let trackList = album.tracks.data;

      console.log(trackList);

      function createTable (tracklist){
        const container = document.getElementById("tableContainer")

        const table = document.getElementById("table");

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        const headers = ["#", "Titolo", "Riproduzioni", "Durata"];

        headers.forEach(headerText => {
          const th = document.createElement("th");
          th.textContent = headerText;
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");

        trackList.forEach(song => {
          const row = document.createElement("tr");

          
            const id = document.createElement("td");
            const title = document.createElement("td");
            const rank = document.createElement("td");
            const duration = document.createElement("td");
            const playB = document.createElement("td");
            const but = document.createElement("i")
            but.classList = "play-pause fas fa-play text-white";
            playB.appendChild(but);


            id.textContent = song.id;
            title.textContent = song.title;
            rank.textContent = song.rank;
            duration.textContent = formatTime(song.duration);
             
            row.appendChild(id);
            row.appendChild(title);
            row.appendChild(rank);
            row.appendChild(duration);
            row.appendChild(playB);
            
          

          /*const ourData = ["id", "title", "rank", "duration"];

          ourData.forEach(campo =>{
            const td = document.createElement("td");
          td.textContent = song[campo];
          row.appendChild(td);
          })
          */
          tbody.appendChild(row);

        })
        table.appendChild(tbody);

      }

      createTable(trackList);
        
    })
    .catch((err) => console.log(err));
}

loadDetails();



//-------------------------barra riproduzione musicale ------------------------------

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


const apiUrl = "https://deezerdevs-deezer.p.rapidapi.com/track/";

const params2 = new URLSearchParams(window.location.search);//mi serve per prendere l'id dell'oggetto dall'url

const songId = params.get("id")

//${apiUrl}${songId}

// Funzione per caricare i dati della canzone
function loadSong(songId) {
    fetch(`${apiUrl}${songId}`, {
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
