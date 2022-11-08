"use ctrict";

movies.splice(500);

const AllMovies = movies.map((movies) => {
  return {
    nomi: movies.title,
    yili: movies.year,
    toifasi: movies.categories,
    ID: movies.imdbId,
    reting: movies.imdbRating,
    vaqti: `${Math.floor(movies.runtime / 60)}h , ${movies.runtime % 60}m`,
    tili: movies.language,
    link: `https://www.youtube.com/embed/${movies.youtubeId}`,
    minimg: movies.smallThumbnail,
    maximg: movies.bigThumbnail,
    summary: movies.summary,
  };
});

function renderAllMovies() {
  AllMovies.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("card", "p-2","m-2",  "shadow-lg");
    card.innerHTML = `
    <img
    class="card__img"
    src="${element.minimg}"
    alt="img"
  />
  <h4 class="card__title">${element.nomi}</h4>


  <ul class="list-unstyled">
    <li><strong>Year:${element.yili}</strong></li>
    <li><strong>Language:${element.tili}</strong></li>
    <li><strong>Cotigory:${element.toifasi}</strong></li>
    <li><strong>ID:${element.ID}</strong></li>
    <li><strong>Reting:${element.reting}</strong></li>
    <li><strong>Runtime:${element.vaqti}</strong></li>
    <li>Summary:${element.summary}</li>
    <li>
      <strong><a href="${element.link}">Youtobe</a></strong>
    </li>
  </ul>


  <div class="d-flex gap-2">
    <button class="btn btn-success">Treyler</button>
    <button class="btn btn-dark">Read more</button>
    <button class="btn btn-danger">Add bookmar</button>
  </div>
      `;
    $(".wrapper").appendChild(card);
  });
}
renderAllMovies();
