import { 
    getPostById,
    getUserById,
    getCompanyById,
    getJobTitleById,
    getUniversityById,
    getImpressionsByUserId
} from '../../../../../getters.js';
import { newImpresion } from '../../../../../setters.js';



export const load = async ({locals,params,request}) => {


    
    const id = locals.user?.id;
    const postId = params.id;

    const impression = newImpresion(id,postId);
    if(!impression) {
        console.log("Failed to add impression.")
    }



    let temp = getPostById(postId)
    if(!temp.length) return null
    const post = temp[0]

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

    }
    let user = getUserById(id);
    user = {
        UserId: user.UserId,
        username: user.username,
        fname: user.fname,
        lname: user.lname,
        biography: user.biography,
        education: user.education,
        current_company: getCompanyById(user.current_company) ? getCompanyById(user.current_company) : null,
        job_title: getJobTitleById(user.job_title) ?  getJobTitleById(user.job_title) : null,
        country_of_residence: user.country_of_residence ? user.country_of_residence : null,
        state: user.state ? user.state : null,
        profile_pic_url: user.profile_pic_url,
        date_of_birth: user.date_of_birth ? user.date_of_birth : null,
        university: getUniversityById(user.university) ? getUniversityById(user.university) : null,
        biography : user.biography ? user.biography : null,

    }
    return {post,user}
}