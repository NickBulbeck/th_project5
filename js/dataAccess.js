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

const data_getEmployees = (listLength) => {
  const url = `https://randomuser.me/api/?results=${listLength}&exc=login&noinfo`;
  /*
    This needs to return a Promise that has, as its function argument, something that
    gets stuff fae randomuser using the listLength. If there's nane, it sends an error.
    If there is data returned, it sends it.
    This promise is then consumed by loadEmployees in the main scripts.js in an 
    async/wait function.
    When I console.log(milliways()), it come back undefined because the xmlHttpRequest does
    its stuff asynchronously. That is, the console.log happens immediately after the milliways()
    call has begun. But BEFORE it's finished, and come back with data.

  */
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





