

const randomAPI =          'https://randomapi.com/api/2d3d134dea88edb7fa46222808ec8ff0'; // correct
const randomAPIwithError = 'https://randomapi.com/api/2d3d134dea88edb7fa46222808ec8ff'; // missing final 0
const dontPanic = document.getElementsByTagName('H1')[0];

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


const milliways = (ford) => {
/*
  So: firstly, consumes a promise (ford) which comes in with the output of data_getEmployees.
  Need a way of handling what happens when this is rejected. Actually, I need to decide what
  happens when it's rejected. 
  Anyway: happy path means that a Promise is created just like in data_getEmployees. 
  Unlike there, however, this Promise is not rejected: it either returns 42 random names, in which
  case they're incorporated into ford.results (or whatever), or it doesn't in which case zaphod is called
  and THEY're incorporated into ford.results. This Promise is then returned.

*/
  console.log("In milliways (should be an array immediately next)...");
  console.log(ford.results); // this is an array of employee objects
  
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
  usersDisplayed = 42;
  dontPanic.textContent = "Harmless";
  console.log("before either .then");
  data_getEmployees(usersDisplayed)
    .then( output => milliways(output))
    .then( console.log("in the second .then"));
  // this is getting an array of 42 employees; so far, so good. So, next, I need to
  // pass this Promise to milliways() 
  // https://randomuser.me/api/?results=${usersDisplayed}&exc=login&noinfo

/*
  prepGallery() is called in loadEmployees; this creates the loading employee details... text. 
  Then, data_getEmployees is called, returns a promise, which is consumed by a .then method.
  It's in this method, that consumes a promise, that the loading employee details... text is
  removed. So, "Harmless" needs to be replaced by "Mostly harmless" in a function that consumes
  the output of a Promise.
*/

}


/*****************************************
**
**  Easter egg code runs here...
**
******************************************/

bewareOfTheLeopard()

