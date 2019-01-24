const path = require('path');
const url = require('url');
const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800, 
        height: 600,
        webPreferences: {
          nodeIntegration: false,
          preload: __dirname + '/preload.js'
        }
    });

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    // set ELECTRON_START_URL= http://localhost:3000/
    // mainWindow.webContents.openDevTools();
    console.log("url: "+startUrl)

    mainWindow.loadURL(startUrl);

    mainWindow.on('closed', () => mainWindow = null)
}

app.on('ready', createWindow);

ipcMain.on("code:submit",(event,informacion)=>{
    // app.quit()
    console.log("logging info")
    console.log(informacion);
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});
