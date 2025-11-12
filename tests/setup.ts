import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

// Mock Electron API
global.window.electronAPI = {
  getApiKey: jest.fn().mockResolvedValue(''),
  setApiKey: jest.fn().mockResolvedValue(true),
  showSaveDialog: jest.fn().mockResolvedValue({ canceled: false, filePath: '/test/path' }),
  onOpenSettings: jest.fn(),
  db: {
    saveGeneration: jest.fn().mockResolvedValue(null),
    getGenerations: jest.fn().mockResolvedValue([]),
    getFavorites: jest.fn().mockResolvedValue([]),
    toggleFavorite: jest.fn().mockResolvedValue(true),
    deleteGeneration: jest.fn().mockResolvedValue(undefined),
    searchGenerations: jest.fn().mockResolvedValue([]),
  },
  platform: 'test',
  isElectron: false,
};

