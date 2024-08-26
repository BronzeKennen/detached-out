import {
    getUniversityById,
    getUserById,
    getFriends,
    getCompanyById,
    getJobTitleById
} from '../../../../../database.js';


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
        const friends = getFriends(profile.UserId)

        for (const friend of friends) {
            let senderName = getUserById(friend.Sender);
            let recepientName = getUserById(friend.Recipient);
            friend.Sender = {
                UserId: senderName.UserId,
                username: senderName.username,
                current_company: getCompanyById(senderName.current_company) ? getCompanyById(senderName.current_company) : null,
                job_title: getJobTitleById(senderName.job_title) ? getJobTitleById(senderName.job_title) : null,
            };
            friend.Recipient = {
                UserId: recepientName.UserId,
                username: recepientName.username,
                current_company: getCompanyById(recepientName.current_company) ? getCompanyById(recepientName.current_company) : null,
                job_title: getJobTitleById(recepientName.job_title) ? getJobTitleById(recepientName.job_title) : null,
                // didnt add whole object to hide password, if in need to add more fields
                // create a new object
            }
        }


            let userProfile = { //remove email password 
                UserId: profile.UserId,
                username: profile.username,
                profile_pic_url: profile.profile_pic_url,
                date_of_birth: profile.date_of_birth ? profile.date_of_birth : null,
                biography: profile.biography ? profile.biography : null,
                friends: friends
            };
            return { userProfile }
        } catch (error) {
            console.error(error);
            return { status: 404, error: 'Profile not found' };
        }
    }
