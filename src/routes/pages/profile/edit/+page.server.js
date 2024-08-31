import {
    getUniversityById,
    getUserById,
    getFriends,
    getCompanyById,
    getJobTitleById
} from '../../../../../getters.js';


export async function load({ locals, request }) {
    const id = locals.user?.id;
    // console.log(id)

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
                education: profile.education,
                current_company: getCompanyById(profile.current_company) ? getCompanyById(profile.current_company) : null,
                job_title: getJobTitleById(profile.job_title) ? getJobTitleById(profile.job_title) : null,
                country_of_residence: profile.country_of_residence ? profile.country_of_residence : null,
                state: profile.state ? profile.state : null,
                profile_pic_url: profile.profile_pic_url,
                date_of_birth: profile.date_of_birth ? profile.date_of_birth : null,
                university: getUniversityById(profile.university) ? getUniversityById(profile.university) : null,
                biography: profile.biography ? profile.biography : null
            };
            return { userProfile }
        } catch (error) {
            console.error(error);
            return { status: 404, error: 'Profile not found' };
        }
    }
