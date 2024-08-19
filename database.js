import Database from "better-sqlite3";

const db = new Database('./database.db');


db.exec(`CREATE TABLE IF NOT EXISTS users (
    UserId INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    fname TEXT NOT NULL,
    lname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    profile_pic_url TEXT,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    biography TEXT,
    education TEXT,
    country_of_residence TEXT,
    state TEXT,
    current_company INTEGER,
    job_title INTEGER,
    FOREIGN KEY (current_company) REFERENCES Companies(CompanyId),
    FOREIGN KEY (job_title) REFERENCES JobTitles(JobTitleId)
)`);

db.exec(`CREATE TABLE IF NOT EXISTS Companies (
    CompanyId INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL UNIQUE

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

db.exec( `INSERT OR IGNORE INTO JobTitles (JobTitle) VALUES
('Software Engineer'),
('Product Manager'),
('Data Scientist'),
('UX/UI Designer'),
('Marketing Specialist'),
('Financial Analyst'),
('Sales Manager'),
('Human Resources Manager'),
('Project Coordinator'),
('Network Administrator'),
('Content Writer'),
('Customer Support Representative'),
('Quality Assurance Engineer'),
('Business Development Executive'),
('Operations Manager'),
('Graphic Designer'),
('IT Support Specialist'),
('Account Manager'),
('Research Scientist'),
('Mobile App Developer');
`);

export function getUsers() {
    const stmt = db.prepare('SELECT * FROM users');
    return stmt.all();
}

export function getUserById(id) {
    const stmt = db.prepare('SELECT * FROM users WHERE UserId = ?');
    return stmt.get(id);
}

export function addUser(username,fname,lname,email,password) {
    const stmt = db.prepare('INSERT INTO users (username,fname,lname,email,password) VALUES (?,?,?,?,?)');
    return stmt.run(username,fname,lname,email,password);
}

export function findUserByEmail(email) {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
}

export function updateUserById(id, updateData, partial = false) {
    if (partial) {
        const filteredUpdateData = { ...updateData };
        delete filteredUpdateData.UserId;
        const columns = Object.keys(filteredUpdateData).map(key => `${key} = ?`).join(', ')
        const values = Object.values(updateData);
        id = values.shift();
        const query = `UPDATE users SET ${columns} WHERE UserId = ?`;
        const stmt = db.prepare(query);
        const result = stmt.run([...values, id]);
        return result.changes > 0;
    } else { //not yet
        // const { username, fname, lname, email, password, profile_pic_url, biography, education, country_of_residence, state, current_company, job_title } = updateData;
        // const query = `UPDATE users SET username = ?, fname = ?, lname = ?, email = ?, password = ?, profile_pic_url = ?, biography = ?, education = ?, country_of_residence = ?, state = ?, current_company = ?, job_title = ? WHERE UserId = ?`;
        // const stmt = db.prepare(query);
        // const result = stmt.run(username, fname, lname, email, password, profile_pic_url, biography, education, country_of_residence, state, current_company, job_title, id);
        // return result.changes > 0;
    }
}