import { getUserById,getCompanyById,getJobTitleById,getUniversityById} from '../../../../../getters.js';


export async function load({locals,request,params}) {

    const id = locals.user?.id
    const profile = getUserById(id)

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
        biography: profile.biography ? profile.biography : null,
    };

    return {userProfile}
}