// src/main/main.js
import { app, BrowserWindow } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });


  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `../../index.html`),
      protocol: "file:",
      slashes: true
    })
  );

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});