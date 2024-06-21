const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");

function requestApi(searchTerm) {
  fetch(`http://localhost:3000/artists`)
    .then((response) => response.json())
    .then((results) => {
      const filteredResults = results.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm)
      );
      displayResults(filteredResults);
    });
}

function displayResults(results) {
  hidePlaylists();
  clearResults();
  results.forEach((element) => {
    const artistCard = createArtistCard(element);
    resultArtist.appendChild(artistCard);
  });
  resultArtist.classList.remove("hidden");
}

function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

function clearResults() {
  resultArtist.innerHTML = '';
}

function createArtistCard(artist) {
  const artistCard = document.createElement('div');
  artistCard.classList.add('artist-card');

  const cardImg = document.createElement('div');
  cardImg.classList.add('card-img');

  const img = document.createElement('img');
  img.src = artist.urlImg;
  img.classList.add('artist-img');

  const play = document.createElement('div');
  play.classList.add('play');
  play.innerHTML = '<span class="bi bi-play-fill"></span>';
  play.addEventListener('click', () => {
    window.open(artist.spotifyUrl, '_blank');
  });

  cardImg.appendChild(img);
  cardImg.appendChild(play);

  const cardText = document.createElement('div');
  cardText.classList.add('card-text');

  const artistName = document.createElement('span');
  artistName.classList.add('artist-name');
  artistName.innerText = artist.name;

  const artistCategory = document.createElement('span');
  artistCategory.classList.add('artist-categorie');
  artistCategory.innerText = 'Artista';

  cardText.appendChild(artistName);
  cardText.appendChild(artistCategory);

  artistCard.appendChild(cardImg);
  artistCard.appendChild(cardText);

  return artistCard;
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }
  requestApi(searchTerm);
});