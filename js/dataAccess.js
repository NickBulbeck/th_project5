const randomUsers = 'https://randomuser.me/api/?results=12&exc=login&noinfo';
let users;
let rawData = null
// const 

const data_getUser = (url) => {
  return fetch(url)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => {
      console.log(data.results);
      users = data.results;
      console.log(users);
    })
}
data_getUser(randomUsers);
console.log(users);

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

/* the gallery / directory has:
    - image (it seems to work in the form of a url, possibly because it's cached)
    - first name
    - last name
    - email
    - city or location
  to which the modal adds at least:
    - cell number
    - full/detailed address (basically, everything that's there)
    - birthday

*/
// )
// .then(data => {
//   const breedList = data[0].message;
//   const randomImage = data[1].message;
//   populateList(breedList);
//   generateImage(randomImage);
// })