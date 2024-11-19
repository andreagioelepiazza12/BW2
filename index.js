const url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=fabri%20fibra'

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
    })





    .catch((error) => {
        console.log(error);
    });

}

window.onload = () => {
    homePage();
};

