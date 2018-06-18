const electron = require('electron');
const path = require('path');
const fs = require('fs');
const XlsxPopulate = require('xlsx-populate');
var n, n2;

class Store {
  constructor() {
  }
  getNoUser() {

  }

  // This will just return the property on the `data` object
  findUser(user) {
    XlsxPopulate.fromFileAsync("./User.xlsx")
    .then(workbook => {
      n = workbook.sheet(0).find(user);
      console.log('n' + n);
    }).catch((err) => {
      console.log('ssss'+ err);
    });
    
    setTimeout(myF,1000);
    function myF(){
      console.log('yoyoyo');
      console.log(n);
      console.log(n.length);
      console.log(n[0]._row._node.attributes.r);
      console.log(n[0]._columnNumber);
    }
  }

/*
get(key) {
  return this.data[key];
}
length() {
  console.log('lenght-----')
  console.log(this.data);
  console.log('l ends ----');
}
  // ...and this will set it
  set(key, val) {
    this.data[key] = val;
    // Wait, I thought using the node.js' synchronous APIs was bad form?
    // We're not writing a server so there's not nearly the same IO demand on the process
    // Also if we used an async API and our app was quit before the asynchronous write had a chance to complete,
    // we might lose that data. Note that in a real app, we would try/catch this.
    fs.appendFileSync(this.path, [JSON.stringify(this.data)]);
  }*/
}
/*
function parseDataFile(filePath, defaults) {
  // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
  // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch(error) {
    // if there was some kind of error, return the passed in defaults instead.
    return defaults;
  }
}*/

// expose the class
module.exports = Store;