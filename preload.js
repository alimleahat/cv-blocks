const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('cvApp', {
  platform: process.platform,
  exportPDF: name => ipcRenderer.invoke('export-pdf', name)
});
