const randomUsers = 'https://randomuser.me/api/';
const users = [];
let rawData = null
// const 

const data_getUser = (url) => {
  return fetch(url)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => {
      rawData = data.results[0];
      console.log(rawData.gender);
      users.push(rawData);
      console.log(users[0]);
    })
}
data_getUser(randomUsers);

// Promise.all(

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}



// )
// .then(data => {
//   const breedList = data[0].message;
//   const randomImage = data[1].message;
//   populateList(breedList);
//   generateImage(randomImage);
// })