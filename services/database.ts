import Database from 'better-sqlite3';
import path from 'path';
import { app } from 'electron';
import { ArtStyle } from '../types';

export interface GenerationRecord {
  id: number;
  prompt: string;
  style: ArtStyle;
  imageUrl: string;
  timestamp: number;
  favorite: boolean;
}

let db: Database.Database | null = null;

export const initDatabase = (): Database.Database => {
  if (db) return db;

  const userDataPath = app.getPath('userData');
  const dbPath = path.join(userDataPath, 'generations.db');

  db = new Database(dbPath);

  // Create table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS generations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      prompt TEXT NOT NULL,
      style TEXT NOT NULL,
      imageUrl TEXT NOT NULL,
      timestamp INTEGER NOT NULL,
      favorite INTEGER DEFAULT 0
    )
  `);

  // Create index for faster queries
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_timestamp ON generations(timestamp DESC);
    CREATE INDEX IF NOT EXISTS idx_favorite ON generations(favorite);
  `);

  return db;
};

export const closeDatabase = (): void => {
  if (db) {
    db.close();
    db = null;
  }
};

export const saveGeneration = (
  prompt: string,
  style: ArtStyle,
  imageUrl: string
): GenerationRecord => {
  const database = initDatabase();
  const timestamp = Date.now();

  const stmt = database.prepare(`
    INSERT INTO generations (prompt, style, imageUrl, timestamp, favorite)
    VALUES (?, ?, ?, ?, 0)
  `);

  const result = stmt.run(prompt, style, imageUrl, timestamp);

  return {
    id: result.lastInsertRowid as number,
    prompt,
    style,
    imageUrl,
    timestamp,
    favorite: false,
  };
};

export const getGenerations = (limit = 50, offset = 0): GenerationRecord[] => {
  const database = initDatabase();

  const stmt = database.prepare(`
    SELECT id, prompt, style, imageUrl, timestamp, favorite
    FROM generations
    ORDER BY timestamp DESC
    LIMIT ? OFFSET ?
  `);

  const rows = stmt.all(limit, offset) as Array<{
    id: number;
    prompt: string;
    style: string;
    imageUrl: string;
    timestamp: number;
    favorite: number;
  }>;

  return rows.map((row) => ({
    ...row,
    style: row.style as ArtStyle,
    favorite: row.favorite === 1,
  }));
};

export const getFavorites = (): GenerationRecord[] => {
  const database = initDatabase();

  const stmt = database.prepare(`
    SELECT id, prompt, style, imageUrl, timestamp, favorite
    FROM generations
    WHERE favorite = 1
    ORDER BY timestamp DESC
  `);

  const rows = stmt.all() as Array<{
    id: number;
    prompt: string;
    style: string;
    imageUrl: string;
    timestamp: number;
    favorite: number;
  }>;

  return rows.map((row) => ({
    ...row,
    style: row.style as ArtStyle,
    favorite: true,
  }));
};

export const toggleFavorite = (id: number): boolean => {
  const database = initDatabase();

  const stmt = database.prepare(`
    UPDATE generations
    SET favorite = CASE WHEN favorite = 0 THEN 1 ELSE 0 END
    WHERE id = ?
  `);

  stmt.run(id);

  const getStmt = database.prepare('SELECT favorite FROM generations WHERE id = ?');
  const result = getStmt.get(id) as { favorite: number } | undefined;

  return result?.favorite === 1;
};

export const deleteGeneration = (id: number): void => {
  const database = initDatabase();
  const stmt = database.prepare('DELETE FROM generations WHERE id = ?');
  stmt.run(id);
};

export const searchGenerations = (query: string): GenerationRecord[] => {
  const database = initDatabase();

  const stmt = database.prepare(`
    SELECT id, prompt, style, imageUrl, timestamp, favorite
    FROM generations
    WHERE prompt LIKE ? OR style LIKE ?
    ORDER BY timestamp DESC
  `);

  const searchTerm = `%${query}%`;
  const rows = stmt.all(searchTerm, searchTerm) as Array<{
    id: number;
    prompt: string;
    style: string;
    imageUrl: string;
    timestamp: number;
    favorite: number;
  }>;

  return rows.map((row) => ({
    ...row,
    style: row.style as ArtStyle,
    favorite: row.favorite === 1,
  }));
};

