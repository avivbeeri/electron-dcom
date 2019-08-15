const { app, BrowserWindow, ipcMain } = require('electron');
const SerialPort: any = require('serialport');

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
    }
  })
  win.webContents.openDevTools()

  // and load the index.html of the app.
  win.loadFile('src/index.html')
  let connection: any;
  getPort().then(port => {
    connection = new SerialPort('/dev/tty.usbmodem14611', { baudRate: 9600 });
    connection.write("1");
  });
  ipcMain.on('control', (event, messages) => {
    console.log(event);
    console.log(messages);
    connection.write(messages);
  });


}

app.on('ready', createWindow);

async function getPort(): Promise<any> {
  const ports = await SerialPort.list();
  for (const port of ports) {
    console.log(port);
    // if (port.manufacturer.indexOf('Arduino') > -1) {
      // return port;
    // }
  }
  // throw new Error('No Arduino Found');
  return {};
}


