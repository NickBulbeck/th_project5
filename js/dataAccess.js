/*
  Remember: a Promise isn't a replacement for AJAX, nor a new way to construct HTTP
  requests. It's a way to handle asynchronous code. Inside the Promise, you find the code
  that sets a timeout, maybe, or goes off and calls a URL.

  The major point of learning: in Promise-world, I've often seen a function 



*/

const randomUsers = 'https://randomuser.me/api/?results=12&exc=login&noinfo';
let users;
// const 

const data_getUser = (url) => {
  // return fetch(url)
  //   .then(checkStatus)
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data.results);
  //     users = data.results;
  //     console.log(users);
  //   })
  console.log(url);
}
// data_getUser(randomUsers);

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



