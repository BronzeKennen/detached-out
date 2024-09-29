
import db from './database.js'

export function getImpressionsByUserId(userId) {
    const stmt = db.prepare('SELECT * FROM impressions WHERE UserId = ?');
    return stmt.all(userId);
}
export function getImpressionsByPostId(postId) {
    const stmt = db.prepare('SELECT * FROM impressions WHERE PostId = ?');
    return stmt.all(postId);
}



export function getJobsByUserIdPaged(userId,page,limit) {
    const offset = (page-1)*limit - limit;
    const stmt = db.prepare('SELECT * FROM job_adverts WHERE PosterId = ? ORDER BY DateCreated DESC LIMIT ? OFFSET ?');
    const resp = stmt.all(userId,limit,offset)
    return resp;
}
export function getJobsByUserId(userId) {
    const stmt = db.prepare('SELECT * FROM job_adverts WHERE PosterId = ?');
    return stmt.all(userId);
}

export function getJobImpressionsByUserId(userId) {
    const stmt = db.prepare('SELECT * FROM job_impressions WHERE UserId = ?');
    return stmt.all(userId);
}

export function getAllJobImpressions() {
    const stmt = db.prepare('SELECT * FROM job_impressions');
    return stmt.all();
}

export function getPostsByUserIdPaged(userId,page,limit) {
    const offset = (page-1)*limit - limit;
    const stmt = db.prepare('SELECT * FROM posts WHERE UserId = ? ORDER BY CreatedAt DESC LIMIT ? OFFSET ?') 
    const resp = stmt.all(userId,limit,offset)
    for (const line of resp) {
        line.Comments = getCommentsById(line.PostId)
        line.Likes = getLikesById(line.PostId, 'post')
    }
    return resp;
}

export function getLatestFriendPostsByUserIdPaged(userId,page,limit) {
    let offset = (page-1)*limit - limit;
    if(page === 1) offset = 0;
    const friends = getAcceptedFriends(userId)
    let allFriendPosts = [];
    for(const friend of friends) {
        const friendPosts = db.prepare('SELECT * FROM posts WHERE UserId = ?');
        let resp;
        if(friend.Sender === userId)
            resp = friendPosts.all(friend.Recipient)
        else 
            resp = friendPosts.all(friend.Sender)
    
        allFriendPosts = [...allFriendPosts,...resp]        

    }
    allFriendPosts.sort((b, a) => new Date(a.CreatedAt) - new Date(b.CreatedAt));
    for (const line of allFriendPosts) {
        line.Comments = getCommentsById(line.PostId)
        line.Likes = getLikesById(line.PostId, 'post')
    }
    return allFriendPosts.slice(offset,offset+limit);
}

export function getRecommendedPostsByUserIdPages(userId,page,limit) {
    let offset = (page )*limit - limit;
    if(page === 1) offset = 0;    
    const stmt = db.prepare('SELECT * FROM post_scores WHERE UserId = ? ORDER BY score DESC') 
    const scores = stmt.all(userId)
    const filteredScores = scores.filter(score => {
        let post = getPostById(score.PostId);
        if(!post.length) return false;
        post = post[0]
        for(const comment of post.Comments) {
            if(comment.UserFrom.UserId === userId) return false;
        }
        for(const like of post.Likes) {
            if(like.SenderId === userId) return false;

        }
        return post.UserId !== userId;
    });
    let posts = []
    for(let i = offset; i < offset+limit; i++) {
        posts = [...posts, ...getPostById(filteredScores[i].PostId)];
    }
    return posts;

}

export function getPostById(postId) {
    const stmt = db.prepare('SELECT * FROM posts WHERE PostId = ?')
    const resp = stmt.all(postId);
    for (const line of resp) {
        line.Comments = getCommentsById(line.PostId)
        line.Likes = getLikesById(line.PostId, 'post')
    }
    return resp;
}

export function getPostsByUserId(userId) {
    const stmt = db.prepare('SELECT * FROM posts WHERE UserId = ? ORDER BY CreatedAt DESC')
    const resp = stmt.all(userId)
    for(const line of resp) {
        line.Comments = getCommentsById(line.PostId)
        line.Likes = getLikesById(line.PostId, 'post')
    }
    return resp;
}

export function getCommentsById(postId) {
    const stmt = db.prepare('SELECT * FROM comments WHERE PostId = ?');
    const resp = stmt.all(postId);
    for (const line of resp) {
        line.UserFrom = getUserById(line.UserFrom);
        line.UserFrom = {
            username: line.UserFrom.username,
            UserId: line.UserFrom.UserId,
            profile_pic_url: line.UserFrom.profile_pic_url
        }
        line.Likes = getLikesById(line.CommentId, 'comment');

    }
    return resp;
}

export function getCommentById(commentId) {
    const stmt = db.prepare('SELECT * FROM comments WHERE CommentId = ?');
    let resp = stmt.all(commentId);
    for (const comment of resp) {
        comment.UserFrom = getUserById(comment.UserFrom);
        comment.UserFrom = {
            UserFrom: comment.UserFrom.UserId,
            username: comment.UserFrom.username,
            profile_pic_url: comment.UserFrom.profile_pic_url
        }
    }
    return resp;
}

export function getLikesById(postId, type) {
    let stmt;
    stmt = db.prepare('SELECT * FROM likes where EntityId = ? AND EntityType = ?');
    return stmt.all(postId, type);
}

export function getAllPosts() {
    const stmt = db.prepare('SELECT * FROM posts ORDER BY createdAt DESC;')
    const resp = stmt.all();
    for (const line of resp) {
        line.Comments = getCommentsById(line.PostId)
        line.Likes = getLikesById(line.PostId, 'post')
    }
    return resp;
}


export function getAllFriends() {
    const stmt = db.prepare('SELECT * FROM friends ;');
    return stmt.all();

}

export function getFriends(id) {
    const stmt = db.prepare('SELECT * FROM friends WHERE Recipient = ? OR Sender = ?;');
    return stmt.all(id, id);
}

export function getAcceptedFriends(id) {
    const stmt = db.prepare('SELECT * FROM friends WHERE (Recipient = ? OR Sender = ?) AND Status = \'accepted\';');
    return stmt.all(id, id);
}

export function getPostScoresByUserId(userId) {
    const stmt = db.prepare('SELECT * FROM post_scores WHERE UserId = ?');
    return stmt.all(userId)
}

export function getNotifications(id) {
    const stmt = db.prepare('SELECT * FROM notifications WHERE UserTo = ? ORDER BY DateCreated DESC;');
    const resp = stmt.all(id);
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
    const stmt = db.prepare('SELECT * FROM user_skills;')
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


export function getUserSkillsById(UserId, Type) {
    const stmt = db.prepare('SELECT * FROM user_skills WHERE ObjectId = ? AND Type = ? ');
    return stmt.all(UserId, Type);
}

export function getAllJobs() {
    const stmt = db.prepare('SELECT * FROM job_adverts ORDER BY DateCreated DESC');
    return stmt.all();
}
export function getAllJobsPaged(id,page,limit) {
    const offset = (page-1)*limit - limit;
    const stmt = db.prepare('SELECT * FROM job_adverts WHERE PosterId != ? ORDER BY DateCreated DESC LIMIT ? OFFSET ?');
    return stmt.all(id,limit,offset);
}


export function getConversationBySender(senderId, receiverId) {
    const stmt = db.prepare('SELECT * FROM chat_messages WHERE (SenderId = ? AND RecipientId = ?) OR (SenderId = ? AND RecipientId = ?) ORDER BY DateCreated ASC');
    return stmt.all(senderId, receiverId, receiverId, senderId);
}

export function getFriendShipStatus(senderId, recipientId) {
    const stmt = db.prepare('SELECT Status FROM friends WHERE (Sender = ? AND Recipient = ?) OR (Recipient = ? AND Sender = ?)')
    return stmt.get(senderId, recipientId, senderId, recipientId);
}
export function getChatBubbles(senderId) {
    const stmt = db.prepare(` SELECT DISTINCT
                                CASE 
                                    WHEN SenderId < RecipientId THEN SenderId 
                                    ELSE RecipientId 
                                END AS FirstId,
                                CASE 
                                    WHEN SenderId < RecipientId THEN RecipientId 
                                    ELSE SenderId 
                                END AS SecondId
                            FROM chat_messages
                            WHERE SenderId = ? OR RecipientId = ?
                            ORDER BY FirstId, SecondId;
                            `)
    return stmt.all(senderId, senderId);
}


export function getJobApplicationsByAdvertId(advertId) {
    const stmt = db.prepare('SELECT * FROM job_applications WHERE AdvertId = ?');
    const resp = stmt.all(advertId);
    return resp;
}

export function getAllApplications() {
    const stmt = db.prepare('SELECT * FROM job_applications')
    const resp = stmt.all();
    return resp;
}