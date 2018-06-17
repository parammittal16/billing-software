const electron = require('electron');
const path = require('path');
const fs = require('fs');
const XlsxPopulate = require('xlsx-populate');
var n, n2;

class Store {
  constructor() {

    fs.readFile('Number.txt', 'utf8', function(err, data) {
        if (err) {
          console.log(err);
        }
        console.log(data);
        n = data;
    if(n == '') {
      n2 = 1;
      console.log("ud");
      XlsxPopulate.fromBlankAsync()
      .then(workbook => {
        // Modify the workbook.
        workbook.sheet("Sheet1").cell('A1').value('ID');
        workbook.sheet("Sheet1").cell('B1').value('NAME');
        workbook.sheet("Sheet1").cell('C1').value('Email');
        workbook.sheet("Sheet1").cell('D1').value('MOB');
        // Write to file.
        return workbook.toFileAsync("./User.xlsx");
      });
    }
    else {
      n2 = n;
      console.log("d");
      XlsxPopulate.fromFileAsync("./User.xlsx")
      .then(workbook => {
        // Modify the workbook.
        workbook.sheet("Sheet1").cell('A1').value('ID');
        workbook.sheet("Sheet1").cell('B1').value('NAME');
        workbook.sheet("Sheet1").cell('C1').value('Email');
        workbook.sheet("Sheet1").cell('D1').value('MOB');
        // Write to file.
        return workbook.toFileAsync("./User.xlsx");
      });
    }
  });
  }
  getNoUser() {

  }

  // This will just return the property on the `data` object
  newUser(user) {
      console.log(n2);
    XlsxPopulate.fromFileAsync("./User.xlsx")
    .then(workbook => {
        // Modify the workbook.
        workbook.sheet("Sheet1").cell(`A${n2}`).value(n2);
        workbook.sheet("Sheet1").cell(`B${n2}`).value(user[0]);
        workbook.sheet("Sheet1").cell(`C${n2}`).value(user[1]);
        workbook.sheet("Sheet1").cell(`D${n2}`).value(user[2]);
        // Write to file.
        return workbook.toFileAsync("./User.xlsx");
      }).catch((err) => {
      console.log('ssss'+ err);
    });
      n2 = parseInt(n2) + 1;
      fs.writeFile('Number.txt', n2, function (err) {
          if (err) {
          } else {
          }});
    }

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
  }
}

function parseDataFile(filePath, defaults) {
  // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
  // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch(error) {
    // if there was some kind of error, return the passed in defaults instead.
    return defaults;
  }
}

// expose the class
module.exports = Store;