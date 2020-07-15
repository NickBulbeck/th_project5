/*
  Remember: a Promise isn't a replacement for AJAX, nor a new way to construct HTTP
  requests. It's a way to handle asynchronous code. Inside the Promise, you find the code
  that sets a timeout, maybe, or goes off and calls a URL.

  New function: I need a data_getEmployees function.
  For the Douglas Adams function here, I want to call data_getEmployees AFTER getting 
  the stuff from my own randomapi account. Then, go through it and set the names and
  email addresses accordingly. 
  


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





