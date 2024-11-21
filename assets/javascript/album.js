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
        // Genera un indice casuale
        const randomIndex = Math.floor(Math.random() * dataArray.length);
        // Recupera il cantante casuale
        const randomalbum = dataArray[randomIndex];
        // Mostra il cantante casuale
        console.log('Cantante casuale:', randomalbum);
        const imgBanner =document.getElementById("imgAlbum")
        imgBanner.src= randomalbum.album.cover_big
        const h1Banner=document.getElementById("h1banner")
        h1Banner.innerText= randomalbum.album.title
      })
      .catch((error) => {
        // Gestione degli errori
        console.error('Errore durante il recupero dei dati:', error);
      });

    }
    
    




    window.onload = () => {
    getproduct();
};



