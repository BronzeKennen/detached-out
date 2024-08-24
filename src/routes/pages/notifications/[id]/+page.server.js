import { 
    getNotifications,
    getJobTitleById,
    getFriends,
    getCompanyById,
    getFriendRequests,
    getUniversityById,
    getAll,
    getUserById } from '../../../../../database.js';


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
        const friends = getFriends(profile.UserId);
        const notifs = getNotifications(profile.UserId);

        for(const friend of friends) {
            let senderName = getUserById(friend.Sender);
            friend.Sender =  {
                UserId: senderName.UserId,            
                username: senderName.username
            }

            //didnt add whole objet to hide password, if in need to add more fields
            //create a new object
        }

        for(const notif of notifs) {
            let senderName = getUserById(notif.UserFrom);
            notif.UserFrom = senderName.username;
            //didnt add whole objet to hide password, if in need to add more fields
            //create a new object
        }


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
            friends: friends,
            notifications: notifs

        };
        return {userProfile}
    } catch (error) {
        console.error(error);
        return { status: 500, error: 'Internal Server Error' };
    }
}
