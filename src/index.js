import { 
  app, 
  BrowserWindow, 
  ipcMain, 
  clipboard,
  Menu,
  shell
} from 'electron';

import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import ps from './ps'
import path from 'path'
import menubar from './menubar'


const defaultMenu = require('electron-default-menu');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let menubarWindow;

const isDevMode = process.execPath.match(/[\\/]electron/);

//if (isDevMode) enableLiveReload({ strategy: 'react-hmr' });

const createWindow = async () => {
  menubarWindow = menubar()
  
  Menu.setApplicationMenu(
    Menu.buildFromTemplate(
      defaultMenu(app, shell)
    )
  )
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }  
});

// ipc communication
ipcMain.on('quit', () => {
  app.quit();
});

ipcMain.on('put', (event, args) => {
  ps(JSON.parse(args)).put()
})

ipcMain.on('destroy', (event, args) => {
  ps(JSON.parse(args)).destroy()
})

ipcMain.on('get', (event, args) => {
  ps(JSON.parse(args)).get().then(data => {
    let { Value: value } = data.Parameters[0]
    let key = JSON.parse(args).key
    event.sender.send('data', JSON.stringify({key, value}))
    clipboard.writeText(value)
  })  
})

ipcMain.on('copy', (event, text) => {
  clipboard.writeText(text)
})