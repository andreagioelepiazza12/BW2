const url = 'https://deezerdevs-deezer.p.rapidapi.com/artist/'
const params = new URLSearchParams (window.location.search) 
const artistId= params.get("id")

const getproduct = function () {
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/artist/${id}`{
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
        
    
        // Recuperail cantante casuale
        const randomalbum = dataArray[randomIndex];
        // Mostra il cantante casuale
        console.log('Cantante casuale:', randomalbum);
        const imgBanner =document.getElementById("first-l")
        imgBanner.style.backgroundImage = data.picture_big
        const h1Banner=document.getElementById("Nome-art")
        h1Banner.innerText= data.name
        
        
      })
      .catch((error) => {
        // Gestione degli errori
        console.error('Errore durante il recupero dei dati:', error);
      });

    }
    
    




    window.onload = () => {
    getproduct();
};




