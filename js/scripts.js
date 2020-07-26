/* The actual app:
  - Use the stylings added, but change at least one of color, background-color, box or text shadows,
    font.

  My additional thoughts:

*/


// Global variables:
let usersDisplayed = 12;
const randomUserPhotos = 95; // Correct at the time of writing!
const randomLegoPhotos = 9;  // Ditto!
const galleryDiv = document.getElementById('gallery');
const searchDiv = document.querySelector('.search-container');
const employeesToDisplay = [12,23,37,47,61];
let loadedEmployees = [];
let searchedEmployees = null;


const createOption = (parentElement,value) => {
  let option = document.createElement('option');
  option.value = value;
  option.text = value;
  option.id = `option-${value}`;
  parentElement.appendChild(option);
}

const createForm = () => {
  let form = document.createElement('form');
  let searchInput = document.createElement('input');
  let searchSubmit = document.createElement('input');
  let displayOptionsLabel = document.createElement('label');
  let displayOptions = document.createElement('select');
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
  displayOptionsLabel.setAttribute("for","select-number");
  displayOptionsLabel.textContent = "Employees per page";
  form.appendChild(displayOptionsLabel);
  displayOptions.setAttribute("name","select-number");
  displayOptions.setAttribute("id","select-number");
  
  employeesToDisplay.forEach(value => {
    createOption(displayOptions,value);
  })
  form.appendChild(displayOptions);
  searchDiv.appendChild(form);
  displayOptions.addEventListener('change',onDisplayOptions);
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

const getImageURL = (gender,employeeNumber) => {
  let factor = Math.floor(randomUserPhotos / usersDisplayed); 
  let photoNumber = employeeNumber * factor;
  let photoGender = '';
  if (gender === 'male') {
    photoGender = 'men';
  } else {
    photoGender = 'women';
  }
  if (photoNumber % 5 === 0) {
    photoGender = 'lego'; // I am soooooooo funny...
    photoNumber = Math.floor(Math.random() * randomLegoPhotos); 
  }
  let url = `https://randomuser.me/api/portraits/${photoGender}/${photoNumber}.jpg`;
  return url;
}

const formatEmployeeBirthday = (rawDate) => {
  const months = ["January","Feburary","March","April","May","June",
                  "July","August","September","October","November","December"
  ]
  let yyyy = rawDate.substring(0,4);
  let mm = parseInt(rawDate.substring(5,7)) - 1;
  let dd = rawDate.substring(8,10);
  let mmm = months[mm];
  let date = `${dd} ${mmm} ${yyyy}`;
  return date;
}

const formatEmployeeAddress = (rawAddress) => {
  let address = `
    ${rawAddress.street.number} ${rawAddress.street.name}, ${rawAddress.city},
     ${rawAddress.state}, ${rawAddress.postcode}
  `;
  return address;
}

// Turn this into an async/await function that calls data_getEmployees using ONLY the usersDisplayed
// variable; then does the createGalleryEntry() and finishGallery() for the results.
// For simplicity: ALL the async stuff lives in THIS file. The dataAccess file just has 
const newLoadEmployees = () => {
  data_getEmployees(usersDisplayed);

} 


const clearGallery = () => {
  loadedEmployees = [];
  const items = Array.from(galleryDiv.children);
  items.forEach(element => {
    element.parentNode.removeChild(element);
  })
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
  loadedEmployees.push(employee);
  const employeeIndex = loadedEmployees.length - 1;
  const id = employeeIndex.toString();
  const name = `${employee.name.first} ${employee.name.last}`;
  const nameH3 = `${employee.name.first}-${employee.name.last}`;
  const imageNumber = loadedEmployees.length;
  const image = getImageURL(employee.gender,imageNumber);
  employee.picture.large = image;
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
          <p class="card-text email">${email}</p>
          <p class="card-text cap">${location}</p>
      </div>
  `
  employeeDiv.innerHTML = html;
  galleryDiv.appendChild(employeeDiv);
  employeeDiv.addEventListener('click',function(event) {
    let modalArray;
    if (searchedEmployees) {
      modalArray = searchedEmployees;
    } else {
      modalArray = loadedEmployees;
    }
    let employeeIndex = Array.from(modalArray).indexOf(employee);
    createModal(modalArray,employeeIndex);
  })
}

const createModal = (array,index) => {
  if (document.querySelector('.modal-container')) {
    const existingModal = document.querySelector('.modal-container');
    existingModal.parentNode.removeChild(existingModal);
  }

  const employee = array[index];

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
  const birthday = formatEmployeeBirthday(employee.dob.date);
  const address = formatEmployeeAddress(employee.location);
  const html = `
    <img class="modal-img" src="${employee.picture.large}" alt="profile picture for ${name}">
    <h3 id="modal-${name}" class="modal-name cap">${name}</h3>
    <p class="modal-text">${employee.email}</p>
    <p class="modal-text">${employee.location.city}, ${employee.location.country}</p>
    <hr>
    <p class="modal-text">${employee.cell}</p>
    <p class="modal-text">${address}</p>
    <p class="modal-text">Birthday: ${birthday}</p>
  `;
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
      createModal(array,prevIndex);
    })
    modalButtonContainer.appendChild(backButton);
  }
  if (index < (array.length - 1)) {
    const forwardButton = document.createElement('button');
    forwardButton.setAttribute('type','button');
    forwardButton.setAttribute('id','modal-next');
    forwardButton.setAttribute('class','modal-next btn');
    forwardButton.textContent = 'Next';
    forwardButton.addEventListener('click',function() {
      const nextIndex = index + 1;
      createModal(array,nextIndex);
    })
    modalButtonContainer.appendChild(forwardButton);
  }

  modalContainer.appendChild(modal);
  modalContainer.appendChild(modalButtonContainer);
  document.body.appendChild(modalContainer);
}

const displayNoSearchResults = () => {
  const noResultsDiv = document.createElement('div');
  noResultsDiv.classList = 'gallery no-results';
  noResultsDiv.setAttribute('id','no-results');
  noResultsDiv.innerHTML = `<h3 class = "card-name">Sorry - no employee matched your search.</h3>`;
  galleryDiv.appendChild(noResultsDiv);
}

const removeNoSearchResults = () => {
  if (document.getElementById('no-results')) {
    const noResultsDiv = document.getElementById('no-results');
    noResultsDiv.parentNode.removeChild(noResultsDiv);
  }
}

/* 
    Event handlers
*/

const filterEmployees = (event) => {
  const searchButton = document.getElementById('submit');
  const searchInput = document.getElementById('search-input');
  event.preventDefault();
  removeNoSearchResults();
  if (searchButton.value === 'submit') {
    searchButton.value = 'display all';
    let excludedCards = Array.from(document.querySelectorAll('.card:not(.card-search-item)'));
    let searchItemCards = Array.from(document.querySelectorAll('.card-search-item'));
    excludedCards.forEach( card => card.style.display = 'none');
    searchItemCards.forEach( card => card.style.display = '');
    searchInput.disabled = true;
    searchedEmployeeElements = Array.from(document.querySelectorAll('.card-search-item'));
    searchedEmployees = [];
    searchedEmployeeElements.forEach( element => {
      const index = parseInt(element.dataset.index);
      searchedEmployees.push(loadedEmployees[index]);
    });
    if (searchedEmployees.length === 0) {
      displayNoSearchResults();
    }
  } else {
    searchButton.value = 'submit';
    let cards = Array.from(document.querySelectorAll('.card'));
      cards.forEach( card => {
        card.style.display = '';
        card.classList.remove('card-search-item');
        searchInput.value = '';
        searchInput.disabled = false;
    });
    searchedEmployees = null;
  }
}

const onSearchInput = (event) => {
  let inputSoFar = event.target.value;
  let allEmails = Array.from(document.querySelectorAll('.email'));
  if (inputSoFar === '') {
    allEmails.forEach( email => {
      const card = email.parentNode.parentNode;
      card.classList.remove('card-search-item');
    });
    return;
  }
  allEmails.forEach( email => {
    document.getElementById('submit').value = 'submit';
    const card = email.parentNode.parentNode;
    const alphaName = email.textContent.split("@")[0];
    if (alphaName.includes(inputSoFar)) {
      card.classList.add('card-search-item');
    } else {
      card.classList.remove('card-search-item');
    }
  })
}

const onDisplayOptions = (event) => {
  const number = parseInt(event.target.value);
  // Because of the Douglas Adams fun option, which has its own event handler, event.target.value may be NaN
  if (number) {
    usersDisplayed = number;
    clearGallery();
    loadEmployees();
    newLoadEmployees();
  } 
}

/*
    The app itself...
*/
createForm();
prepGallery();
loadEmployees();



