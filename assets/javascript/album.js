const url = 'https://deezerdevs-deezer.p.rapidapi.com/album/'

const params = new URLSearchParams(window.location.search);//mi serve per prendere l'id dell'oggetto dall'url

const albumId = params.get("id")
console.log(albumId)

const getproduct = function () {
    fetch(`${url}${albumId}`,{
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'e4a6b96369msh024e416adbab052p1463e7jsn0462779a6da0',
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Errore richiesta");
        }
        
    })

    .then((album) => {
    
        console.log(album.cover_big)

        const imgBanner =document.getElementById("imgAlbum")
        imgBanner.src= album.cover_big
        const h1Banner=document.getElementById("h1banner")
        h1Banner.innerText= album.title
        const artistName = document.getElementById("artistName");
        const nBrani = document.getElementById("nBrani");
        const duration = document.getElementById("duration");

        artistName.innerHTML = album.artist.name;
        nBrani.innerHTML = album.nb_tracks;

        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
        }


        duration.innerHTML = formatTime(album.duration);


        const container = document.getElementById("rowContainer");

        let count = 1;

        album.tracks.data.forEach(song => {

            const row = document.createElement("div");
            row.classList= "col-12 d-flex justify-content-start align-items-center m-2";

            row.innerHTML = `
        <div
                    class="col-6 d-flex justify-content-start align-items-center"
                  >
                    <p class="m-0 font-off fs-listeners">${count}</p>
                    <div class="d-inline-block font-off ms-3">
                      <p class="fs-6 m-0 text-white">${song.title}</p>
                      <p class="m-0 fs-7">${song.artist.name}</p>
                    </div>
                  </div>

                  <div class="col-2">
                    <p class="font-off text-center m-0 fs-listeners">${song.rank}</p>
                  </div>
                  <div class="col-2">
                    <p class="font-off text-center m-0 fs-listeners">${formatTime(song.duration)}</p>
                  </div>
                  <div class="col-2">
                    <i id="playSong" class="play-pause fas fa-play text-white" data-id="${song.id}"></i>
                  </div>
            `

            container.appendChild(row)
            count++;
            
        });

        container.addEventListener("click", (event) => {
            // Verifica se l'elemento cliccato è un'icona play-pause
            if (event.target.classList.contains("play-pause")) {
              const songId = event.target.getAttribute("data-id");
              
              // Qui puoi eseguire la funzione che gestisce la riproduzione
              loadSong(songId);
            }
          });
        

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
      
      
      
        const params = new URLSearchParams(window.location.search);//mi serve per prendere l'id dell'oggetto dall'url
      
        const songId = params.get("id")
      
        //`${apiUrl}${songId}`
      
        // Funzione per caricare i dati della canzone
        function loadSong(songId) {
            console.log(songId)
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

        



      })
      .catch((error) => {
        // Gestione degli errori
        console.error('Errore durante il recupero dei dati:', error);
      });

    }
    
    




    window.onload = () => {
    getproduct();
};


