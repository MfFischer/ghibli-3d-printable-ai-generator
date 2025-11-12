/**
 * Type definitions for Electron API exposed via preload script
 */

import { GenerationRecord } from '../services/database';

export interface ElectronAPI {
  // API Key management
  getApiKey: () => Promise<string>;
  setApiKey: (apiKey: string) => Promise<boolean>;

  // File dialogs
  showSaveDialog: (options: SaveDialogOptions) => Promise<SaveDialogResult>;

  // Settings
  onOpenSettings: (callback: () => void) => void;

  // Database operations
  db: {
    saveGeneration: (prompt: string, style: string, imageUrl: string) => Promise<GenerationRecord | null>;
    getGenerations: (limit?: number, offset?: number) => Promise<GenerationRecord[]>;
    getFavorites: () => Promise<GenerationRecord[]>;
    toggleFavorite: (id: number) => Promise<boolean>;
    deleteGeneration: (id: number) => Promise<void>;
    searchGenerations: (query: string) => Promise<GenerationRecord[]>;
  };

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

