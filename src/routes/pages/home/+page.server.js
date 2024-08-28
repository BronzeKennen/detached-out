import { getFriends, getUniversityById } from '../../../../database.js';
import { getAllPosts, getCompanyById,getUserById,getJobTitleById } from '/database.js' 


export async function load({ locals, request }) {
    const id = locals.user?.id;

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
        for(const friend of friends) {
            if (friend.Status === 'accepted')
                connections++;
            //modify a new object
        }

        let posts = getAllPosts();
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
            posts: posts
        };
        console.log(userProfile)

        return {userProfile}
    } catch (error) {
        console.error(error);
        return { status: 404, error: 'Profile not found' };
    }
}
