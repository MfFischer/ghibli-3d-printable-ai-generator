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

  // Database operations
  db: {
    saveGeneration: (prompt, style, imageUrl) =>
      ipcRenderer.invoke('db-save-generation', prompt, style, imageUrl),
    getGenerations: (limit, offset) =>
      ipcRenderer.invoke('db-get-generations', limit, offset),
    getFavorites: () =>
      ipcRenderer.invoke('db-get-favorites'),
    toggleFavorite: (id) =>
      ipcRenderer.invoke('db-toggle-favorite', id),
    deleteGeneration: (id) =>
      ipcRenderer.invoke('db-delete-generation', id),
    searchGenerations: (query) =>
      ipcRenderer.invoke('db-search-generations', query),
  },

  // Platform info
  platform: process.platform,
  isElectron: true,
});

