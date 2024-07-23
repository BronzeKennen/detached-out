import Database from "better-sqlite3";

const db = new Database('./database.db');

db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fname TEXT NOT NULL,
    lname TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL

)`);

export function getUsers() {
    const stmt = db.prepare('SELECT * FROM users');
    return stmt.all();
}

export function addUser(fname,lname,email,password) {
    const stmt = db.prepare('INSERT INTO users (fname,lname,email,password) VALUES (?,?,?,?)');
    return stmt.run(fname,lname,email,password);
}