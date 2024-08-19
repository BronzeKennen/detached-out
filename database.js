import Database from "better-sqlite3";

const db = new Database('./database.db');

db.exec(`CREATE TABLE IF NOT EXISTS users (
    UserId INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    fname TEXT NOT NULL,
    lname TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    profile_pic_url TEXT
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    biography TEXT,
    education TEXT,
    current_company TEXT,
    proffession TEXT
)`);

db.exec(`CREATE TABLE IF NOT EXISTS Companies (
    CompanyId INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL

)`);

db.exec(`CREATE TABLE IF NOT EXISTS JobTitles (
    JobTitleId INTEGER PRIMARY KEY AUTOINCREMENT,
    JobTitle TEXT NOT NULL UNIQUE    
)`);

db.exec(`CREATE TABLE IF NOT EXISTS work_experience (
    ExperienceId INTEGER PRIMARY KEY,
    UserId INTEGER NOT NULL,
    JobTitleId INTEGER NOT NULL,
    CompanyId INTEGER NOT NULL,
    StartDate TEXT NOT NULL,
    EndDate TEXT,
    FOREIGN KEY (UserId) REFERENCES users(UserId),
    FOREIGN KEY (JobTitleId) REFERENCES JobTitles(JobTitleId),
    FOREIGN KEY (CompanyId) REFERENCES Companies(CompanyId)   
)`);

db.exec(`CREATE TABLE IF NOT EXISTS posts (
    UserId INTEGER NOT NULL,
    LikeCount INTEGER DEFAULT 0,
    RepostCount INTEGER DEFAULT 0,
    CommentCount INTEGER DEFAULT 0,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(UserId) REFERENCES users(UserId)

)`);

export function getUsers() {
    const stmt = db.prepare('SELECT * FROM users');
    return stmt.all();
}

export function addUser(username,fname,lname,email,password) {
    const stmt = db.prepare('INSERT INTO users (username,fname,lname,email,password) VALUES (?,?,?,?,?)');
    return stmt.run(username,fname,lname,email,password);
}

export function findUserByEmail(email) {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
}