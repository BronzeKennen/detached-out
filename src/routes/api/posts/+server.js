import { getCompanyById,getJobTitleById,getUniversityById,getFriends, getPostsByUserIdPaged, getUserById } from "../../../../getters"


export async function GET({locals,request,params}) {
    const id = locals.user?.id;
    const url = new URL(request.url)

    const page = parseInt(url.searchParams.get('page')) || 1; // Default to page 1 if not provided
    const limit = parseInt(url.searchParams.get('limit')) || 5; // Default to limit 5 if not provided
    const own = parseInt(url.searchParams.get('own')) || 0; // Default to limit 5 if not provided

    let friends = getFriends(id)
    let connections = 0;
    let posts = []
    for(const friend of friends) {
        if (friend.Status === 'accepted') {
            connections++;
            if(!own) {
                if(friend.Sender === id) {
                    posts = [...posts,getPostsByUserIdPaged(friend.Recipient,page,limit)]
                } else {
                    posts = [...posts,getPostsByUserIdPaged(friend.Sender,page,limit)]
                }
            }
        }
        //modify a new object
    }

    if(own) posts = getPostsByUserIdPaged(id,page,limit);
    else posts = posts[1]

    for (const post of posts) {
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
    return new Response(JSON.stringify({status:200,body:posts}))

}