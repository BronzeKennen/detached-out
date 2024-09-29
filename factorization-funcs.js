import { MatrixFactorization } from "./bonus/MatrixFactorization.js";
import { getUsers,getAllPosts,getAllJobs, getUserById, getPostById, getLikesById, getCommentsById, getImpressionsByUserId, getImpressionsByPostId, getFriends, getAcceptedFriends, getPostScoresByUserId } from "./getters.js";


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
        for (let postID = 0; postID < nPosts.length; postID++) {
            let currentPost = getPostById(postID);
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
                let impressions = getImpressionsByPostId(postID);
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

export function createMatrix() {
    nUsers = getUsers();
    nPosts = getAllPosts();
    nJobAdverts = getAllJobs();
    console.log("Creating a new matrix with post scores. Dimensions",nUsers.length,"(Users) X (Posts)",nPosts.length);
    console.log("Creating a new matrix with job advert scores. Dimensions",nUsers.length,"(Users) X (Job Adverts)",nJobAdverts.length);
    let table = [];
    table = calculatePostScores(table);
    const cTable = table;
    // console.log("Users x Posts Table:", cTable);
    let userPostsFact = new MatrixFactorization(cTable, 2, 0.01);
    userPostsFact.train();
    let predictedUsersPosts = userPostsFact.predict();
}

export function startMatrixUpdateCycle(hours) {
    console.log("Starting matrix factorization update cycle")

    createMatrix();
    setInterval(() => {
        createMatrix();
    }, hours * 60 * 60 * 1000)
}