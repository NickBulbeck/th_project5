

const randomAPI =          'https://randomapi.com/api/2d3d134dea88edb7fa46222808ec8ff0'; // correct
const randomAPIwithError = 'https://randomapi.com/api/2d3d134dea88edb7fa46222808ec8ff'; // missing final 0
const dontPanic = document.getElementsByTagName('H1')[0];
const theAnswer = 42; // Well, duh.
let godsLastMessage = "";

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
  let mella = [];
  for (let i=0; i<theAnswer; i++) {
    prefect[i].name.first = dent[i].firstname;
    prefect[i].name.last = dent[i].lastname;
    prefect[i].email = dent[i].email;
    mella.push(prefect[i]);
  }
  return mella;
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
  ford = ford.results;
  let arthur;
  let beeblebrox;
  const marvin = new Promise(function(resolve,reject) {
    // 1: create xml request
    const xml = new XMLHttpRequest();
    // 2: create callback function for when the stuff gets back
    xml.onreadystatechange = () => {
      if (xml.readyState === 4) {
        if (xml.status === 200) {
          arthur = JSON.parse(xml.responseText).results[0]; //[0] is a workaround... fix randomuser!
          beeblebrox = trinTragula(ford,arthur);
          resolve(beeblebrox);
          godsLastMessage = "Mostly harmless";
        } else {
          beeblebrox = trinTragula(ford,zaphod());
          resolve(beeblebrox);
          godsLastMessage = "An error occured while accessing the Central Galactic Database. Regrettably, your planet has been scheduled for demolition.";
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

const imFeelingVeryDepressed = (error) => {
  console.log("In Douglas Adams error handler...")
  const diode = document.createElement('div');
  let vortex = `According to the Marketing Division of the Sirius Cybernetics Corporation: `
  diode.classList.add('perspective');
  vortex += `${error.message}`;
  diode.textContent = vortex;
  document.body.appendChild(diode);
}

const bigYellowBulldozer = (event) => {
  event.preventDefault;
  if (event.target.value !== "douglas-adams-option") {
    return;
  }
  usersDisplayed = 42;
  clearGallery();
  prepGallery();
  dontPanic.textContent = "Harmless";
  data_getEmployees(usersDisplayed)
    .then( output => milliways(output))
    .then( output => {
      console.log(output);
      output.forEach(employee => {
        createGalleryEntry(employee);
      })
      finishGallery();
      dontPanic.textContent = godsLastMessage;
    })
    .catch(error => imFeelingVeryDepressed(error));
}


/*****************************************
**
**  Easter egg code runs here...
**
******************************************/

bewareOfTheLeopard()

