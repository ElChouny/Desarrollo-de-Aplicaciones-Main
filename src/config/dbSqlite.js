import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync("session.db");

export const init = async () => {
    try {
        db.transaction(tx => {
            tx.executeSql(`
                PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS sessionUser ( localId TEXT PRIMARY KEY NOT NULL,email TEXT NOT NULL, idToken TEXT NOT NULL );
            `);
        });
        console.log('Database initialized and table created.');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
};

export const insertSession = async (localId, email, idToken) => {
    try {
        console.log('Opening database...');
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO sessionUser (localId, email, idToken) VALUES (?, ?, ?)`,
                [localId, email, idToken],
                (_, result) => {
                    console.log('Session inserted:', { localId, email, idToken });
                },
                (_, error) => {
                    console.error('Error inserting session:', error);
                    return false;
                }
            );
        });
    } catch (error) {
        console.error('Error inserting session:', error);
        throw error;
    }
};

export const fetchSession = async () => {
    try {
        console.log('Opening database...');
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM sessionUser LIMIT 1`,
                    [],
                    (_, { rows }) => {
                        const sessionUser = rows.length > 0 ? rows.item(0) : null;
                        console.log('Session fetched:', sessionUser);
                        resolve(sessionUser);
                    },
                    (_, error) => {
                        console.error('Error fetching session:', error);
                        reject(error);
                        return false;
                    }
                );
            });
        });
    } catch (error) {
        console.error('Error fetching session:', error);
        return null;
    }
};

export const deleteSesion = async () => {
    try {
        console.log('Opening database...');
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM sessionUser`,
                [],
                (_, result) => {
                    console.log('Session deleted.');
                },
                (_, error) => {
                    console.error('Error deleting session:', error);
                    return false;
                }
            );
        });
    } catch (error) {
        console.error('Error deleting session:', error);
        throw error;
    }
};

export default db;