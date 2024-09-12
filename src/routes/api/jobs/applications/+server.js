import { sendJobApplicationByAdvertId } from '../../../../../setters.js';
import { getAllApplications, getJobApplicationsByAdvertId } from '../../../../../getters.js';


export const GET = async ({request,locals}) => {
    const id = locals.user?.id;
    
    const url = new URL(request.url)
    const advertId = parseInt(url.searchParams.get('advertId'));

    let applications = getJobApplicationsByAdvertId(advertId)
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