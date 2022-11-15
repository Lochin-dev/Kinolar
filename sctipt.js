"use ctrict";

movies.splice(50);

const AllMovies = movies.map((movies) => {
  return {
    nomi: movies.title,
    yili: movies.year,
    category: movies.categories,
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
    <li><strong>Cotigory:${element.category}</strong></li>
    <li><strong>ID:${element.ID}</strong></li>
    <li><strong>Reting:${element.reting}</strong></li>
    <li><strong>Runtime:${element.vaqti}</strong></li>
  </ul>
  <div class="d-flex gap-2">
  <a target="blank" href="${element.link}" class="btn btn-success">Treyler</a>
    <button class="btn btn-dark  " data-read="${element.ID}">Read more</button>
    <button class="btn btn-danger" data-read="${element.summary}">Add bookmar</button>
  </div>
      `;
    $(".wrapper").appendChild(card);
  });
}
renderAllMovies();

// ============================DINAMIC CATEGORIES========================

const dynamicCategory = () => {
  let category = [];

  AllMovies.forEach((e) => {
    e.category.forEach((el) => {
      if (!category.includes(el)) {
        category.push(el);
      }
    });
  });

  category.sort();
  category.unshift("All");

  category.forEach((el) => {
    const option = createElement("option", "item-option", el);
    $("#category").appendChild(option);
  });
};
dynamicCategory();

// ----------------------------DYNAMIK CATEGORY END--------------------------

// --------------------------- FIND FILMS FANCTIONS ---------------

const findFilm = (regexp, reting = 0, category) => {
  if (category === "All") {
    return AllMovies.filter((film) => {
      return film.nomi.match(regexp) && film.reting >= reting;
    });
  }
  return AllMovies.filter((film) => {
    return (
      film.nomi.match(regexp) &&
      film.reting >= reting &&
      film.category.includes(category)
    );
  });
};

// --------------------------- FIND FILMS FANCTIONS END ---------------

// --------------------------- FIND FILMS LISTENER ---------------

$("#submitForm").addEventListener("submit", () => {
  $(".wrapper").innerHTML = `<span class="loader"></span>`;
  const serchValue = $("#filmName").value;
  const filmReting = $("#filmReting").value;
  const filmCategory = $("#category").value;
  const regexp = new RegExp(serchValue, "gi");
  const serchResult = findFilm(regexp, filmReting, filmCategory);
  setTimeout(() => {
    if (serchResult.length > 0) {
      serchResultsRender(serchResult);
      $(
        "#res"
      ).innerHTML = `<strong> ${serchResult.length} </strong> ta ma'lumot topildi`;
      $("#card-res").style.display = "block";
      $("#card-res").classList.remove("d-none");
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
    <li><strong>Cotigory:${element.category}</strong></li>
    <li><strong>ID:${element.ID}</strong></li>
    <li><strong>Reting:${element.reting}</strong></li>
    <li><strong>Runtime:${element.vaqti}</strong></li>
  </ul>
  <div class="d-flex gap-2">
  <a target="blank" href="${element.link}" class="btn btn-success">Treyler</a>
    <button class="btn btn-dark  " data-read="${element.ID}">Read more</button>
    <button class="btn btn-danger" data-read="${element.summary}">Add bookmar</button>
  </div>
      `;
    $(".wrapper").appendChild(card);
  });
}

//====================== SHOW MODAL===========================

$(".wrapper").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-dark")) {
    console.log(e.target);
    const idMovie = e.target.getAttribute("data-read");
    showModal(idMovie);
    $(".modal-window").classList.remove("modal-hide");
  }
});

function showModal(ID) {
  const filmItem = AllMovies.filter((e) => {
    return e.ID === ID;
  });

  filmItem.forEach((e) => {
    const row = createElement(
      "div",
      "row",
      `
  
    <div class="col-md-4">
                  <img
                    src="${e.minimg}"
                    alt="cover"
                    class="img-fluid"
                  />
                </div>
                <div class="col-md-6">
                  <h4 class="text-primary">${e.nomi}</h4>
                  <ul class="list-group">
                    <li class="list-group-item">Reting:${e.reting}</li>
                    <li class="list-group-item">Year:${e.yili}</li>
                    <li class="list-group-item">Language:${e.yili}</li>
                    <li class="list-group-item">Cotigory:${e.category}</li>
                    <li class="list-group-item">Runtime:${e.vaqti}</li>
                  </ul>
                </div>
                <div class="col-md-12">
                  <h4 class="text-dark">${e.nomi}</h4>
                  <p class="text-muted">
                  ${e.summary}
                  </p>
                </div>
  
  `
    );
    $('.modal-content').appendChild(row)
  });

  $("#close").addEventListener("click", () => {
    $(".modal-window").classList.add("modal-hide");
    $('.modal-content').innerHTML="";
  });
}


window.addEventListener('click', (e)=>{
if(e.target.classList.contains('modal-window')){
  $('#close').classList.toggle('animete');
}
})
