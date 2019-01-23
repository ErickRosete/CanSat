const path = require('path');
const url = require('url');
const electron = require('electron');
const { app, BrowserWindow } = electron;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    // mainWindow.webContents.openDevTools();
    mainWindow.loadURL(startUrl);

    mainWindow.on('closed', () => mainWindow = null)
}

app.on('ready', createWindow);

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