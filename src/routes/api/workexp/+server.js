import { getCompanyById, getJobTitleById, getWorkExperienceById } from "../../../../database";

export const GET = ({ url }) => {

    const id = url.searchParams.get('id');

    const workExp = getWorkExperienceById(id);
    workExp.forEach((job,index) => {
        job.CompanyId = getCompanyById(job.CompanyId).company_name
        job.JobTitleId = getJobTitleById(job.JobTitleId).JobTitle
        // user.
    })
    return new Response(JSON.stringify({
        body: workExp
    }, {status:200}));

}