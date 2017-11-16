function update(autoUpdater, url) {
  autoUpdater.setFeedURL(url);

  // Log whats happening
  autoUpdater.on('error', err => console.error(err))
  autoUpdater.on('checking-for-update', () => console.log('checking-for-update'))
  autoUpdater.on('update-available', () => console.log('update-available'))
  autoUpdater.on('update-not-available', () => console.log('update-not-available'))
  autoUpdater.on('update-downloaded', () => console.log('update-downloaded'))

  // Ask the user if update is available
  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    dialog.showMessageBox(window, {
      type: 'question',
      buttons: ['Update', 'Cancel'],
      defaultId: 0,
      message: `Version ${releaseName} is available, do you want to install it now?`,
      title: 'Update available'
    }, response => {
      if (response === 0) {
        autoUpdater.quitAndInstall()
      }
    })
  })

  // Trigger autoUpdater
  autoUpdater.checkForUpdates()
  return autoUpdater
}

module.exports = update