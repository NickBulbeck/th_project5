

const randomAPI =          'https://randomapi.com/api/2d3d134dea88edb7fa46222808ec8ff0'; // correct
const randomAPIwithError = 'https://randomapi.com/api/2d3d134dea88edb7fa46222808ec8ff'; // missing final 0
const dontPanic = document.getElementsByTagName('H1')[0];
const theAnswer = 42;

const zaphod = () => {
  let benjyMouse = [];
  for (let i=1; i<= theAnswer; i++) {
    let trillian = {name:{}};
    trillian.firstname = "We apologise for";
    trillian.lastname = "the inconvenience";
    trillian.email = "wafti@dolmansaxlil.com";
    benjyMouse.push(trillian);
  }
  return benjyMouse;
}

const trinTragula = (prefect,dent) => {
  // prefect is the randomuser array lf 42 folk;
  // dent is the array of stuff fae randomapi which is in the following format:
  // name: "First Last"
  // email: "first.last@dolmansaxlil.frogstar"
  for (let i=0; i<theAnswer; i++) {
    console.log(`prefect[i]: ${prefect[i]}; dent[i]: ${dent[i]}`);
    // prefect[i].name.first = dent[i].firstname;
    // prefect[i].name.last = dent[i].lastname;
    // prefect[i].email = dent[i].email;
  }
  return prefect;
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
  ford = ford.results;
  console.log(ford);
  let arthur;
  let beeblebrox;
  const marvin = new Promise(function(resolve,reject) {
    // 1: create xml request
    const xml = new XMLHttpRequest();
    // 2: create callback function for when the stuff gets back
    xml.onreadystatechange = () => {
      if (xml.readyState === 4) {
        if (xml.status === 200) {
          arthur = JSON.parse(xml.responseText).results;
          console.log(arthur);
          beeblebrox = trinTragula(ford,arthur);
          resolve(beeblebrox);
          dontPanic.textContent = "Mostly harmless"
        } else {
          beeblebrox = trinTragula(ford,zaphod());
          resolve(beeblebrox);
          dontPanic.textContent = "Mostly harmless"
        }
      }
    }
    // 3: open the request
    xml.open('GET',randomAPI);
    // 4: send the request
    xml.send();

    const start = new Date().getTime();
    let end = start;
    while(end < start + 2000) {
      end = new Date().getTime();
    }
  });
  return marvin;
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
  data_getEmployees(usersDisplayed)
    .then( output => milliways(output))
    .then( output => dontPanic.textContent = output);
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

