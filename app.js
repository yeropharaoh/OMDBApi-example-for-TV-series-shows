// https://www.omdbapi.com/?t=Game%20of%20Thrones&Season=1&Episode=1&apikey=a7925776

const seriesDetails = document.getElementById('series-details');
const seasonInfo = document.getElementById("season-info");

const apiKey = 'a7925776';     
const baseURL = `https://www.omdbapi.com/?apikey=${apiKey}`; 
const title = 'Our Flag Means Death';

function getTitle(title) {
  fetchTitleDetails(title)
      .then(res => {
        displaySeriesDetails(res);
        getAllEpisodes(title, res.totalSeasons);
    })
}

function fetchTitleDetails(title, season) {
    let fetchUrl = `${baseURL}&t=${title}`;
    if (season) {
        fetchUrl += `&Season=${season}`;
    }
    return fetch(fetchUrl).then(response => response.json());
}

async function getAllEpisodes(title, totalSeasons) {
    let allEpisodes = [];
    for (let i = 1; i <= totalSeasons; i++) {
        const s = await fetchTitleDetails(title, i)
            .then(res => {
                const season = {};
                return season['Season ' + res.Season] = res.Episodes;
            });
            
        allEpisodes.push(s);
    }

    allEpisodes.forEach((season,i)  => {
        seasonInfo.insertAdjacentHTML('beforeend', `
          <h1 class="season-no"><b>Season: ${i+1}</b> </h1>
      `);      
      season.forEach(episode => {
        seasonInfo.insertAdjacentHTML('beforeend', `
            <div class = "episode-info each-season">
              <h3 class="episode"><b>Episode: </b> ${episode.Episode}</h3>
              <p class = "episode-title"><b>Title: </b> ${episode.Title}</p>
              <p class = "released"><b>Released: </b> ${episode.Released}</p>
              <p class = "ep-imdb-rating"><b>IMDB Rating: </b> ${episode.imdbRating}</p>
            </div>
        </div>
      `);
      });
    });
}

function displaySeriesDetails(data) {
      seriesDetails.insertAdjacentHTML('beforeend',`
        <div class = "left-side-info">
          <!-- left aligned -->
          <h2 class = "title">${data.Title}</h2>
          <div class = "series-poster">
              <img src = "${(data.Poster != "N/A") ? data.Poster : "image_not_found.png"}" alt = "series poster">
          </div>
          <ul class = "series-misc-info">
              <li class = "year"><b>Year:</b> ${data.Year}</li>
              <li class = "rated"><b>Rating:</b> ${data.Rated}</li>
              <li class = "released"><b>Air Date:</b> ${data.Released}</li>
          </ul>
        </div>
          <!-- right aligned -->
        <div class="right-side-info">
          <p class = "genre"><b>Genre:</b> ${data.Genre}</p>
          <p class = "writer"><b>Writers:</b> ${data.Writer}</p>
          <p class = "cast"><b>Cast:</b> ${data.Actors}</p>
          <p class = "plot"><b>Plot:</b> ${data.Plot}</p>
          <p class = "awards"><b>Awards:</b> ${data.Awards}</p>
        </div>
      `);
}

getTitle(title);