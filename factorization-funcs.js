import { MatrixFactorization } from "./bonus/MatrixFactorization";
import { getUsers,getAllPosts,getAllJobs, getUserById, getPostById, getLikesById, getCommentsById, getImpressionsByJobId, getImpressionsByPostId, getJobAdvertById, getJobApplicationsByAdvertId } from "./getters";


const nUsers = getUsers();
console.log("nUsers:", nUsers.length);
const nPosts = getAllPosts();
console.log("nPosts:", nPosts.length);
const nJobAdverts = getAllJobs();
console.log("nJobAdverts:", nJobAdverts.length);

export function calculatePostScores(table) {
    for (let userID = 1; userID <= nUsers.length; userID++) {
        let currentUser = getUserById(userID);
        const row = [];
        for (let jobID = 0; jobID < nPosts.length; jobID++) {
            let currentPost = getPostById(jobID);
            let score = 0;
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
                            score += 1;
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
            }
            row.push(score);
        }
        table.push(row);
    }
    return table;
}