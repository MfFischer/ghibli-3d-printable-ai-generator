const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

// Import database functions (will be compiled from TypeScript)
let db;
try {
  db = require('../dist-electron/services/database.js');
} catch (err) {
  console.warn('Database module not yet compiled:', err.message);
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: path.join(__dirname, '../public/icon.png'),
    title: 'Ghibli Trinkets - 3D Model Idea Generator',
  });

  // Load the app
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Create application menu
  createMenu();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Settings',
          accelerator: 'CmdOrCtrl+,',
          click: () => {
            mainWindow.webContents.send('open-settings');
          },
        },
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About Ghibli Trinkets',
              message: 'Ghibli Trinkets v1.0.0',
              detail: 'Generate charming 3D-printable concept art in various art styles.',
            });
          },
        },
        {
          label: 'Documentation',
          click: async () => {
            const { shell } = require('electron');
            await shell.openExternal('https://github.com/MfFischer/ghibli-3d-printable-ai-generator');
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// App lifecycle
app.whenReady().then(createWindow);

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

// IPC handlers for secure API key storage
ipcMain.handle('get-api-key', async () => {
  // In production, use electron-store for encrypted storage
  // For now, read from environment or config file
  return process.env.GEMINI_API_KEY || '';
});

ipcMain.handle('set-api-key', async (event, apiKey) => {
  // In production, use electron-store for encrypted storage
  // For now, this is a placeholder
  process.env.GEMINI_API_KEY = apiKey;
  return true;
});

ipcMain.handle('save-file-dialog', async (event, options) => {
  const result = await dialog.showSaveDialog(mainWindow, options);
  return result;
});

// Database IPC handlers
ipcMain.handle('db-save-generation', async (event, prompt, style, imageUrl) => {
  if (!db) return null;
  try {
    return db.saveGeneration(prompt, style, imageUrl);
  } catch (err) {
    console.error('Error saving generation:', err);
    return null;
  }
});

ipcMain.handle('db-get-generations', async (event, limit, offset) => {
  if (!db) return [];
  try {
    return db.getGenerations(limit, offset);
  } catch (err) {
    console.error('Error getting generations:', err);
    return [];
  }
});

ipcMain.handle('db-get-favorites', async () => {
  if (!db) return [];
  try {
    return db.getFavorites();
  } catch (err) {
    console.error('Error getting favorites:', err);
    return [];
  }
});

ipcMain.handle('db-toggle-favorite', async (event, id) => {
  if (!db) return false;
  try {
    return db.toggleFavorite(id);
  } catch (err) {
    console.error('Error toggling favorite:', err);
    return false;
  }
});

ipcMain.handle('db-delete-generation', async (event, id) => {
  if (!db) return;
  try {
    db.deleteGeneration(id);
  } catch (err) {
    console.error('Error deleting generation:', err);
  }
});

ipcMain.handle('db-search-generations', async (event, query) => {
  if (!db) return [];
  try {
    return db.searchGenerations(query);
  } catch (err) {
    console.error('Error searching generations:', err);
    return [];
  }
});

// Initialize database on app ready
app.on('ready', () => {
  if (db) {
    try {
      db.initDatabase();
    } catch (err) {
      console.error('Error initializing database:', err);
    }
  }
});

// Close database on app quit
app.on('before-quit', () => {
  if (db) {
    try {
      db.closeDatabase();
    } catch (err) {
      console.error('Error closing database:', err);
    }
  }
});
