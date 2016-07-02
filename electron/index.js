const electron = require('electron');
const {app, BrowserWindow, globalShortcut} = electron;


let win;

app.on('ready', () => {
  win = new BrowserWindow({width: 800, height: 600});
  win.loadURL(`file://${__dirname}/index.html`);
  let auguryPath = '/Users/th/Library/Application Support/Google/Chrome/Default/Extensions/elgalmkoelokbchhkhacckoklkejnhcd/1.0.3_0';
  BrowserWindow.addDevToolsExtension(auguryPath);
  globalShortcut.register('CmdOrCtrl+Shift+D', ()=>{
    win.webContents.toggleDevTools();
  });
  win.on('closed', () => {
    win = null;
  });
});
app.on('will-close', ()=>{
    globalShortcut.unregisterAll();
});
app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});