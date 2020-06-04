/* The actual app:
  - Get 12 random employees, in a way that refreshes every time you redisplay the page. All 12 must 
    come in a single request.
  - Display them in the way shown.
  - Add a search feature that filters the names. I'm going to go with: do this on the api itself, and
    look for names on the site. There's not much value in filtering a small number of names that are
    already all in your field of view.
  - Dynamically add a modal window, launched when you click on an employee, that displays a load more
    info. It also has a forward and back button to cycle through the employees, that handles the end
    of the list explicitly. It's also closeable.
  - Use the stylings added, but change at least one of color, background-color, box or text shadows,
    font.

  My additional thoughts:
  - It may be possible to get code from my own api on heroku or something like that
  - Douglas Adams button: probably, do the random name thing.
  - Do this as a learning exercise: that is, do it via xmlHTTPrequest, AJAX, Promise, and/or fetch()


Files: 
  - app.js, with the main app in it.
  - dataAccess.js, with the data array in it and the functions that set up the users from the api
  - app.js that has everything else.
*/

// 


// Elements:
const usersDisplayed = 12;
const galleryDiv = document.getElementById('gallery');
const searchDiv = document.querySelector('.search-container');


const createSearch = () => {
  let form = document.createElement('form');
  let searchInput = document.createElement('input');
  let searchSubmit = document.createElement('input');
  searchInput.setAttribute("type","search");
  searchInput.setAttribute("id","search-input");
  searchInput.setAttribute("class","search-input");
  searchInput.setAttribute("placeholder","Search...");
  form.appendChild(searchInput);
  searchSubmit.setAttribute("type","submit");
  searchSubmit.setAttribute("value","submit");
  searchSubmit.setAttribute("id","submit");
  searchSubmit.setAttribute("class","submit");
  form.appendChild(searchSubmit);
  searchDiv.appendChild(form);
  searchInput.addEventListener('input',onSearchInput);
  form.addEventListener('submit',filterEmployees);
}

const prepGallery = () => {
  const loading = document.createElement('h2');
  loading.textContent = "Loading employee details...";
  galleryDiv.innerHTML = '';
  galleryDiv.appendChild(loading);
}

const loadEmployees= () => {
  // set prepGallery
  // call the dataAccess function
  // when it's finished, either populate the gallery or 
}

const createGallery = () => {
// This creates twelve placeholders. Question: what do we do when the page loads?
// Add all these placeholders and then overwrite them, or leave them blank until the
// request comes back? What if the request doesn't come back?
// We have to create a unique id for each h3 element.
// So: this firstly sets up a placeholder value
  let html = `
  <div class="card">
      <div class="card-img-container">
          <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">first last</h3>
          <p class="card-text">email</p>
          <p class="card-text cap">city, state</p>
      </div>
  </div>
  `
  for (let i=1; i<=usersDisplayed; i++) {
    galleryDiv.innerHTML += html;
  }
}

const createModal = () => {
// If there's nae response fae random api, there's nae modal either.
  console.log("creating the modal...");
}

/* 
    Event handlers
*/

const filterEmployees = () => {
  console.log("In the filterEmployees function");
}

const onSearchInput = (event) => {
  console.log(event.target.value);
}

/*
    The app itself...
*/
createSearch();
prepGallery();
loadEmployees()
// createGallery();



