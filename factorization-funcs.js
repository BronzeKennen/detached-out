import { MatrixFactorization } from "./bonus/MatrixFactorization.js";
import { getImpressionsByJobId,getJobApplicationsByAdvertId, getUsers,getAllPosts,getAllJobs, getUserById, getPostById, getLikesById, getCommentsById, getJobAdvertById, getImpressionsByPostId, getFriends, getAcceptedFriends, getPostScoresByUserId, getUserSkillsById } from "./getters.js";
import { insertOrUpdateJobScore, insertOrUpdateScore } from "./setters.js";
import { getPosts } from "./getters.js";


let nUsers;
let nPosts;
let nJobAdverts;
export function calculatePostScores(table) {
    for (let userID = 1; userID <= nUsers.length; userID++) {
        let currentUser = getUserById(userID);
        let userFriends = getAcceptedFriends(userID)
        let friendIds = [];
        if(userFriends.length) {
            for(const friend of userFriends) {
                if(friend.Sender === userID)
                    friendIds = [...friendIds,friend.Recipient]
                else
                    friendIds = [...friendIds,friend.Sender]
            }
        }
        const row = [];
        for (let jobID = 0; jobID < nPosts.length; jobID++) {
            let currentPost = getPostById(jobID);
            let score = 0;
            if(friendIds.includes(currentPost.UserId)) {
                score += 3
            }
            if(currentPost.length) {
                let likes = getLikesById(currentPost[0].PostId,'post');
                if(likes.length) {
                    for(const like of likes) {
                        if(like.SenderId === currentUser.UserId) {
                            score += 1;
                            break;
                        }
                    }
                }
                let comments = getCommentsById(currentPost[0].PostId,'post');
                if(comments.length) {
                    for(const comment of comments) {
                        if(comment.UserFrom.UserId === currentUser.UserId) {
                            score += 2;
                            break;
                        }
                    }
                }
                let impressions = getImpressionsByPostId(jobID);
                for(const impression of impressions) {
                    if(impression.UserId === currentUser.UserId) {
                        score += 1;
                        break;
                    }
                }
            }
            row.push(score);
        }
        table.push(row);
    }
    return table;
}


export function calculateJobScores(table) {
    for (let userID = 1; userID <= nUsers.length; userID++) {
        let currentUser = getUserById(userID);
        const row = [];
        const userSkills = getUserSkillsById(userID,'User')
        for (let jobID = 0; jobID < nJobAdverts.length; jobID++) {
            let currentJobAdvert = getJobAdvertById(jobID);
            let score = 0;
            if(currentJobAdvert.length) {
                let applications = getJobApplicationsByAdvertId(jobID);
                for(const application of applications) {
                    if(application.ApplicantId === currentUser.UserId) {
                        score += 3;
                    }
                }
                let impressions = getImpressionsByJobId(jobID);
                for(const impression of impressions) {
                    if(impression.UserId === currentUser.UserId) {
                        score += 1;
                        break;
                    }
                }
                if(userSkills.length) {
                    const jobSkills = getUserSkillsById(jobID,'Job')
                    if(jobSkills.length) {

                         const commonSkills = userSkills.filter(userSkill =>
                            jobSkills.some(jobSkill => jobSkill.SkillId === userSkill.SkillId)
                        );
                        score += commonSkills.length * 2;
                    }

                }
            }
            row.push(score);
        }
        table.push(row);
    }
    return table;
}

export function createMatrix() {
    nUsers = getUsers();
    nPosts = getPosts();
    nJobAdverts = getAllJobs();
    console.log("Creating a new matrix with post scores. Dimensions",nUsers.length,"(Users) X (Posts)",nPosts.length);
    console.log("Creating a new matrix with job advert scores. Dimensions",nUsers.length,"(Users) X (Job Adverts)",nJobAdverts.length);
    let table = [];
    let jobTable = []
    table = calculatePostScores(table);
    jobTable = calculateJobScores(jobTable)
    const cTable = table;
    // console.log("Users x Posts Table:", cTable);
    let userPostsFact = new MatrixFactorization(cTable, 2, 0.01);
    userPostsFact.train();
    let jobFact = new MatrixFactorization(jobTable, 2, 0.01);
    jobFact.train();
    let predictedUsersPosts = userPostsFact.predict(0);
    let predictedJobPosts = jobFact.predict(1);
}

export function startMatrixUpdateCycle(hours) {
    console.log("Starting matrix factorization update cycle")

    createMatrix();
    setInterval(() => {
        createMatrix();
    }, hours * 60 * 60 * 1000)
}