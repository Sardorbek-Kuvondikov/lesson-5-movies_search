// movies render qilish ul
const elMovieResult = document.querySelector(".js-movies-item");
const elModalBtn = document.querySelector(".js-modal-btn");
const elModalClose = document.querySelector(".js-modal-close");
const elMovieTemplate = document.querySelector(".js-movies-template").content;

const moviesSlice = movies.slice(0, 50);

// hour minut
function hourToMinut(runtime) {
  const hour = Math.floor(Number(runtime / 60));
  const minuts = Number(runtime % 60);
  return `${hour} hur ${minuts} min`;
}

// movies datani dom ga render qilish
function moviesRender(array, node) {
  node.innerHTML = "";
  const docFrg = new DocumentFragment();
  array.forEach((movie) => {
    const moviesClone = elMovieTemplate.cloneNode(true);

    moviesClone.querySelector(
      ".js-movies-img"
    ).src = `https://img.youtube.com/vi/${movie.ytid}/0.jpg`;
    moviesClone.querySelector(".js-movies-title").textContent =
      movie.Title.toString().slice(0, 20);
    moviesClone.querySelector(".js-movies-rountime").textContent =
      movie.imdb_rating;
    moviesClone.querySelector(".js-movies-year").textContent = movie.movie_year;
    moviesClone.querySelector(".js-movies-hour").textContent = hourToMinut(
      movie.runtime
    );
    moviesClone.querySelector(".js-movies-categories").textContent =
      movie.Categories.replaceAll("|", ", ").split(" ").slice(0, 3).join(" ");
    // modal imdb_id
    moviesClone.querySelector(".js-movies-modal-btn").dataset.modalIndex =
      movie.imdb_id;

    docFrg.appendChild(moviesClone);
  });
  node.appendChild(docFrg);
}

moviesRender(moviesSlice, elMovieResult);
// modal button

elMovieResult.addEventListener("click", function (evt) {
  evt.preventDefault();
  const evtTarget = evt.target;
  if (evtTarget.matches(".js-movies-modal-btn")) {
    const modalId = evtTarget.dataset.modalIndex;
    const modallFind = movies.find((item) => item.imdb_id == modalId);
    elModalBtn.querySelector(
      ".js-moda-video"
    ).src = `https://www.youtube-nocookie.com/embed/${modallFind.ytid}`;
    elModalBtn.querySelector(".js-modal-title").textContent = modallFind.Title;
    elModalBtn.querySelector(".js-modal-runtime").textContent =
      modallFind.imdb_rating;
    elModalBtn.querySelector(".js-modal-year").textContent =
      modallFind.movie_year;
    elModalBtn.querySelector(".js-modal-hour").textContent = `${Math.round(
      modallFind.runtime / 60
    )} hour ${modallFind.runtime % 60} min`;
    elModalBtn.querySelector(".js-modal-catigory").textContent =
      modallFind.Categories.replaceAll("|", ", ");
    elModalBtn.querySelector(".js-modal-summary").textContent =
      modallFind.summary.split(" ").length > 80
        ? `${modallFind.summary
            .split(" ")
            .slice(0, 80)
            .join(" ")} Lear More ...`
        : modallFind.summary;
    elModalBtn.querySelector(
      ".link"
    ).href = `https://www.imdb.com/title/${modallFind.imdb_id}/`;
    console.log(elModalBtn);

    elModalBtn.style.display = "block";
  }
});

// modal none bolish formulasi
elModalBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (evt.target.matches(".js-modal-control")) {
    elModalBtn.style.display = "none";
  }
});

// search function
const elForm = document.querySelector(".js-movies-form");
const elInput = elForm.querySelector(".js-movies-input");
const elMoviesNotFount = document.querySelector(".js-movies-not-fount");
const elMoviesNotFound = document.querySelector(".js-not-found");

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const searchInpValue = elInput.value.trim();
  const regExp = new RegExp(searchInpValue, "gi");

  const moviesSearch = movies.filter((item) => {
    return item.Title.toString().match(regExp);
  });
  if (moviesSearch.length > 0) {
    moviesRender(moviesSearch, elMovieResult);
    elMoviesNotFound.classList.add("hidden");
  } else {
    elMovieResult.innerHTML = "";
    elInput.value = "";
    elMoviesNotFound.classList.remove("hidden");
    console.log("Film topilmadi!!!");
  }
});
