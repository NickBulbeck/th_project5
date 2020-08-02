/*
  mrProsser.js contains the Douglas-Adams-themed easter egg code. All functions and variables 
  here adhere to good naming standards in no way whatsoever.
  Obviously, this is just for fun. It adds a "Douglas Adams option" to the items-per-page
  select list created in scripts.js/creatOption(), and when this option is selected, the
  user sees a set of randomuser employees with random names from my randomapi account, 
  which are pronounceable and set in the style of characters from the Hitch-Hiker's Guide
  To The Galaxy.

  The styling specific to this file is found in the file
  andMeWithThisTerriblePainInAllTheDiodesDownMyLeftSide.css.

  While this is mainly for fun, it isn't entirely frivolous. I built this functionality as
  an exercise in chaining Promises together, as - for whatever reason - I initially found
  the detailed syntax of Promise-based code difficult to master. And, as the reader will
  be aware, the best way to master a coding concept is to use it.
*/



const randomAPI =          'https://randomapi.com/api/2d3d134dea88edb7fa46222808ec8ff0'; // correct
const randomAPIwithError = 'https://randomapi.com/api/2d3d134dea88edb7fa46222808ec8ff'; // missing final 0
const dontPanic = document.getElementsByTagName('H1')[0];                               // (used for error testing)
const theAnswer = 42; // Well, duh.
let godsLastMessage = "";

/**************************************************************************************
* zaphod: called only when randomapi.com returns an error.
* @return: An array of objects with identical name/email properties.
***************************************************************************************/

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

/**************************************************************************************
* trinTragula: applies the Douglas-Adams-themed fake names (and emails) to the 
*              employee objects returned by the randomuser api.
* @params: prefect - array of randomuser employee objects
*          dent - array of Hitch-Hiker themed names/emails
* @return: array of randomuser employee objects
***************************************************************************************/

const trinTragula = (prefect,dent) => {
  let mella = [];
  for (let i=0; i<theAnswer; i++) {
    prefect[i].name.first = dent[i].firstname;
    prefect[i].name.last = dent[i].lastname;
    prefect[i].email = dent[i].email;
    mella.push(prefect[i]);
  }
  return mella;
} 

/**************************************************************************************
* milliways: called after a successful call of randomuser. This function calls 
*            randomapi to get the set of random Hitch-Hiker-themed names.
*            If this call is unsuccessful, it calls zaphod() to create identical 
*            generic names - either way, the Promise is ALWAYS RESOLVED.
* @param: ford - array of randomuser employee objects
* @return: Promise comprising an array of employee objects, or an Error object
***************************************************************************************/

const milliways = (ford) => {
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
          arthur = JSON.parse(xml.responseText).results[0]; //[0] is a workaround to fix randomuser!
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
    const start = new Date().getTime(); // I know this is bad practice. But it enables the "harmless"/"mostly harmless"
    let end = start;                    // joke. (Even though this will only make sense to Douglas Adams fans.)
    while(end < start + 2000) {         // Anyway, this causes a 2-second delay so that the user has time to see the
      end = new Date().getTime();       // main heading showing as "Harmless" before the transition to
    }                                   // "Mostly harmless". 
  });
  return marvin;                        // Frankly, this file is ALL bad practice. 
}

/**************************************************************************************
* bewareOfTheLeopard: adds the Douglas Adams option to the items-per-page select list.
*                     Called on page load.
***************************************************************************************/

const bewareOfTheLeopard = () =>{
  const zarniwoop = document.getElementById('select-number');
  const agrajag = document.createElement('option');
  agrajag.setAttribute('id','option-douglasAdams');
  agrajag.setAttribute('value','douglas-adams-option');
  agrajag.textContent = 'Douglas Adams option';
  zarniwoop.addEventListener('change',bigYellowBulldozer);
  zarniwoop.appendChild(agrajag);
}

/**************************************************************************************
* imFeelingVeryDepressed: Sets a Hitch-Hiker-themed error message if the call to 
*                         randomuser api is unsuccessful.
* @param: Error object
***************************************************************************************/

const imFeelingVeryDepressed = (error) => {
  const diode = document.createElement('div');
  let vortex = `<p>According to the Marketing Division of the Sirius Cybernetics Corporation: </p>`
  diode.classList.add('perspective');
  vortex += `<p><span style="font-family:monospace">${error.message} - we're doomed!"</span></p>
             <p>They'll probably be the first against the wall when the revolution comes; nevertheless,
             your planet has, regrettably, been scheduled for demolition.</p>`;
  diode.innerHTML = vortex;
  document.body.appendChild(diode);
}

/**************************************************************************************
* bigYellowBulldozer: Attaches an event-listener to the Douglas Adams option in the
*                     items-per-page select list. The callback for this event-listener
*                     calls data_getEmployees just like one of the normal items-per-page
*                     options, with a further call of milliways() to transform the names
*                     into Hitch-Hiker themed equivalents.
* @param: event object
***************************************************************************************/

const bigYellowBulldozer = (event) => {
  event.preventDefault;
  if (event.target.value !== "douglas-adams-option") { // All other values are handled in 
    return;                                            // scripts.js/onDisplayOptions()
  }                                                    
  usersDisplayed = theAnswer;
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

