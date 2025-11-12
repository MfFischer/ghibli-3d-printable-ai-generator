/**
 * Core type definitions for the application
 */

export interface BaseImage {
  data: string;
  mimeType: string;
}

export type ArtStyle = 
  | 'Ghibli-esque'
  | 'Pixar 3D'
  | 'Claymation'
  | 'Modern Anime'
  | 'Action Figure';

export interface GenerationOptions {
  prompt: string;
  style: ArtStyle;
  baseImage?: BaseImage | null;
}

export interface GenerationResult {
  imageUrl: string;
  timestamp: number;
  prompt: string;
  style: ArtStyle;
}

export interface AppSettings {
  apiKey: string;
  theme: 'light' | 'dark';
  defaultStyle: ArtStyle;
  saveHistory: boolean;
}

export interface OpenSCADOptions {
  modelName: string;
  baseWidth?: number;
  baseDepth?: number;
  baseHeight?: number;
  includeStand?: boolean;
}

