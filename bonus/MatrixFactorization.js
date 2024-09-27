// import getAllPosts from '../getters.js'
import {getAllJobs, getAllPosts, getPostById, getUserById, getUsers} from '../getters.js'
// import getAllJobs from '../getters.js'

class MatrixFactorization {
    constructor(R, K, h) {
        // Set values
        this.R = R;
        this.nUsers = R.length;
        this.nItems = R[0].length;
        this.K = K;
        this.h = h;

        // Random init of V, F
        this.V = Array.from({length: this.nUsers}, () =>
            Array.from({length: this.K}, () => Math.random()));
        this.F = Array.from({length: this.K}, () =>
            Array.from({length: this.nItems}, () => Math.random()));
    }

    train(maxIter=500) {
        let prevRMSE = -2;
        let RMSE = -1;
        const nonZeroEntries = this.getNonZero();

        for(let k = 0; k < maxIter; k++) {
            let totalSqError = 0;

            for (const [i, j] of nonZeroEntries) {
                const predict = this.dotProduct(this.V[i], this.getCol(this.F, j));
                const error_ij = this.R[i][j] - predict;
                
                // Update latent factors on gradient descent.
                for(let l = 0; l < this.K; l++) {
                    this.V[i][l] += this.h * 2 * error_ij * this.F[l][j];
                    this.F[l][j] += this.h * 2 * error_ij * this.V[i][l];
                }

                totalSqError = error_ij ** 2;
            }
        
            RMSE = Math.sqrt(totalSqError / nonZeroEntries.length);
            if (Math.abs(prevRMSE - RMSE) < 0.0001) break;
            prevRMSE = RMSE;
        }
    }

    predict() {
        let predictedMatrix = Array.from({ length: this.nUsers }, () => Array(this.nItems).fill(0));

        // Perform matrix multiplication: V * F
        for (let i = 0; i < this.nUsers; i++) {
            for (let j = 0; j < this.nItems; j++) {
                predictedMatrix[i][j] = this.dotProduct(this.V[i], this.getCol(this.F, j));
            }
        }
        return predictedMatrix;
    }

    getNonZero() {
        let nonZeroEntries = [];
        for (let i = 0; i < this.nUsers; i++) {
            for (let j = 0; j < this.nItems; j++) {
                if (this.R[i][j] !== 0) {
                    nonZeroEntries.push([i, j]);
                }
            }
        }
        return nonZeroEntries;
    }

    getCol(matrix, index) {
        return matrix.map(row => row[index]);
    }

    dotProduct(vec1, vec2) {
        return vec1.reduce((sum, val, index) => sum + val * vec2[index], 0);
    }

};

let rMatrix = [
    [1, 2, 0, 0, 1],
    [1, 2, 0, 2, 1],
    [0, 2, 2, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 2, 1, 1, 2],
];

// let attempt = new MatrixFactorization(rMatrix, 2, 0.01);
// attempt.train();
// let predictedMat = attempt.predict();
// console.log(predictedMat[1]);
// let sortedRow = [...predictedMat[1]].sort();
// console.log(sortedRow);


// Initialize matrixes
const nUsers = getUsers();
const nPosts = getAllPosts(); 
const nJobAdverts = getAllJobs();

const usersPostsTable = [];
for (let userID = 0; userID < nUsers.length; userID++) {
    let currentUser = getUserById(userID);
    const row = [];
    for (let postID = 0; postID < nPosts.length; postID++) {
        let currentPost = getPostById(postID);
        let score = 0;
        if(isConnected(currentUser.UserId, currentPost.UserId)) {
            score += 1;
        }
        if(userLikesPost(currentUser.UserId, currentPost.PostId)) {
            score += 1;
            if(userCommentsPost(currentUser.UserId, currentPost.UserId)) { 
                score += 1;                                                
            }
        }
        row.push(score);
    }
    usersPostsTable.push(row);
}

let userPostsFact = new MatrixFactorization(usersPostsTable, 2, 0.01);
userPostsFact.train();
let predictedUsersPosts = userPostsFact.predict();







const usersJobsTable = [];
for (let userID = 0; userID < nUsers.length; userID++) {
    let currentUser = getUserById(userID);
    const row = [];
    for (let jobID = 0; jobID < nJobAdverts.length; jobID++) {
        let currentJob = getPostById(postID);
        let score = 0;
        if(isConnected(currentUser.UserId, currentJob.PosterId)) {
            score += 1;
        }
        if(userAppliedJob(currentUser.UserId, currentJob.AdvertId)) {
            score += 1;
        }
        row.push(score);
    }
    usersJobsTable.push(row);
}

let userJobsFact = new MatrixFactorization(usersJobsTable, 2, 0.01);
userJobsFact.train();
let predictedUsersJobs = userJobsFact.predict();




console.log("Users x Posts Table:", usersPostsTable);
console.log("Users x Job Adverts Table:", usersJobsTable);