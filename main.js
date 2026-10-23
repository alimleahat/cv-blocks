const { app, BrowserWindow, ipcMain, dialog, shell, Menu, session } = require('electron');
const path = require('path');
const fs = require('fs');

const isMac = process.platform === 'darwin';
const prefsFile = () => path.join(app.getPath('userData'), 'prefs.json');
const readPrefs = () => { try { return JSON.parse(fs.readFileSync(prefsFile(), 'utf8')); } catch { return {}; } };
const writePrefs = p => { try { fs.writeFileSync(prefsFile(), JSON.stringify(p)); } catch {} };

// Keep using the data folder from when the app was called "CV Blocks", so the saved CV carries over.
app.setPath('userData', path.join(app.getPath('appData'), 'CV Blocks'));

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1080,
    minHeight: 680,
    title: 'Blokk',
    backgroundColor: '#f6f6f8',
    show: false,
    ...(isMac ? { titleBarStyle: 'hiddenInset', trafficLightPosition: { x: 20, y: 19 } } : { autoHideMenuBar: true }),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: true
    }
  });
  win.loadFile(path.join(__dirname, 'index.html'));
  win.once('ready-to-show', () => win.show());

  // Links open in the default browser, never inside the app window.
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('file://')) { e.preventDefault(); shell.openExternal(url); } });
  // Keep the page title (used for the PDF file name) from renaming the window.
  win.on('page-title-updated', e => e.preventDefault());
}

ipcMain.handle('export-pdf', async (_e, name) => {
  const prefs = readPrefs();
  const dir = prefs.lastDir && fs.existsSync(prefs.lastDir) ? prefs.lastDir : app.getPath('documents');
  const { canceled, filePath } = await dialog.showSaveDialog(win, {
    title: 'Export CV as PDF',
    defaultPath: path.join(dir, `${name || 'CV'}.pdf`),
    filters: [{ name: 'PDF', extensions: ['pdf'] }]
  });
  if (canceled || !filePath) return null;
  const data = await win.webContents.printToPDF({
    pageSize: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margins: { top: 0, bottom: 0, left: 0, right: 0 }
  });
  fs.writeFileSync(filePath, data);
  writePrefs({ ...prefs, lastDir: path.dirname(filePath) });
  shell.showItemInFolder(filePath);
  return filePath;
});

function buildMenu() {
  const template = [
    ...(isMac ? [{ role: 'appMenu' }] : []),
    {
      label: 'File',
      submenu: [
        { label: 'Export PDF…', accelerator: 'CmdOrCtrl+E', click: () => win && !win.isDestroyed() && win.webContents.executeJavaScript('exportPDF()') },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
    { role: 'editMenu' },
    { label: 'View', submenu: [{ role: 'togglefullscreen' }, { type: 'separator' }, { role: 'reload' }, { role: 'toggleDevTools' }] },
    { role: 'windowMenu' }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  // On macOS the app keeps running after its window is closed, so the window may be gone: reopen it instead of touching a destroyed one.
  app.on('second-instance', () => {
    if (!win || win.isDestroyed()) { createWindow(); return; }
    if (win.isMinimized()) win.restore();
    win.focus();
  });
  app.whenReady().then(() => {
    // Privacy: the app never talks to the internet. Only its own local files can load, and no permission
    // (camera, location, notifications...) is ever granted, so a CV can't leave this computer through the app.
    session.defaultSession.webRequest.onBeforeRequest((details, cb) => cb({ cancel: !/^(file|data|blob|devtools):/.test(details.url) }));
    session.defaultSession.setPermissionRequestHandler((_wc, _perm, cb) => cb(false));
    buildMenu();
    createWindow();
    app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
  });
  app.on('window-all-closed', () => { if (!isMac) app.quit(); });
}
