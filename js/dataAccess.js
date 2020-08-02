

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





