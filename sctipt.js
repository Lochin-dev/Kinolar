"use ctrict";

movies.splice(50);

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
    card.classList.add("card", "p-2", "m-2", "shadow-lg");
    card.innerHTML = `<img
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

// --------------------------- FIND FILMS FANCTIONS ---------------

const findFilm = (regexp, reting) => {
  console.log(regexp);
  return AllMovies.filter((film) => {
    return film.nomi.match(regexp) && film.reting>=reting
  });
};

// --------------------------- FIND FILMS FANCTIONS END ---------------

// --------------------------- FIND FILMS LISTENER ---------------

$("#submitForm").addEventListener("submit", () => {
  $(".wrapper").innerHTML = `<span class="loader"></span>`;
  const serchValue = $("#filmName").value;
  const filmReting=$('#filmReting').value;
  const regexp = new RegExp(serchValue, "gi");
  const serchResult = findFilm(regexp, filmReting);
  setTimeout(() => {
    if (serchResult.length > 0) {
      serchResultsRender(serchResult);
      $(
        "#res"
      ).innerHTML = `<strong> ${serchResult.length} </strong> ta ma'lumot topildi`;
      $("#card-res").style.display = "block";
      $("#card-res").classList.remove("d-none");

      if (serchValue.length === 0) {
        $("#card-res").classList.add("d-none");
      }
    } else {
      $("#card-res").style.display = "none";
      $(
        ".wrapper"
      ).innerHTML = `<h2 class='text-danger'>MA'LUMOT TOPILMADI</h2>`;
    }
  }, 2000);
});

function serchResultsRender(data = []) {
  $(".wrapper").innerHTML = "";

  data.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("card", "p-2", "m-2", "shadow-lg");
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

















