

// Global variables:
let usersDisplayed = 12;
const randomUserPhotos = 95; // Correct at the time of writing!
const randomLegoPhotos = 9;  // Ditto!
const galleryDiv = document.getElementById('gallery');
const searchDiv = document.querySelector('.search-container');
const employeesToDisplay = [12,23,37,47,61]; // Default of 12, plus four nice prime numbers.
let loadedEmployees = [];
let searchedEmployees = null;

/**************************************************************************************
* createOption: Creates and appends a select-list option, and appends it to the list.
*               Have you ever noticed that these select lists, whilst common on many
*               websites, never allow you to display a prime number of entries? Are
*               you frustrated with this? I'm here to help!
* @params: parentElement: select list element
*          value: string or integer
***************************************************************************************/
const createOption = (parentElement,value) => {
  let option = document.createElement('option');
  option.value = value;
  option.text = value;
  option.id = `option-${value}`;
  parentElement.appendChild(option);
}

/**************************************************************************************
* createForm: Creates and appends the form element containing the search function and
*             the items-per-page select list.
*             The select list isn't part of the rubric, but I wanted to add one as it
*             would be normal to see it on a site like this. Also, it contains the 
*             Douglas-Adams-themed easter egg.
***************************************************************************************/
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
  searchSubmit.setAttribute("class","search-submit");
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
  displayOptions.addEventListener('change',onDisplayOptions);
  searchInput.addEventListener('input',onSearchInput);
  form.addEventListener('submit',filterEmployees);
  searchDiv.appendChild(form);
  document.body.insertBefore(searchDiv,galleryDiv);
}

/**************************************************************************************
* clearGallery: Empties all the card elements from the gallery. Could maybe just set
*               its .innerHTML to '', but that always feels a bit... shallow.
***************************************************************************************/
const clearGallery = () => {
  loadedEmployees = [];
  const items = Array.from(galleryDiv.children);
  items.forEach(element => {
    element.parentNode.removeChild(element);
  })
}

/**************************************************************************************
* clearSearch: Re-sets the search (the input field itself, AND the searchedEmployees
*              array used for processing a search)
***************************************************************************************/
const clearSearch = () => {
  searchInput = document.getElementById('search-input');
  searchButton = document.getElementById('submit');
  searchInput.setAttribute("placeholder","Search...");
  searchInput.value = "";
  searchInput.disabled = false;
  searchButton.value = "Search";
  searchedEmployees = null;
}

/**************************************************************************************
* prepGallery: Clears the gallery div of content prior to a page-refresh or the loading
*              of a new set of employees, and sets placeholder content pending the 
*              completion of async load operation(s).
***************************************************************************************/
const prepGallery = () => {
  const loading = document.createElement('h2');
  loading.textContent = "Loading employee details...";
  galleryDiv.innerHTML = '';
  galleryDiv.appendChild(loading);
  document.getElementsByTagName('H1')[0].textContent = "AWESOME STARTUP EMPLOYEE DIRECTORY";
}

/**************************************************************************************
* finishGallery: Removes temporary content (that's displayed while async load operations
                 are running) from the gallery div
***************************************************************************************/
const finishGallery = () => {
  const loading = galleryDiv.getElementsByTagName('h2')[0];
  if (loading) {
    loading.parentNode.removeChild(loading);
  }
}

/**************************************************************************************
* getImageURL: There's no actual need for this function! I could just use the random
*              portrait url supplied in each randomuser employee. BUT, probability
*              being what it is, you keep finding that - even with as few as 12
*              employees - the same photo is appended to two different employees on the
*              same screen. It's a bit like the well-known fact that in a group of as
*              few as 24 people, the chances are better than 50% that two of them will
*              share the same birthday.
*              This was kind of bugging me. So I added this function to make sure that
*              all the images are different. Just a bit of fun.
* @params: gender - string, either 'male' or 'female'
*          employeeNumber - integer, signifying number of employees to display
* @return: url (specific to randomuser.me).
***************************************************************************************/
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
    photoGender = 'lego'; // Come on; EVERYONE loves Lego people!
    photoNumber = Math.floor(Math.random() * randomLegoPhotos); 
  }
  let url = `https://randomuser.me/api/portraits/${photoGender}/${photoNumber}.jpg`;
  return url;
}

/**************************************************************************************
* formatEmployeeBirthday: I hope this name is self-explanatory.
* @params: String, containing date in the form yyyy-mm-ddThh:mm:ss.123Z
* @return: String, containing date in the form dd mmm yyyy. This format is deliberately
*          chosen to remove possible ambiguity between US and RestOfWorld format. I.e.,
*          is 02 04 1980 the second of April, or the fourth of February? 
***************************************************************************************/
const formatEmployeeBirthday = (rawDate) => {
  const months = ["January","Feburary","March","April","May","June",
                  "July","August","September","October","November","December"
  ]
  let yyyy = rawDate.substring(0,4);
  let mm = parseInt(rawDate.substring(5,7)) - 1;
  let dd = rawDate.substring(8,10);
  let mmm = months[mm];
  let formattedDate = `${dd} ${mmm} ${yyyy}`;
  return formattedDate;
}

/**************************************************************************************
* formatEmployeeAddress: I hope this name is self-explanatory.
* @params: json object, containing unformatted address   
* @return: String, containing formatted address
***************************************************************************************/
const formatEmployeeAddress = (rawAddress) => {
  let address = `
    ${rawAddress.street.number} ${rawAddress.street.name}, ${rawAddress.city},
     ${rawAddress.state}, ${rawAddress.postcode}
  `;
  return address;
}


/**************************************************************************************
* createErrorMessage: 
* @params: error object
***************************************************************************************/
const createErrorMessage = (error) => {
  clearGallery();
  const errorHeading = document.createElement('H2');
  const errorLament = document.createElement('H1');
  errorHeading.textContent = `Aaaargh! ${error.message}`;
  errorLament.innerHTML = `Did you see that??? '<em>${error.message}</em>' ???
                             We're doomed! DOOMED, I TELL YOU !!!`;
                             // OK; but I gotta be me.
  galleryDiv.appendChild(errorHeading);
  galleryDiv.appendChild(errorLament);
}

/**************************************************************************************
* createGalleryEntry: creates a single card element in the gallery.
* @params: employee - employee object as supplied by randomuser.net
***************************************************************************************/
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

/**************************************************************************************
* createModal: The world's longest single JavaScript function ever. Displays a modal
*              with expanded details of a single employee.
* @params: array - array of employee objects (each one as returned from randomuser.net).
*          index - the position of the single employee in the above array. The reason 
*                  this is not simply calclated using .indexOf() is historical. This will
*                  be re-factored before the Project is submitted, as it's terrible.
***************************************************************************************/
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
  modalContainer.appendChild(modal);

  if (array.length > 1) {
    const modalButtonContainer = createModalNextPrev(array,index);
    modalContainer.appendChild(modalButtonContainer);
  }
  document.body.appendChild(modalContainer);
}

/**************************************************************************************
* createModalNextPrev: Adds next/prev buttons, as applicable, to a modal pop-out
* @params: array - array of employee objects (each one as returned from randomuser.net).
*          index - the position of the single employee in the above array.
* @return: a div element
***************************************************************************************/
const createModalNextPrev = (array,index) => {
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
  return modalButtonContainer;
}

/**************************************************************************************
* displayNoSearchResults: Can't be bothered to add a comment for this
*                         function.
***************************************************************************************/
const displayNoSearchResults = () => {
  const noResultsDiv = document.createElement('div');
  noResultsDiv.classList = 'gallery no-results';
  noResultsDiv.setAttribute('id','no-results');
  noResultsDiv.innerHTML = `<h3 class = "card-name">Sorry - no employee matched your search.</h3>`;
  galleryDiv.appendChild(noResultsDiv);
}

/**************************************************************************************
* removeNoSearchResults: Clears the "no search results" message
***************************************************************************************/
const removeNoSearchResults = () => {
  if (document.getElementById('no-results')) {
    const noResultsDiv = document.getElementById('no-results');
    noResultsDiv.parentNode.removeChild(noResultsDiv);
  }
}

/* 
    Event handlers
*/

/**************************************************************************************
* filterEmployees: event listener for the form. Hides all employees except 
*                  those that match the input search text. Activated by the 'submit'
*                  button.
* @params: event object - 'submit' event
***************************************************************************************/
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

/**************************************************************************************
* onSearchInput: event-listener for the search input field
* @params: event object - 'input' event
***************************************************************************************/
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

/**************************************************************************************
* onDisplayOptions: event-listner for the items-per-page select list
* @params: event object - in practice, will be a change event
***************************************************************************************/
const onDisplayOptions = (event) => {
  const number = parseInt(event.target.value);
  // Because of the Douglas Adams 'fun' option, which has its own event handler, event.target.value
  // may be NaN. In this case, onDisplayOptions() needs to ignore it.
  if (number) {
    usersDisplayed = number;
    loadEmployees();
  } 
}

/*
    The app itself...
*/

/**************************************************************************************
* loadEmployees: the primary outer function of the app. 
***************************************************************************************/
const loadEmployees = () => {
  clearGallery();
  clearSearch();
  prepGallery();
  data_getEmployees(usersDisplayed)
  .then( data => {
    const employees = data.results;
    employees.forEach(employee => {
      createGalleryEntry(employee);
    })
    finishGallery();
  })
  .catch(error => createErrorMessage(error));
} 

// And finally:

createForm();
loadEmployees();



