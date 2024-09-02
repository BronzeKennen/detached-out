import { getAllPosts, getUserById } from "../../../../getters"


export const GET = async () => {
    let posts = getAllPosts();
    for( const post of posts) {
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
            connections: connections,

        }
    }
    return {posts}
}