import { sendJobApplicationByAdvertId } from '../../../../../setters.js';
import { getUniversityById,getAllApplications, getJobApplicationsByAdvertId, getUserById } from '../../../../../getters.js';


export const GET = async ({request,locals}) => {
    const id = locals.user?.id;
    
    const url = new URL(request.url)
    const advertId = parseInt(url.searchParams.get('advertId'));

    let applications = getJobApplicationsByAdvertId(advertId)
    for(const application of applications) {
        const fetched = getUserById(application.ApplicantId)
        application.Applicant = {
            UserId : fetched.UserId,
            username: fetched.username,
            profile_pic_url: fetched.profile_pic_url,
            university: getUniversityById(fetched.university) ? getUniversityById(fetched.university) : null,
        }
    }
    return new Response(JSON.stringify({applications:applications}))

    
}

export const POST = async ({request,locals}) => {
    const id = locals.user?.id
    const data = await request.json();
    const resp = sendJobApplicationByAdvertId(id,data.advertId,data.message)
    if(resp) {
        return new Response(JSON.stringify({message:"success",status:201}))
    } else {
        return new Response(JSON.stringify({message:"An error occured",status:500}))
    }
}