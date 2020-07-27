const gitHub = `https://github.com/NickBulbeck/th_project5/tree/master/blub`;
const testURL = 'https://dog.ceo/api/breeds/list';
// const randomAPI = 'https://randomapi.com/api/2d3d134dea88edb7fa46222808ec8ff0';

let testData = null;
let maybeAFunction = null;
const maybeAnElement = document.querySelector('.header-text-container')
    .getElementsByTagName('h1')[0];


const testFetch = (url) => {
  let rawData = [];
  fetch(url)
      .then(checkStatus)
      .then(response => response.json())
      .then(data => {
                // console.log(data.results[0].key3);
                // testData = data.results[0].key3;
                // eval(`maybeAFunction = ${testData}`);
                // maybeAFunction(maybeAnElement);
                console.log(data.results[0]);
                rawData.push (data.results[0]);
            })
      .catch(error => console.log('Evil befell: ', error));
}


// testFetch(randomAPI);
// console.log(testData);
// console.log(maybeAFunction);

const OLDloadEmployees= () => {
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
