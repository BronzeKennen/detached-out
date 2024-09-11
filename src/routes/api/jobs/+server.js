import {
    getCompanyById,
    getUniversityById,
    getJobTitleById,
    getJobsByUserIdPaged, 
    getUserById,
    getSkillById,
    getUserSkillsById,    
    getAllJobsPaged,
    getAllJobs
} from '../../../../getters.js';
import { newJobAdvert } from '../../../../setters.js';

export const POST = async ({locals,request}) => {
    const id = locals.user?.id;
    const data = await request.json();
    const resp = newJobAdvert(id,data);
    if(resp) {
        return new Response(JSON.stringify({ postId: resp.lastInsertRowid }), {
            status: 200,
        });
    } else {
        return new Response({status:500})
    }
}

export const GET = async({locals,request}) => {
    let id;

    const url = new URL(request.url)

    const page = parseInt(url.searchParams.get('page')) || 1; 
    const limit = parseInt(url.searchParams.get('limit')) || 5;
    const own = parseInt(url.searchParams.get('own')) || 0; 
    id = parseInt(url.searchParams.get('id')) || locals.user?.id; 
    
    let jobs;
    if(own) 
        jobs = getJobsByUserIdPaged(id,page,limit); 
    else {
        jobs = getAllJobsPaged(id,page,limit);
    }
    for(const job of jobs) {
        const poster = getUserById(job.PosterId)

        job.Poster = {
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
        job.skills = getUserSkillsById(job.AdvertId,"Job")
        for(const skill of job.skills) {
            skill.name = getSkillById(skill.SkillId);
        }
    }
    
    if(jobs) {
        return new Response(JSON.stringify({jobs}))
    }
}