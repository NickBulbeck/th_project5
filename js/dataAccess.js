const randomUsers = 'https://randomuser.me/api/';
const users = [];
let rawData = null
// const 

const data_getUser = (url) => {
  return fetch(url)
    // .then(checkStatus)
    .then(response => response.json())
    .then(data => {
      rawData = data.results[0];
      console.log(rawData.gender);

    })
}
data_getUser(randomUsers);

// Promise.all(


// )
// .then(data => {
//   const breedList = data[0].message;
//   const randomImage = data[1].message;
//   populateList(breedList);
//   generateImage(randomImage);
// })