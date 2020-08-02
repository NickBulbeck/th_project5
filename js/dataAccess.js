/*
  dataAccess.js handles the main retrieval of data from the interweb. As and when the app is further developed
  to include database lookups, and/or other api calls, these will be handled here.
  URL information is included in this file, so that scripts.js can work independently of where the data
  is stored.
*/

/**************************************************************************************
* data_getEmployees: gets a list of employee objects from randomuser.me api; list-length
*                    set by the input parameter.
* @param: listLength, integer
* @return: Promise comprising an array of employee objects, or an Error object
***************************************************************************************/

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





