import menubar from 'menubar'
import path from 'path'
import ps from './ps'

const isDevMode = process.execPath.match(/[\\/]electron/);

const mb = menubar({
  index: `file://${__dirname}/index.html`,
  preloadWindow: true,
  width: isDevMode ? 650 : 400,
  height: 500,
});

mb.on('ready', function ready () {
  // your app code here
});

mb.on('after-create-window', () => {
  let { webContents } = mb.window
  
  if(isDevMode) webContents.openDevTools()

  webContents.on('dom-ready', () => {
    console.log('new-window')
    ps().list().then(data => {
      webContents.send('init', JSON.stringify([
        ...data.Parameters.map(p => ({
          key: p.Name, 
          id: Math.random().toString(36).substr(2, 9)
        }))
      ]))
    })
  })
})

export default () => mb