const electron = require('electron');
const path = require('path');
const url = require('url');
const Store = require('./store.js');
const Search = require('./search.js');
// SET ENV
process.env.NODE_ENV = 'production';

const {app, BrowserWindow, Menu, ipcMain} = electron;

const store = new Store();
//const search = new Search();
let mainWindow;

// Listen for app to be ready
app.on('ready', function(){
  // Create new window

  mainWindow = new BrowserWindow({});
  // Load html in window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes:true
  }));
  // Quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  });

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});


// Catch item:add
ipcMain.on('new_user', function(e, item){
  store.newUser(item);
  //mainWindow.webContents.send('item:add', item);
});
ipcMain.on('search', function(e,item){
  //search.findUser(item);
  console.log('HO gaya')
})
// Create menu template
const mainMenuTemplate =  [
  // Each object is a dropdown
  {
    label: 'File',
    submenu:[
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];

// If OSX, add empty object to menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}

// Add developer tools option if in dev
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
        accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}