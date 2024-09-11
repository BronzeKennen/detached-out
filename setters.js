
import { getCompanyByName,getJobTitleByName,getSkillByName,getUniversityByName,getUserById,getUsers } from "./getters.js";
import db from  './database.js'
import bcrypt from 'bcryptjs'

export function newLike(userId,postId,type) {
    let stmt;
    stmt = db.prepare('INSERT INTO likes (EntityId,SenderId,EntityType) VALUES (?,?,?)');
    return stmt.run(postId,userId,type)
}

export function removeLike(userId,postId,type) {
    const stmt = db.prepare('DELETE FROM likes WHERE EntityId = ? AND SenderId = ? AND EntityType = ?');
    return stmt.run(postId,userId,type)
}

export function newComment(userId,postId,content) {
    const stmt = db.prepare('INSERT INTO comments (UserFrom,PostId,Content) VALUES (?,?,?)');
    return stmt.run(userId,postId,content);
}

export function changeProfilePicture(UserId,url) {
    const stmt = db.prepare('UPDATE users SET profile_pic_url = ? WHERE UserId = ?');
    return stmt.run(url,UserId)

}

export function newPost(UserId,postData) {
    const imagesForDb = JSON.stringify(postData.images)
    const stmt = db.prepare('INSERT INTO posts (UserId,Content,ImagesJson) VALUES (?,?,?);')
    return stmt.run(UserId,postData.content,imagesForDb);

}


export function addNewSkills(UserId,skills,type) {
    for (const skill of skills) {
        let skillId = getSkillByName(skill);
        const stmt = db.prepare('INSERT INTO user_skills (ObjectId,SkillId,Type) VALUES (?,?,?)');
        const resp = stmt.run(UserId,skillId.SkillId,type);
    }
}



export function deleteFriend(friendId) {
    const stmt = db.prepare('DELETE FROM friends WHERE FriendId = ?');
    return stmt.run(friendId);
}

export function deletePreviousJob(expId) {
    const stmt = db.prepare('DELETE FROM work_experience WHERE ExperienceId = ?')
    return stmt.run(expId);
}

export function sendFriendRequest(idSender,idRecipient) {
    const stmt = db.prepare('INSERT INTO friends (Sender,Recipient,Status) VALUES (?,?,\'pending\');');
    return stmt.run(idSender,idRecipient);
}

export function acceptFriendRequest(idSender,idRecipient) {
    const stmt = db.prepare('UPDATE friends SET Status = \'accepted\' WHERE Sender = ? AND Recipient = ?');
    return stmt.run(idSender,idRecipient);
}

export function rejectFriendRequest(idSender,idRecipient) {
    const stmt = db.prepare('UPDATE friends SET Status = \'rejected\' WHERE Sender = ? AND Recipient = ?');
    const resp =  stmt.run(idSender,idRecipient);
    return resp.changes > 0;
}

export function updateUserCredentials(updatedata) {
     let res;
    
    try {
        let query = `UPDATE users SET email = ? WHERE UserId = ?`;
        let stmt = db.prepare(query);
        res = stmt.run(updatedata.email, updatedata.UserId);
    } catch (err) {
        console.error("Error updating email:", err);
        return {
            success: false,
            message: "Email is already in use",
            error: err
        };
    }

    try {
        let query = `UPDATE users SET username = ? WHERE UserId = ?`;
        let stmt = db.prepare(query);
        res = stmt.run(updatedata.username, updatedata.UserId);
    } catch (err) {
        console.error("Error updating username:", err);
        return {
            success: false,
            message: "Username is already in use",
            error: err
        };
    }

    return {
        success: res.changes > 0,
        message: res.changes > 0 ? "User updated successfully" : "No changes made"
    };
}

export function updateWorkExperience(id,updatedata) {

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
    } else {
        const query = 'UPDATE work_experience SET CompanyId = ?, JobTitleId = ?, StartDate = ?, EndDate = ?, Private = ? WHERE UserId = ? AND ExperienceId = ?';
        const stmt = db.prepare(query);
        result = stmt.run(compId,titleId,updatedata.from,updatedata.to,updatedata.private,id,updatedata.expId)
    }
    //put logic to update instead of insert if needed
    return result.changes > 0;
}

// export async function updatePassword(updatedata) {
    // const oldPass = updatedata.oldPass;
    // const confirmPass = updatedata.confirmPass;
    // const toChange = updatedata.newPass;
    // if (toChange.localeCompare(confirmPass) !== 0) {
        // return false;
    // } else {
        // const user = getUserById(updatedata.UserId);
        // const users = getUsers();
        // const test = await bcrypt.compare(oldPass,user.password)
        // if(!test) return false;
        // const hashedPassword = await bcrypt.hash(toChange, 10);
        // const query = `UPDATE users SET password = ? WHERE UserId = ?`
        // const stmt = db.prepare(query);
        // const result = stmt.run(hashedPassword, updatedata.UserId);
        // return result.changes > 0;
    // }
// }

export async function updatePassword(updatedata) {
    const oldPass = updatedata.oldPass;
    const confirmPass = updatedata.confirmPass;
    const toChange = updatedata.newPass;
    
    try {
        if (toChange.localeCompare(confirmPass) !== 0) {
            throw new Error("New password and confirmation password do not match.");
        }

        const user = getUserById(updatedata.UserId);
        if (!user) throw new Error("User not found.");

        const isValidPassword = await bcrypt.compare(oldPass, user.password);
        if (!isValidPassword) {
            throw new Error("Old password is incorrect.");
        }

        const hashedPassword = await bcrypt.hash(toChange, 10);

        const query = `UPDATE users SET password = ? WHERE UserId = ?`;
        const stmt = db.prepare(query);
        const result = stmt.run(hashedPassword, updatedata.UserId);

        if (result.changes > 0) {
            return { success: true, message: "Password updated successfully." };
        } else {
            throw new Error("Failed to update password.");
        }
    } catch (error) {
        console.error(error.message);
        return { success: false, message: error.message };
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
            console.log('An error occured')
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
    let filteredUpdateData = {...updateData}
    console.log(filteredUpdateData)
    delete filteredUpdateData.UserId;
    let uniId;

    let education = getUniversityByName(updateData.university_name);
    if(education === undefined) {
        const uniQuery = db.prepare('INSERT OR IGNORE INTO Universities (university_name,major,StartDate,EndDate) VALUES(?,?,?,?)')
        let res = uniQuery.run(filteredUpdateData.university_name,filteredUpdateData.major,filteredUpdateData.from,filteredUpdateData.to);
        uniId = res.lastInsertRowid;
    } else {
        uniId = education.UniversityId;
        const updateUni = db.prepare('UPDATE Universities SET major = ?, StartDate = ? , EndDate = ? WHERE UniversityId = ?')
        const query = updateUni.run(filteredUpdateData.major,filteredUpdateData.from,filteredUpdateData.to,uniId)
    }
    const query = `UPDATE users SET university = ? WHERE UserId = ?`
    const stmt = db.prepare(query)
    let res = stmt.run(uniId,id);
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
export function addUser(username, fname, lname, email, password) {
    const stmt = db.prepare('INSERT INTO users (username,fname,lname,email,password) VALUES (?,?,?,?,?)');
    return stmt.run(username, fname, lname, email, password);
}

export function findUserByEmail(email) {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
}

export function newNotification(idFrom,idTo,type) {
    if(idFrom === idTo) {
        console.log("Can't add notification. The user cannot create a notification to themselves");
        return false;
    }
    const stmt = db.prepare('INSERT INTO notifications (UserFrom,UserTo,type) VALUES (?,?,?)');
    return stmt.run(idFrom,idTo,type);

}

export function deleteUserSkill(UserId,SkillId,Type) {
    const stmt = db.prepare('DELETE FROM user_skills WHERE ObjectId = ? AND SkillId = ? AND Type = ?');
    const skillId = getSkillByName(SkillId);
    const resp =  stmt.run(UserId,skillId.SkillId,Type);
    return resp.changes > 0;
}

export function newJobAdvert(PosterId,body) {
    console.log(body)
    const stmt = db.prepare('INSERT INTO job_adverts (PosterId,JobTitle,EnrollmentType,WorkplaceType,MonthlyWage,AdditionalInfo,Location) VALUES (?,?,?,?,?,?,?)')
    const resp = stmt.run(PosterId,body.title,body.enrollmentType,body.workplaceType,body.monthlyWage,body.moreInfo,body.location);
    return resp;
}

export  function saveMessageSent(senderId,recipientId,content) {
    const stmt = db.prepare('INSERT INTO chat_messages (SenderId,RecipientId,Content) VALUES (?,?,?)')
    const resp = stmt.run(senderId,recipientId,content);
    return resp;
}
