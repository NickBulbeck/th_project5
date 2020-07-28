/*
  Remember: a Promise isn't a replacement for AJAX, nor a new way to construct HTTP
  requests. It's a way to handle asynchronous code. Inside the Promise, you find the code
  that sets a timeout, maybe, or goes off and calls a URL.

  New function: I need a data_getEmployees function.
  For the Douglas Adams function here, I want to call data_getEmployees AFTER getting 
  the stuff from my own randomapi account. Then, go through it and set the names and
  email addresses accordingly. 
  


*/

// const randomUsers = 'https://randomuser.me/api/?results=12&exc=login&noinfo';
// let users;
// const 

const data_getEmployees = (listLength) => {
  const url = `https://randomuser.me/api/?results=${listLength}&exc=login&noinfo`; // correct
  // const url = `https://randomusr.me/api/?results=${listLength}&exc=login&noinfo`; // error (for testing)
  let employeeData;
  const employees = new Promise( function(resolve,reject) {
    let xml = new XMLHttpRequest();
    xml.open('GET',url);
    xml.onreadystatechange = () => {
      if (xml.readyState === 4) {
        if (xml.status === 200) {
          employeeData = JSON.parse(xml.responseText);
          resolve(employeeData);
        } else {
          reject(new Error("While the app was trying to retrieve employee data... evil befell!"));
        }
      }
    }
    xml.send();
  })
  return employees;
}

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}





