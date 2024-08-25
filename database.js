import Database from "better-sqlite3";
import bcrypt from 'bcryptjs'

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
    date_of_birth DATETIME,
    biography TEXT,
    country_of_residence TEXT,
    state TEXT,
    current_company INTEGER,
    job_title INTEGER,
    university INTEGER,
    FOREIGN KEY (current_company) REFERENCES Companies(CompanyId),
    FOREIGN KEY (job_title) REFERENCES JobTitles(JobTitleId),
    FOREIGN KEY (university) REFERENCES Universities(UniversityId)
)`);

db.exec(`CREATE TABLE IF NOT EXISTS notifications (
    NotificationId INTEGER PRIMARY KEY AUTOINCREMENT,
    UserFrom INTEGER NOT NULL,
    UserTo INTEGER NOT NULL,
    type TEXT NOT NULL,
    FOREIGN KEY (UserFrom) REFERENCES users(UserId),
    FOREIGN KEY (UserTo) REFERENCES users(UserId)
)`);

db.exec(`CREATE TABLE IF NOT EXISTS Companies (
    CompanyId INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL UNIQUE

)`);

db.exec(`CREATE TABLE IF NOT EXISTS Universities (
    UniversityId INTEGER PRIMARY KEY AUTOINCREMENT,
    university_name TEXT NOT NULL UNIQUE,
    major TEXT NOT NULL
)`);

db.exec(`CREATE TABLE IF NOT EXISTS JobTitles (
    JobTitleId INTEGER PRIMARY KEY AUTOINCREMENT,
    JobTitle TEXT NOT NULL UNIQUE 
)`);

db.exec(`CREATE TABLE IF NOT EXISTS work_experience (
    ExperienceId INTEGER PRIMARY KEY AUTOINCREMENT,
    UserId INTEGER NOT NULL,
    JobTitleId INTEGER NOT NULL,
    CompanyId INTEGER NOT NULL,
    StartDate TEXT NOT NULL,
    EndDate TEXT,
    Private BOOLEAN,
    FOREIGN KEY (UserId) REFERENCES users(UserId),
    FOREIGN KEY (JobTitleId) REFERENCES JobTitles(JobTitleId),
    FOREIGN KEY (CompanyId) REFERENCES Companies(CompanyId)   
)`);

db.exec(`CREATE TABLE IF NOT EXISTS posts (
    PostId INTEGER PRIMARY KEY AUTOINCREMENT,
    UserId INTEGER NOT NULL,
    LikeCount INTEGER DEFAULT 0,
    RepostCount INTEGER DEFAULT 0,
    CommentCount INTEGER DEFAULT 0,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(UserId) REFERENCES users(UserId)

)`);

db.exec(`CREATE TABLE IF NOT EXISTS comments (
    CommentId INTEGER PRIMARY KEY AUTOINCREMENT,
    PostId INTEGER NOT NULL,
    UserFrom INTEGER NOT NULL,
    Content TEXT NOT NULL,
    FOREIGN KEY(PostId) REFERENCES posts(PostId),
    FOREIGN KEY(UserFrom) REFERENCES users(UserId)
)`);

db.exec(`INSERT OR IGNORE INTO JobTitles (JobTitle) VALUES
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

db.exec(`CREATE TABLE IF NOT EXISTS friends (
    FriendId INTEGER PRIMARY KEY AUTOINCREMENT,
    Sender INTEGER NOT NULL,
    Recipient INTEGER NOT NULL,
    Status TEXT DEFAULT 'pending',
    DateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Sender) REFERENCES users(UserId),
    FOREIGN KEY (Recipient) REFERENCES users(UserId),
    UNIQUE (Sender, Recipient)
)`);


export function sendFriendRequest(idSender,idRecipient) {
    const stmt = db.prepare('INSERT INTO friends (Sender,Recipient,Status) VALUES (?,?,\'pending\');');
    console.log(getAll());
    return stmt.run(idSender,idRecipient);
}

export function acceptFriendRequest(idSender,idRecipient) {
    const stmt = db.prepare('UPDATE friends SET Status = \'accepted\' WHERE Sender = ? AND Recipient = ?');
    const resp =  stmt.run(idSender,idRecipient);
    return resp.changes > 0;
}

export function rejectFriendRequest(idSender,idRecipient) {
    const stmt = db.prepare('UPDATE friends SET Status = \'rejected\' WHERE Sender = ? AND Recipient = ?');
    const resp =  stmt.run(idSender,idRecipient);
    return resp.changes > 0;
}

export function getAll() {
    const stmt = db.prepare('SELECT * FROM friends ;');
    return stmt.all();

}

export function getFriends(id) {
    const stmt = db.prepare('SELECT * FROM friends WHERE Recipient = ? OR Sender = ?;');
    return stmt.all(id,id);
}


export function getNotifications(id) {
    const stmt = db.prepare('SELECT * FROM notifications WHERE UserTo = ?;');
    return stmt.all(id);
}

export function getUsers() {
    const stmt = db.prepare('SELECT * FROM users');
    return stmt.all();
}

export function getUserById(id) {
    const stmt = db.prepare('SELECT * FROM users WHERE UserId = ?');
    return stmt.get(id);
}
export function getUserByName(name) {
    const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
    return stmt.get(name);
}

export function getCompanies() {
    const stmt = db.prepare('SELECT * FROM Companies');
    return stmt.all();
}

export function getUniversityById(id) {
    const stmt = db.prepare('SELECT * FROM Universities WHERE UniversityId = ?');
    return stmt.get(id);
}

export function getCompanyById(id) {
    const stmt = db.prepare('SELECT * FROM Companies WHERE CompanyId = ?');
    return stmt.get(id)
}

export function getJobTitleById(id) {
    const stmt = db.prepare('SELECT * FROM JobTitles WHERE JobTitleId = ?');
    return stmt.get(id)
}

export function getJobTitleByName(name) {
    const stmt = db.prepare('SELECT * FROM JobTitles WHERE JobTitle = ?');
    return stmt.get(name);
}

export function getCompanyByName(name) {
    const stmt = db.prepare('SELECT * FROM Companies WHERE company_name = ?');
    return stmt.get(name);
}

export function getUniversityByName(name) {
    const stmt = db.prepare('SELECT * FROM Universities WHERE university_name = ?');
    return stmt.get(name);
}

export function addUser(username, fname, lname, email, password) {
    const stmt = db.prepare('INSERT INTO users (username,fname,lname,email,password) VALUES (?,?,?,?,?)');
    return stmt.run(username, fname, lname, email, password);
}

export function findUserByEmail(email) {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
}

export function getWorkExperienceById(id) {
    const stmt = db.prepare('SELECT * FROM work_experience WHERE UserId = ?');
    return stmt.all(id);
}

export function getWorkExperience() {
    const stmt = db.prepare('SELECT * FROM work_experience');
    return stmt.get();
}

export function updateUserCredentials(updatedata) {
    let query = `UPDATE users SET email = ? WHERE UserId = ?`
    let stmt = db.prepare(query);
    let res = stmt.run(updatedata.email,updatedata.UserId);
    if (res.changes === 0) return 2;
    query = `UPDATE users SET username = ? WHERE UserId = ?`
    stmt = db.prepare(query);
    res = stmt.run(updatedata.username,updatedata.UserId);
    return res.changes > 0;

}

export function updateWorkExperience(id,updatedata) {
    // console.log('===>',updatedata);

    let company = updatedata.employer
    let compId = getCompanyByName(company);
    if (compId === undefined) {
        const companyQuery = db.prepare('INSERT OR IGNORE INTO Companies (company_name) VALUES (?)');
        let res = companyQuery.run(company)
        compId = res.lastInsertRowid;
    } else {
        compId = compId.CompanyId;
    }

    let jobTitle = updatedata.JobTitle;
    let titleId = getJobTitleByName(jobTitle);
    if(titleId === undefined) {
        const titleQuery = db.prepare('INSERT OR IGNORE INTO JobTitles (JobTitle) VALUES (?)');
        let res = titleQuery.run(jobTitle);
        titleId = res.lastInsertRowid;
    } else {
        titleId = titleId.JobTitleId;
    }
    let query,result;
    if(updatedata.private) updatedata.private = 1;
    else  updatedata.private = 0;
    if(updatedata.newExp) {
        query = `INSERT INTO work_experience (UserId,CompanyId,JobTitleId,StartDate,EndDate,Private) VALUES (?,?,?,?,?,?)`
        const stmt = db.prepare(query);
        result = stmt.run(id,compId,titleId,updatedata.from,updatedata.to,updatedata.private)
        console.log(result)
    } else {
        const query = 'UPDATE work_experience SET CompanyId = ?, JobTitleId = ?, StartDate = ?, EndDate = ?, Private = ? WHERE UserId = ? AND ExperienceId = ?';
        const stmt = db.prepare(query);
        result = stmt.run(compId,titleId,updatedata.from,updatedata.to,updatedata.private,id,updatedata.expId)
    }
    //put logic to update instead of insert if needed
    return result.changes > 0;
}

export async function updatePassword(updatedata) {
    const oldPass = updatedata.oldPass;
    const confirmPass = updatedata.confirmPass;
    const toChange = updatedata.newPass;
    if (toChange.localeCompare(confirmPass) !== 0) {
        return false;
    } else {
        const user = getUserById(updatedata.UserId);
        const users = getUsers();
        const test = await bcrypt.compare(oldPass,user.password)
        if(!test) return false;
        const hashedPassword = await bcrypt.hash(toChange, 10);
        const query = `UPDATE users SET password = ? WHERE UserId = ?`
        const stmt = db.prepare(query);
        const result = stmt.run(hashedPassword, updatedata.UserId);
        return result.changes > 0;
    }
}


export function updateMandInfobyId(id, updateData, partial = false) {
    if (partial) {
        let filteredUpdateData = { ...updateData };
        delete filteredUpdateData.UserId;

        if (Object.keys(filteredUpdateData).length > 0) {
            const columns = Object.keys(filteredUpdateData).map(key => `${key} = ?`).join(', ')
            const values = Object.values(updateData);
            values.shift(); //remove id shitty indexing reasons don't ask
            const query = `UPDATE users SET ${columns} WHERE UserId = ?`;
            const stmt = db.prepare(query);
            const result = stmt.run([...values, id]);
            return result.changes > 0;
        } else {
            console.log('uh oh')
        }
    } 
    // else { //not yet
        // const { username, fname, lname, email, password, profile_pic_url, biography, education, country_of_residence, state, current_company, job_title } = updateData;
        // const query = `UPDATE users SET username = ?, fname = ?, lname = ?, email = ?, password = ?, profile_pic_url = ?, biography = ?, education = ?, country_of_residence = ?, state = ?, current_company = ?, job_title = ? WHERE UserId = ?`;
        // const stmt = db.prepare(query);
        // const result = stmt.run(username, fname, lname, email, password, profile_pic_url, biography, education, country_of_residence, state, current_company, job_title, id);
        // return result.changes > 0;
    // }
}

export function updateEducationById(id,updateData) {
    let filteredUpdateData = {...updateData};
    delete filteredUpdateData.UserId;
    let uniId;

    let education = getUniversityByName(updateData.university_name);
    if(education === undefined) {
        const uniQuery = db.prepare('INSERT OR IGNORE INTO Universities (university_name,major) VALUES(?,?)')
        let res = uniQuery.run(filteredUpdateData.university_name,filteredUpdateData.major);
        uniId = res.lastInsertRowid;
    } else {
        uniId = education.UniversityId;
    }
    console.log(uniId,id);
    const query = `UPDATE users SET university = ? WHERE UserId = ?`
    const stmt = db.prepare(query)
    let res = stmt.run(uniId,id);
    console.log(getUsers());
    console.log(res);
    return res.changes > 0;

}

export function updateEmploymentById(id,updateData) {
    let filteredUpdateData = { ...updateData };
    delete filteredUpdateData.UserId;


    let diffFields = ['UserId', 'current_company', 'job_title']
    let filteredData = Object.fromEntries(
        Object.entries(filteredUpdateData).filter(
            ([key, value]) => diffFields.includes(key) && value !== null && value !== ''
        )
    );

    const columns = Object.keys(filteredData).map(key => `${key} = ?`).join(', ')
    const values = Object.values(filteredData);

    let company;
    if ('current_company' in filteredData) {
        company = getCompanyByName(values[0]);
        if (company === undefined) {
            const companyQuery = db.prepare('INSERT OR IGNORE INTO Companies (company_name) VALUES (?)');
            let res = companyQuery.run(values[0])
            values[0] = res.lastInsertRowid;
            console.log(res.changes)
        } else {
            values[0] = company.CompanyId;
        }
    }

    let job_title;
    if ('job_title' in filteredData) {
        let index = 0;
        if ('current_company' in filteredData) index = 1;
        job_title = getJobTitleByName(values[index]);
        if (job_title === undefined) {
            const titleQuery = db.prepare('INSERT OR IGNORE INTO JobTitles (JobTitle) VALUES (?)')
            let res;
            res = titleQuery.run(values[index])
            values[index] = res.lastInsertRowid;
        } else {
            values[index] = job_title.JobTitleId;
        }
    }
    const query = `UPDATE users SET ${columns} WHERE UserId = ?`
    const stmt = db.prepare(query);
    const result = stmt.run([...values, id])
    return result.changes > 0;
}