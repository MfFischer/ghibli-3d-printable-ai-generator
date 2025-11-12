const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // API Key management
  getApiKey: () => ipcRenderer.invoke('get-api-key'),
  setApiKey: (apiKey) => ipcRenderer.invoke('set-api-key', apiKey),
  
  // File dialogs
  showSaveDialog: (options) => ipcRenderer.invoke('save-file-dialog', options),
  
  // Settings
  onOpenSettings: (callback) => ipcRenderer.on('open-settings', callback),
  
  // Platform info
  platform: process.platform,
  isElectron: true,
});

