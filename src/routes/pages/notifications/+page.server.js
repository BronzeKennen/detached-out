import { 
    getNotifications,
    getJobTitleById,
    getFriends,
    getCompanyById,
    getFriendRequests,
    getUniversityById,
    getAll,
    getUserById } from '../../../../database.js';


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
        const friends = getFriends(profile.UserId);
        const notifs = getNotifications(profile.UserId);

        let connections = 0;
        for(const friend of friends) {
            if (friend.Status === 'accepted') connections++;
            let senderName = getUserById(friend.Sender);
            friend.Sender =  {
                UserId: senderName.UserId,            
                username: senderName.username,
                profile_pic_url: senderName.profile_pic_url
            }
            //didnt add whole object to hide password, if in need to add more fields
            //modify a new object
        }

        for(const notif of notifs) {
            let senderName = getUserById(notif.UserFrom);
            notif.UserFrom = senderName.username;
            //same logic as above
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
            notifications: notifs,
            connections: connections

        };
        return {userProfile}
    } catch (error) {
        console.error(error);
        return { status: 500, error: 'Internal Server Error' };
    }
}
