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


*/

// 


// Elements:
const usersDisplayed = 12;
const galleryDiv = document.getElementById('gallery');
const searchDiv = document.querySelector('.search-container');
const loadedUsers = [];


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

const finishGallery = () => {
  const loading = galleryDiv.getElementsByTagName('h2')[0];
  if (loading) {
    loading.parentNode.removeChild(loading);
  }
}

const loadEmployees= () => {
  const url = `https://randomuser.me/api/?results=${usersDisplayed}&exc=login&noinfo`;
  fetch(url)
    // .then(checkStatus) - do this later
    .then(response => response.json())
    .then(data => {
      let employees = data.results;
      employees.forEach(employee => {
        createGalleryEntry(employee);
      });
      finishGallery();
    })
}

const createGalleryEntry = (employee) => {
  loadedUsers.push(employee);
  const employeeIndex = loadedUsers.length - 1;
  const id = employeeIndex.toString();
  const name = `${employee.name.first} ${employee.name.last}`;
  const nameH3 = `${employee.name.first}-${employee.name.last}`;
  const image = employee.picture.large;
  const alt = `profile picture for ${name}`;
  const email = employee.email;
  const location = `${employee.location.city}, ${employee.location.country}`
  const employeeDiv = document.createElement('div');
  employeeDiv.setAttribute("class","card");
  employeeDiv.setAttribute("data-index",id);
  let html = `
      <div class="card-img-container">
          <img class="card-img" src="${image}" alt="${alt}">
      </div>
      <div class="card-info-container">
          <h3 id="${nameH3}" class="card-name cap">${name}</h3>
          <p class="card-text">${email}</p>
          <p class="card-text cap">${location}</p>
      </div>
  `
  employeeDiv.innerHTML = html;
  galleryDiv.appendChild(employeeDiv);
  employeeDiv.addEventListener('click',function(event) {
    createModal(employeeIndex);
  })
}

const createModal = (index) => {
  if (document.querySelector('.modal-container')) {
    const deid = document.querySelector('.modal-container');
    deid.parentNode.removeChild(deid);
  }

  const employee = loadedUsers[index];
  console.log(employee);

  const modalContainer = document.createElement('div');
  modalContainer.setAttribute('class','modal-container');
  const modal = document.createElement('div');
  modal.setAttribute('class','modal');

  const closeButton = document.createElement('button');
  closeButton.setAttribute('class','modal-close-btn');
  closeButton.setAttribute('id','modal-close-btn');
  closeButton.setAttribute('type','button');
  closeButton.innerHTML = `<strong>X</strong>`;
  closeButton.addEventListener('click',function() {
    modalContainer.parentNode.removeChild(modalContainer);
  })
  modal.appendChild(closeButton);

  const modalInfoContainer = document.createElement('div');
  modalInfoContainer.setAttribute('class','modal-info-container');
  const name = `${employee.name.first} ${employee.name.last}`;
  const html = `
    <img class="modal-img" src="${employee.picture.large}" alt="profile picture for ${name}">
    <h3 id="modal-${name}" class="modal-name cap">${name}</h3>
    <p class="modal-text">${employee.email}</p>
    <p class="modal-text">${employee.location.city}, ${employee.location.country}</p>
    <hr>
    <p class="modal-text">${employee.cell}</p>
    <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}</p>
    <p class="modal-text">Birthday: ${employee.dob.date}</p>
  `
// <div class="modal-container">
//     <div class="modal">
//         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//         <div class="modal-info-container">
//             <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
//             <h3 id="name" class="modal-name cap">name</h3>
//             <p class="modal-text">email</p>
//             <p class="modal-text cap">city</p>
//             <hr>
//             <p class="modal-text">(555) 555-5555</p>
//             <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
//             <p class="modal-text">Birthday: 10/21/2015</p>
//         </div>
//     </div>

//     // IMPORTANT: Below is only for exceeds tasks 
//     <div class="modal-btn-container">
//         <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
//         <button type="button" id="modal-next" class="modal-next btn">Next</button>
//     </div>
// </div>
  modalInfoContainer.innerHTML = html;
  modal.appendChild(modalInfoContainer);

  const modalButtonContainer = document.createElement('div');
  modalButtonContainer.setAttribute('class','modal-btn-container');
  if (index > 0) {
    const backButton = document.createElement('button');
    backButton.setAttribute('type','button');
    backButton.setAttribute('id','modal-prev');
    backButton.setAttribute('class','modal-prev btn');
    backButton.textContent = 'Prev';
    backButton.addEventListener('click',function() {
      const prevIndex = index - 1;
      createModal(prevIndex);
    })
    modalButtonContainer.appendChild(backButton);
  }
  if (index < (usersDisplayed - 1)) {
    const forwardButton = document.createElement('button');
    forwardButton.setAttribute('type','button');
    forwardButton.setAttribute('id','modal-next');
    forwardButton.setAttribute('class','modal-next btn');
    forwardButton.textContent = 'Next';
    forwardButton.addEventListener('click',function() {
      const nextIndex = index + 1;
      createModal(nextIndex);
    })
    modalButtonContainer.appendChild(forwardButton);
  }

  modalContainer.appendChild(modal);
  modalContainer.appendChild(modalButtonContainer);
  document.body.appendChild(modalContainer);
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



