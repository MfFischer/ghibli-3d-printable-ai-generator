/**
 * Type definitions for Electron API exposed via preload script
 */

export interface ElectronAPI {
  // API Key management
  getApiKey: () => Promise<string>;
  setApiKey: (apiKey: string) => Promise<boolean>;
  
  // File dialogs
  showSaveDialog: (options: SaveDialogOptions) => Promise<SaveDialogResult>;
  
  // Settings
  onOpenSettings: (callback: () => void) => void;
  
  // Platform info
  platform: string;
  isElectron: boolean;
}

export interface SaveDialogOptions {
  title?: string;
  defaultPath?: string;
  buttonLabel?: string;
  filters?: FileFilter[];
}

export interface FileFilter {
  name: string;
  extensions: string[];
}

export interface SaveDialogResult {
  canceled: boolean;
  filePath?: string;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

