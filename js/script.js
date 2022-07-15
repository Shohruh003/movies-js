
var elList = document.querySelector('.js-list');
var elBookmarkList = document.querySelector('.bookmarkList');
const elModal = document.querySelector(".modal");
const elOverlay = document.querySelector(".overlay");

const localFilms = JSON.parse(window.localStorage.getItem("bookmark"));

let bookmarkList = localFilms || [];

const filmsFragment = document.createDocumentFragment();


let dom = (array, node) => {
  array.forEach((film) => {

    let newItem = document.createElement('li');
    let newTitle = document.createElement('h3');
    let newPoster = document.createElement('img');
    let elBookmarkBtn = document.createElement('button');
    elBookmarkBtn.dataset.filmId = film.id;
    let elModalBtn = document.createElement('button');
    elModalBtn.dataset.filmId = film.id;

    newTitle.textContent = `${film.title}`;
    newPoster.src = `${film.poster}`;
    elBookmarkBtn.textContent = "Bookmark";
    elModalBtn.textContent = "Modal";

    newItem.classList.add('js-item');
    newTitle.classList.add('js-filmHeading');
    newPoster.classList.add('js-filmImg');
    elBookmarkBtn.classList.add('bookmarkBtn');
    elModalBtn.classList.add('modalBtn');

    newItem.appendChild(newPoster);
    newItem.appendChild(newTitle);
    newItem.appendChild(elBookmarkBtn);
    newItem.appendChild(elModalBtn);
    filmsFragment.appendChild(newItem);
  });
  node.appendChild(filmsFragment);
}

dom(films, elList);

const getMovies = (array,node) => {
  elBookmarkList.innerHTML = "";

  window.localStorage.setItem("bookmark", JSON.stringify(bookmarkList));
  array.forEach(e => {
    const newLi = document.createElement('li');
    const newBtn = document.createElement('button');

    newLi.textContent = e.title;
    newLi.setAttribute("class", "newLi");
    newBtn.textContent = "Delete";
    newBtn.setAttribute("class", "bookmarkDelete");
    newBtn.dataset.filmId = e.id; 

    newLi.appendChild(newBtn);
    node.appendChild(newLi);
  })
}; 

getMovies(bookmarkList, elBookmarkList)

elList.addEventListener("click", function(evt) {
  if(evt.target.matches(".bookmarkBtn")) {
    const lovelyFilm = evt.target.dataset.filmId;

    const findedFilm = films.find(e => e.id == lovelyFilm);

    if(!bookmarkList.includes(findedFilm)) {
      bookmarkList.push(findedFilm)
      getMovies(bookmarkList,elBookmarkList);
    }
    
  }

  if(evt.target.matches(".modalBtn")) {
    elModal.innerHTML = "";
    elModal.classList.add("open"); 
    elOverlay.classList.add("open");
    const findedFilm = evt.target.dataset.filmId;

    const findModalFilm = films.find(e => e.id == findedFilm);
     
    const btn = document.createElement("button");
    btn.setAttribute("class", "closeBtn")
    let poster = document.createElement('img');
    let title = document.createElement('h3');
    let spanId = document.createElement('span');
    let overview = document.createElement('p');
    let date = document.createElement('span');
    let genres = document.createElement('p');
  
    title.classList.add('filmHeading');
    poster.classList.add('filmImg');

    btn.textContent = "X";
    title.textContent = `${findModalFilm.title}`;
    spanId.textContent = "Film's id: " + `#${findModalFilm.id}`;
    poster.src = `${findModalFilm.poster}`;
    overview.textContent = `${findModalFilm.overview}`;
    date.textContent = "Release year: " + `${findModalFilm.release_date}`;
    genres.textContent = "Genres: " + `${findModalFilm.genres}`;

    elModal.appendChild(btn);
    elModal.appendChild(poster);
    elModal.appendChild(spanId);
    elModal.appendChild(title);
    elModal.appendChild(date);
    elModal.appendChild(overview);
    elModal.appendChild(genres);

  }
})

elBookmarkList.addEventListener("click", function(evt) {
  if(evt.target.matches(".bookmarkDelete")) {
    const filmId = evt.target.dataset.filmId;

    const findedFilm = films.findIndex (e => e.id == filmId);

    bookmarkList.splice(findedFilm,1);
    getMovies(bookmarkList,elBookmarkList)
  }
})

elModal.addEventListener("click", function(evt) {
  if(evt.target.matches(".closeBtn")) {
    elModal.classList.remove("open");
    elOverlay.classList.remove("open");
  }
})

elOverlay.addEventListener("click", function() {
  elOverlay.classList.remove("open");
  elModal.classList.remove("open");
})





















