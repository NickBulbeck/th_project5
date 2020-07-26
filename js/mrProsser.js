

const randomAPI =          'https://randomapi.com/api/2d3d134dea88edb7fa46222808ec8ff0'; // correct
const randomAPIwithError = 'https://randomapi.com/api/2d3d134dea88edb7fa46222808ec8ff'; // missing final 0

const zaphod = () => {
  let benjyMouse = [];
  for (let i=1; i<= 42; i++) {
    let trillian = {name:{}};
    trillian.name.first = "We apologise for";
    trillian.name.last = "the inconvenience";
    trillian.email = "wafti@dolmansaxlil.com";
    benjyMouse.push(trillian);
  }
  return benjyMouse;
}


const milliways = async () => {
// example from MDN: return greeting = await Promise.resolve("Hello");
// followed by milliways().then(alert);
   return arthur = await Promise.resolve();
// 1: create XMLHttpRequest object
  const ford = new XMLHttpRequest();
// 2: create the callback function (this and 3 can be exchanged)
  ford.onload = async () => {
    if (ford.status === 200) {
      arthur = JSON.parse(ford.responseText);
      document.title = "Mostly Harmless";
    } else {
      arthur = zaphod();
      document.title = "We apologise for the inconvenience";
    }
    // if (inputCallback) {
    //   inputCallback(arthur);
    // }
  };
// 3: open the request (this and 2 can be exchanged)
  ford.open('GET',randomAPI);
// 4: send the request
  ford.send();
  return await Promise.resolve(arthur);

}

const bewareOfTheLeopard = () =>{
  const zarniwoop = document.getElementById('select-number');
  const agrajag = document.createElement('option');
  agrajag.setAttribute('id','option-douglasAdams');
  agrajag.setAttribute('value','douglas-adams-option');
  agrajag.textContent = 'Douglas Adams option';
  zarniwoop.addEventListener('change',bigYellowBulldozer);
  zarniwoop.appendChild(agrajag);
}

const bigYellowBulldozer = (event) => {
  event.preventDefault;
  if (event.target.value !== "douglas-adams-option") {
    return;
  }
  console.log("In bigYellowBulldozer");
  milliways().then( output => console.log(output));
  // This needs to set usersDisplayed to 42, then fetch stuff via the randomuser api using 
  // https://randomuser.me/api/?results=${usersDisplayed}&exc=login&noinfo
  // Then it needs to fetch stuff that's currently in milliways() and incorporate the new
  // names into the standard array. 
  // Then I need a way of displaying that. Maybe return the array and re-write loadEmployees
  // as an async/await call to here and dataAccess?
  // Maybe best as an async/await call to data_getEmployees with 42, then call 
  // randomapi to get the 42 random names and put them in. That's easy enough; just
  // needs a function that takes in two person objects and transfers the value, then 
  // returns the updated employee.
}


/*****************************************
**
**  Easter egg code runs here...
**
******************************************/

bewareOfTheLeopard()

