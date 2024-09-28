import { getAllJobImpressions, getFriends, getPostById, getPostsByUserId, getPostsByUserIdPaged,getUniversityById } from '../../../../getters.js';
import { getAllPosts, getCompanyById,getUserById,getJobTitleById,getImpressionsByPostId } from '/getters.js' 
import { calculatePostScores } from '../../../../factorization-funcs.js';
import { MatrixFactorization } from '../../../../bonus/MatrixFactorization.js';


export async function load({ locals, request }) {


    const id = locals.user?.id;
    let table = [];
    table = calculatePostScores(table);
    const cTable = table;
    // console.log("Users x Posts Table:", cTable);
    let userPostsFact = new MatrixFactorization(cTable, 2, 0.01);
    userPostsFact.train();
    let predictedUsersPosts = userPostsFact.predict();
    // console.log("Users x Posts Prediction Table:", predictedUsersPosts);
    
    // Get the recommended posts for this user.
    let userPredictedPosts = predictedUsersPosts[id];
    let sortedPosts = userPredictedPosts
    .map((score, index) => ({ id: index, score }))  
    .sort((a, b) => b.score - a.score)              
    .map(item => item.id);                          
    console.log(sortedPosts);
    let postsToRemove = []
    for(let postID of sortedPosts) {
        let currentPost = getPostById(postID);
        if(!currentPost[0]) {
            postsToRemove.push(postID);
            continue;
        }
        if(currentPost[0].UserId === id) {
            postsToRemove.push(postID);
        }
        let impressions = getImpressionsByPostId(postID);
        for(const impression of impressions) {
            if(impression.UserId === id) {
                postsToRemove.push(postID);
                continue;
            }
        }
    }
    sortedPosts = sortedPosts.filter(postID => !postsToRemove.includes(postID));






    // Extract the cookie from the request headers
    const cookies = request.headers.get('cookie') || '';

    try {
        // Include the JWT cookie in the fetch request headers
        const res = await fetch(`http://localhost:5173/api/users/${id}`, {
            headers: {
                'cookie': cookies // Pass the token in Authorization header
            }
        });

        if (!res.ok) {
            console.log("an error has occured");
        }

        const profile = await res.json();
        let friends = getFriends(profile.UserId)
        let connections = 0;
        let posts = []
        for(const friend of friends) {
            if (friend.Status === 'accepted') {
                connections++;
                if(friend.Sender === id) {
                    posts = [...posts,...getPostsByUserIdPaged(friend.Recipient,1,5)]
                } else {
                    posts = [...posts,...getPostsByUserIdPaged(friend.Sender,1,5)]
                }
            }
            //modify a new object
        }

        for (const post of posts) {
            const poster = getUserById(post.UserId);
            post.UserId = {
                UserId: poster.UserId,
                username: poster.username,
                fname: poster.fname,
                lname: poster.lname,
                biography: poster.biography,
                education: poster.education,
                current_company: getCompanyById(poster.current_company) ? getCompanyById(poster.current_company) : null,
                job_title: getJobTitleById(poster.job_title) ?  getJobTitleById(poster.job_title) : null,
                country_of_residence: poster.country_of_residence ? poster.country_of_residence : null,
                state: poster.state ? poster.state : null,
                profile_pic_url: poster.profile_pic_url,
                date_of_birth: poster.date_of_birth ? poster.date_of_birth : null,
                university: getUniversityById(poster.university) ? getUniversityById(poster.university) : null,
                biography : poster.biography ? poster.biography : null,
                connections: connections,

            }
        }

        let userProfile = { //remove email password 
            UserId: profile.UserId,
            username: profile.username,
            fname: profile.fname,
            lname: profile.lname,
            biography: profile.biography,
            education: profile.education,
            current_company: getCompanyById(profile.current_company) ? getCompanyById(profile.current_company) : null,
            job_title: getJobTitleById(profile.job_title) ?  getJobTitleById(profile.job_title) : null,
            country_of_residence: profile.country_of_residence ? profile.country_of_residence : null,
            state: profile.state ? profile.state : null,
            profile_pic_url: profile.profile_pic_url,
            date_of_birth: profile.date_of_birth ? profile.date_of_birth : null,
            university: getUniversityById(profile.university) ? getUniversityById(profile.university) : null,
            biography : profile.biography ? profile.biography : null,
            connections: connections,
            posts: posts,
            background_color: profile.BackgroundColor
        };

        return {userProfile}
    } catch (error) {
        console.error(error);
        return { status: 404, error: 'Profile not found' };
    }
}
