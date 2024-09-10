import { getCompanyById,getJobTitleById,getUniversityById, getUserById } from '../../../../../getters.js';

export async function load ({request,params,locals}) {
    let loggedId = locals.user?.id;
    const loggedUser = getUserById(loggedId)
    loggedId = {
        loggedId : locals.user?.id,
        profile_pic_url : loggedUser.profile_pic_url
    }
    const recId = params.id
    const cookies = request.headers.get('cookie') || '';

    try {
        // Include the JWT cookie in the fetch request headers
        const res = await fetch(`http://localhost:5173/api/users/${recId}`, {
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
            return { userProfile, loggedId}
        } catch (error) {
            console.error(error);
            return { status: 404, error: 'Profile not found' };
        }
}