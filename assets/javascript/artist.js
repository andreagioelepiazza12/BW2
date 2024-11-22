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
        console.log(dataArray[1].album)
        // Genera un indice casuale
        const randomIndex = Math.floor(Math.random() * dataArray.length);
        // Recupera il cantante casuale
        const randomalbum = dataArray[randomIndex];
        // Mostra il cantante casuale
        console.log('Cantante casuale:', randomalbum);
        const imgBanner =document.getElementById("first-l")
        imgBanner.style.backgroundImage = dataArray[1].album.cover
        const h1Banner=document.getElementById("Nome-art")
        h1Banner.innerText= dataArray[0].artist.name
        
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
                        <h5 id="titlecard" class="card-title">${dataArray[i].artist.name}</h5>
                        <p id="artistcard" class="card-text">${dataArray[i].album.title}</p>
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
      })
      .catch((error) => {
        // Gestione degli errori
        console.error('Errore durante il recupero dei dati:', error);
      });

    }
    
    




    window.onload = () => {
    getproduct();
};




