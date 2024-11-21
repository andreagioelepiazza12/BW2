

const url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=fabri%20fibra'


let currentArtistId = "";

const homePage = function () {
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

    .then((data)=> {
        const imgBanner =document.getElementById("imgAlbum")
        imgBanner.src= data.data[0].album.cover_big
        const h1Banner=document.getElementById("h1banner")
        h1Banner.innerText= data.data[0].album.title
        const artistbanner =document.getElementById("artistbanner")
        artistbanner.innerText= data.data[0].artist.name
        

        currentAlbumId = data.data[0].album.id;

        console.log(currentAlbumId)

       


// URL API per ottenere informazioni sulla canzone

const apiUrlAlbum = "https://deezerdevs-deezer.p.rapidapi.com/album/";
const apiUrlSong = "https://deezerdevs-deezer.p.rapidapi.com/track/";



// Funzione per caricare i dati della canzone

document.getElementById("playButton").addEventListener("click", () => {

    fetch(`${apiUrlAlbum}${currentAlbumId}`, {
    headers: {
		'x-rapidapi-key': 'afa581262bmsh759f16f17696ca1p195c63jsn334671c1c2a8',
		'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
	}
})
.then((response) => response.json())
.then((album) => {
    const songId = album.tracks.data[0].id;

    fetch(`${apiUrlSong}${songId}`, {
        headers: {
            'x-rapidapi-key': 'e4a6b96369msh024e416adbab052p1463e7jsn0462779a6da0',
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    })
    .then((response) => response.json())
    .then((song) => {

        const imgAlbumSoundBar = document.getElementById("imgAlbumSoundBar");
        const title = document.getElementById("title");
        const artist = document.getElementById("artist");
        const currentSongTime = document.getElementById("currentSongTime");
        const totalSongTime = document.getElementById("totalSongTime");
        const progressBar = document.querySelector(".progress-bar .progress");
        const playPauseButton = document.querySelector(".play-pause");
        const volumeBar = document.querySelector(".volume-bar .progress");
        const audio = new Audio(); // Audio player dinamico


        function loadSong() {
    
            // Popola i dettagli della canzone
            imgAlbumSoundBar.src = song.album.cover_small;
            title.textContent = song.title;
            artist.textContent = song.artist.name;

            // Imposta la sorgente dell'audio
            audio.src = song.preview;
            audio.addEventListener("loadedmetadata", () => {
                totalSongTime.textContent = formatTime(audio.duration);
            });
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

    
});



    })

})
    .catch((error) => {
        console.log(error);
    });



//------------------------ funzione per far partire la musica-----------------

}



window.onload = () => {
    homePage();
};







/*

//----funzione per la barra di ricerca------

// Seleziona la barra di ricerca
const searchInput = document.getElementById("search-input");

// Evento per mostrare/nascondere la barra di ricerca
document.querySelector(".search-trigger").addEventListener("click", function (e) {
    e.preventDefault();
    const searchBar = document.querySelector(".search-bar");
    searchBar.style.display = searchBar.style.display === "none" ? "block" : "none";
    if (searchBar.style.display === "block") {
        searchInput.focus(); // Porta il focus sull'input
    }
});

// Evento per avviare la ricerca quando si preme Enter


searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { // Verifica se il tasto premuto è Enter
        const query = searchInput.value.trim(); // Ottieni il valore dell'input
        if (query) {
            console.log("Sto cercando:", query); // Sostituisci con la tua logica di ricerca
            // Puoi fare una chiamata a un server o aggiornare l'interfaccia
            alert(`Ricerca avviata per: ${query}`);
            searchInput.value = ''; // Svuota il campo di input
        } else {
            alert("Inserisci un parametro di ricerca.");
        }
    }
});

*/


