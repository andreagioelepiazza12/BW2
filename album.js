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


      const tbody = document.getElementById("tbody")
        const trow = document.createElement("tr");

        trackList.forEach((song) => {
            const songId = document.createElement("td")
            const songTitle = document.createElement("td")
            const songRank = document.createElement("td")
            const songDuration = document.createElement("td")

            songId.innerHTML = song.id;
            songTitle.innerHTML = song.title;
            songRank.innerHTML = song.rank;

            songDuration.innerHTML = formatTime(song.duration);

            
            trow.appendChild(songId);
            trow.appendChild(songTitle);
            trow.appendChild(songRank);
            trow.appendChild(songDuration);
            tbody.appendChild(trow);
        })


        
    })
    .catch((err) => console.log(err));
}

loadDetails();
