
import db from  './database'

export function getPostById(postId) {
    const stmt = db.prepare('SELECT * FROM posts WHERE PostId = ?')
    const resp = stmt.all(postId);
    for(const line of resp) {
        line.Comments = getCommentsById(line.PostId)
        line.Likes = getLikesById(line.PostId,'post')
    }
    return resp;
}

export function getCommentsById(postId) {
    const stmt = db.prepare('SELECT * FROM comments WHERE PostId = ?');
    const resp = stmt.all(postId);
    for(const line of resp) {
        line.UserFrom = getUserById(line.UserFrom);
        line.UserFrom = {
            username: line.UserFrom.username,
            UserId: line.UserFrom.UserId,
            profile_pic_url: line.UserFrom.profile_pic_url
        }
        line.Likes = getLikesById(line.CommentId,'comment');
        
    }
    return resp;
}

export function getCommentById(commentId) {
    const stmt = db.prepare('SELECT * FROM comments WHERE CommentId = ?');
    let resp = stmt.all(commentId);
    for(const comment of resp) {
        comment.UserFrom = getUserById(comment.UserFrom);
        comment.UserFrom = {
            UserFrom : comment.UserFrom.UserId,
            username: comment.UserFrom.username,
            profile_pic_url: comment.UserFrom.profile_pic_url
        }
    }
    return resp;
} 

export function getLikesById(postId,type) {
    let stmt;
    stmt = db.prepare('SELECT * FROM likes where EntityId = ? AND EntityType = ?');
    return stmt.all(postId,type);
}

export function getAllPosts() {
    const stmt = db.prepare('SELECT * FROM posts ORDER BY createdAt DESC;')
    const resp = stmt.all();
    for(const line of resp) {
        line.Comments = getCommentsById(line.PostId)
        line.Likes = getLikesById(line.PostId,'post')
    }
    return resp;
}


export function getAllFriends() {
    const stmt = db.prepare('SELECT * FROM friends ;');
    return stmt.all();

}

export function getFriends(id) {
    const stmt = db.prepare('SELECT * FROM friends WHERE Recipient = ? OR Sender = ?;');
    return stmt.all(id,id);
}


export function getNotifications(id) {
    const stmt = db.prepare('SELECT * FROM notifications WHERE UserTo = ? ORDER BY DateCreated DESC;');
    const resp =  stmt.all(id);
    console.log(resp)
    return resp;
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


export function getWorkExperienceById(id) {
    const stmt = db.prepare('SELECT * FROM work_experience WHERE UserId = ?');
    return stmt.all(id);
}

export function getWorkExperience() {
    const stmt = db.prepare('SELECT * FROM work_experience');
    return stmt.get();
}

export function getAllSkills() {
    const stmt = db.prepare('SELECT * FROM skills;')
    const resp = stmt.all();
    return resp;
}

export function getSkillByName(skillName) {
    const stmt = db.prepare('SELECT * FROM softskills WHERE SkillName = ?');
    return stmt.get(skillName);
}

export function getSkillById(skillId) {
    const stmt = db.prepare('SELECT SkillName FROM softskills WHERE SkillId = ?');
    return stmt.get(skillId);
}


export function getUserSkillsById(UserId) {
    const stmt = db.prepare('SELECT * FROM user_skills WHERE UserId = ?');
    return stmt.all(UserId);
}