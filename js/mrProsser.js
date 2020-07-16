// Don't know what this is going to do yet!

const milliways = (inputCallback) => {
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
  const randomAPI = 'https://randomapi.com/api/2d3d134dea88edb7fa46222808ec8ff0'; // correct
  // const randomAPI = 'https://randomapi.com/api/2d3d134dea88edb7fa46222808ec8ff'; // missing final 0
// 1: create XMLHttpRequest object
  const ford = new XMLHttpRequest();
// 2: create the callback function (this and 3 can be exchanged)
  ford.onload = () => {
    let arthur;
    if (ford.status === 200) {
      arthur = JSON.parse(ford.responseText);
      document.title = "Mostly Harmless";
    } else {
      arthur = zaphod();
      document.title = "We apologise for the inconvenience";
    }
    if (inputCallback) {
      inputCallback(arthur);
    }
    return arthur;
  };
// 3: open the request (this and 2 can be exchanged)
  ford.open('GET',randomAPI);
// 4: send the request
  ford.send();

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
}

// console.log(milliways());

/*****************************************
**
**  Easter egg code runs here...
**
******************************************/

bewareOfTheLeopard()

