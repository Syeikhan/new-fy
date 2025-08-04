const searchBox = document.getElementById("searchBox");
const results = document.getElementById("results");
const recommendations = document.getElementById("recommendations");
const topID = document.getElementById("topID");

const genres = ["lofi", "pop", "dangdut", "jazz", "rock"];

searchBox.addEventListener("input", () => {
  const query = searchBox.value.trim();
  if (query.length < 3) return;
  results.innerHTML = "<p>Loading...</p>";
  fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&limit=10`)
    .then(res => res.json())
    .then(data => {
      results.innerHTML = "";
      displaySongs(data.results, results);
    })
    .catch(() => {
      results.innerHTML = "<p>Gagal memuat hasil.</p>";
    });
});

function displaySongs(songs, container) {
  songs.forEach(track => {
    const song = document.createElement("div");
    song.className = "song";
    song.innerHTML = `
      <img src="${track.artworkUrl100.replace("100x100", "300x300")}" alt="Artwork" />
      <h3>${track.trackName}</h3>
      <p>${track.artistName}</p>
      <audio class="audio-player" controls src="${track.previewUrl}"></audio>
      <a class="download" href="${track.previewUrl}" download>Download</a>
    `;
    container.appendChild(song);
  });
}

function loadRecommendations() {
  genres.forEach(genre => {
    fetch(`https://itunes.apple.com/search?term=${genre}&limit=2`)
      .then(res => res.json())
      .then(data => displaySongs(data.results, recommendations));
  });
}

function loadTopIndonesia() {
  fetch("https://itunes.apple.com/search?term=indonesia&limit=6")
    .then(res => res.json())
    .then(data => displaySongs(data.results, topID));
}

loadRecommendations();
loadTopIndonesia();
