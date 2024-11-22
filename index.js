const url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=fabri%20fibra'

const getproduct = function () {
    fetch(url, {
        method: 'GET',
	headers: {
		'x-rapidapi-key': 'afa581262bmsh759f16f17696ca1p195c63jsn334671c1c2a8',
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

    .then((data) => {
        // Accedi all'array di cantanti
        const dataArray = data.data;
        console.log(dataArray)
        // Genera un indice casuale
        const randomIndex = Math.floor(Math.random() * dataArray.length);
        // Recupera il cantante casuale
        const randomalbum = dataArray[randomIndex];
        // Mostra il cantante casuale
        console.log('Cantante casuale:', randomalbum);
        const imgBanner =document.getElementById("imgAlbum")
        imgBanner.src= randomalbum.album.cover_xl
        const h1Banner=document.getElementById("h1banner")
        h1Banner.innerText= randomalbum.album.title

        randomAlbumId = randomalbum.album.id;

        console.log(dataArray[1].artist.id)
        
        for (let i = 0; i < dataArray.length; i++){
            const containerCard=document.getElementById("containercard")
            containerCard.innerHTML+= ` <div
                    class="card d-flex align-items-start flex-wrap flex-row flex-sm-row flex-md-column flex-lg-column col-md-6 col-md-6c col-lg-4 col-lg-4c col-xl-3 col-xl-3c col-xxl-3 col-xxl-3c text-white bg-dark"
                  >
                    <!-- Immagine -->
                    <div class="col-4 col-sm-4 col-md-12 col-lg-12 col-xl-12">
                      <img
                        id="imgcard"
                        src="${dataArray[i].album.cover_big}"
                        class="img-fluid rounded py-1 imgcard"
                        alt="Card Image"
                      />
                    </div>
                    <!-- Contenuto -->
                    <div class="col-8 col-sm-8 col-md-9 col-lg-9 col-xl-12">
                      <div class="card-body">
                      <a href="artist.html?id=${dataArray[1].artist.id}" class="text-white text-decoration-none fs-3">${dataArray[i].artist.name}</a>
                        <h5 id="titlecard" class="card-title"></h5>
                        <a href="album.html?id=${dataArray[i].album.id}" class="text-white text-decoration-none">${dataArray[i].album.title}</a>
                        <p class="card-text">
                          <small class="text-body-light"
                            >Last updated 3 mins ago</small
                          >
                        </p>
                      </div>
                    </div>
                    <div
                      class="d-flex justify-content-between align-items-baseline col-12 mt-2 collapse-at-400"
                    >
                      <div>
                        <img src="./Icon/icons8-mi-piace-32.png" alt="" />
                        <img src="./Icon/three-dots-vertical.svg" alt="" />
                      </div>
                      <div>
                        <p>16 Brani</p>
                      </div>
                    </div>
                  </div>`;
                  
        }

//-------------------codice cards interattive ------------------------------

        document.addEventListener("DOMContentLoaded", () => {
          // Riferimento all'immagine
          const imgCard = document.getElementById("imgcard");
          // Riferimento al titolo
          const titleCard = document.getElementById("titlecard");
        
          // Aggiungi l'evento click all'immagine
          imgCard.addEventListener("click", () => {
            window.location.href = "album.html"; // Sostituisci con la pagina desiderata
          });
        
          // Aggiungi l'evento click al titolo
          titleCard.addEventListener("click", () => {
            window.location.href = "artisti.html"; // Sostituisci con la pagina desiderata
          });
        });



        const albumUrl = "https://deezerdevs-deezer.p.rapidapi.com/album/"+ randomAlbumId;
        console.log(albumUrl)

        fetch(albumUrl, {
          headers: {
            'x-rapidapi-key': 'e4a6b96369msh024e416adbab052p1463e7jsn0462779a6da0',
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
          }
        })
        .then((response) => response.json())
        .then((album) => {
          console.log(album.tracks.data[1].id);


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
  const apiUrl = "https://deezerdevs-deezer.p.rapidapi.com/track/" +album.tracks.data[1].id ; 



  const params = new URLSearchParams(window.location.search);//mi serve per prendere l'id dell'oggetto dall'url

  const songId = params.get("id")

  //`${apiUrl}${songId}`

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


        })
        .catch((error) => console.error("Errore nel caricamento della canzone:", error));

        





      })
      .catch((error) => {
        // Gestione degli errori
        console.error('Errore durante il recupero dei dati:', error);
      });





    }
    
    




    window.onload = () => {
    getproduct();
};