const path = require('path');
const url = require('url');
const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000, 
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

var cmd = require('node-cmd');
ipcMain.on("code:submit",(event,informacion)=>{
    // app.quit()
    console.log("logging info")
    console.log(informacion);
    var ubicacion_cli = __dirname+"\\cli\\arduino-cli.exe"
    var puerto = "COM4"
    var board = "arduino:avr:uno"
    var ubicacion_arduino = "C:\\Program Files (x86)\\Arduino\\Arduino_debug.exe"

    if(informacion=="Primero"){
        var command= '"' + ubicacion_cli + '" --format json board list'
        cmd.get(
            command,
            function (err, data, stderr) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(command)
                    console.log('Operacion exitosa :\n\n', data)
                    // arduino conectadoa
                        console.log(JSON.parse(data).serialBoards[0])
                        if(JSON.parse(data).serialBoards[0]!=undefined){
                            var board=JSON.parse(data).serialBoards[0].port;
                            console.log(board)
                            mainWindow.webContents.send(
                                'code:feedback',board
                            )
                        }
                    
                    
                }
            }
        );
    }

    else if(informacion=="Segundo"){
        var archivoIno=__dirname+"\\Arduino\\Arduino.ino"
        console.log("segundo")
        var carga = '"' + ubicacion_arduino + '" --board ' + board + ' --port ' + puerto + ' --upload ' + archivoIno;
        cmd.get(
            carga,
            function (err, data, stderr) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(command)
                    console.log('Operacion exitosa :\n\n', data)                
                }
            }
        );
    }

    else if(informacion=="Tercero"){
        var archivoIno=__dirname+"\\Arduino2\\Arduino.ino"
        console.log("tercero")
        var carga = '"' + ubicacion_arduino + '" --board ' + board + ' --port ' + puerto + ' --upload ' + archivoIno;
        cmd.get(
            carga,
            function (err, data, stderr) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(command)
                    console.log('Operacion exitosa :\n\n', data)                
                }
            }
        );
    }
    
    console.log(`ubicacion es: ${ubicacion_cli}`);
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
