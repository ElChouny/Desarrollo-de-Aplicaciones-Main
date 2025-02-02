import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseAsync("sessionUser.db");

export const createSessionTable = async () => {
    const access = await db;
    await access.execAsync(`
        CREATE TABLE IF NOT EXISTS sessionUser (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, idToken TEXT NOT NULL)
        `);
    (error) => {
        console.error('Error initializing database:', error);
    };
};

export const insertSession = async ({ email, localId, idToken }) => {
    const access = await db;
    const result = await access.runAsync('INSERT INTO sessionUser (localId, email, idToken) VALUES (?, ?, ?)', email, localId, idToken);
};

export const fetchSession = async () => {
    const access = await db;
    const result = await access.getAllAsync
        ('SELECT * FROM sessionUser');
    return result;
};

export const clearSessions = async () => {
    const access = await db;
    const result = await access.runAsync('DELETE FROM sessionUser');
};