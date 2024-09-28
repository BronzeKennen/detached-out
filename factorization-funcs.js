import { MatrixFactorization } from "./bonus/MatrixFactorization";
import { getUsers,getAllPosts,getAllJobs, getUserById, getPostById, getLikesById, getCommentsById, getImpressionsByUserId, getImpressionsByPostId } from "./getters";


const nUsers = getUsers();
console.log("nUsers:", nUsers.length);
const nPosts = getAllPosts();
console.log("nPosts:", nPosts.length);
const nJobAdverts = getAllJobs();
let usersPostsTable = [];
usersPostsTable = calculatePostScores(usersPostsTable);
let userPostsFact = new MatrixFactorization(usersPostsTable, 2, 0.01);
userPostsFact.train();
let predictedUsersPosts = userPostsFact.predict();

export function calculatePostScores(table) {
    for (let userID = 1; userID <= nUsers.length; userID++) {
        let currentUser = getUserById(userID);
        const row = [];
        for (let postID = 0; postID < nPosts.length; postID++) {
            let currentPost = getPostById(postID);
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