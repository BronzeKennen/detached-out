import { getFriendRequests, getUniversityById } from '../../../../../database.js';
import { getCompanyById,getJobTitleById } from '/database.js' 


export async function load({ params, request }) {
    const { id } = params;

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
        let userProfile = { //remove email password 
            UserId: profile.UserId,
            username: profile.username,
            fname: profile.fname,
            lname: profile.lname,
            biography: profile.biography,
            current_company: getCompanyById(profile.current_company) ? getCompanyById(profile.current_company) : null,
            job_title: getJobTitleById(profile.job_title) ?  getJobTitleById(profile.job_title) : null,
            profile_pic_url: profile.profile_pic_url,
            university: getUniversityById(profile.university) ? getUniversityById(profile.university) : null,
            // friends: getFriends(profile.UserId),
            // friendRequests: getFriendRequests(profile.UserId),
            // notifications: getNotifications(profile.UserId)

        };
        return {userProfile}
    } catch (error) {
        console.error(error);
        return { status: 404, error: 'Profile not found' };
    }
}
