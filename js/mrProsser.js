

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


const milliways = (d) => {
/*
  So: firstly, consumes a promise
*/
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
    .then(dontPanic.textContent = "Mostly harmless");
  // this is getting an array of 42 employees; so far, so good. So, next, I need to
  // pass this Promise to milliways() 
  // https://randomuser.me/api/?results=${usersDisplayed}&exc=login&noinfo

}


/*****************************************
**
**  Easter egg code runs here...
**
******************************************/

bewareOfTheLeopard()

