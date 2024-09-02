
import { 
    getFriends,
    getCompanyById, 
    getJobTitleById, 
    getUniversityById, 
    getUsers
} from '../../../../getters.js';

import {
    updateEducationById, 
    updateEmploymentById, 
    updateMandInfobyId, 
    updateWorkExperience 
} from '../../../../setters.js'


export const GET = ({request}) => {
    const userQuery = request.headers.get('userquerytype');
    let id = request.headers.get('UserId');
    const users = getUsers();
    if(userQuery) {
        let friendIds = []
        const friends = getFriends(id);
        friends.forEach(friend => {
            if(friend.Sender === parseInt(id)) {
                friendIds = [...friendIds,friend.Recipient];
            } else {
                friendIds = [...friendIds,friend.Sender];
            }
        })
        
        let diff = []
        users.forEach(user => {
            if(!friendIds.includes(user.UserId) && (user.UserId !== parseInt(id)))
            diff = [...diff,{
                UserId: user.UserId,
                username: user.username,
                fname: user.fname,
                lname: user.lname,
                email: user.email,
                profile_pic_url: user.profile_pic_url,
                date_created: user.date_created,
                date_of_birth: user.date_of_birth,
                biography: user.biography,
                country_of_residence: user.country_of_residence,
                state: user.state,
                current_company: getCompanyById(user.current_company)? getCompanyById(user.current_company): null,
                job_title: getJobTitleById(user.job_title) ? getJobTitleById(user.job_title): null, 
                university: getUniversityById(user.university) ?getUniversityById(user.university)  : null  
            }]
        })
        return new Response(JSON.stringify(diff,{status:200}))
    }

    if(!users) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }
    const enrichedResp = users.map(user => ({
        UserId: user.UserId,
        username: user.username,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        profile_pic_url: user.profile_pic_url,
        date_created: user.date_created,
        date_of_birth: user.date_of_birth,
        biography: user.biography,
        country_of_residence: user.country_of_residence,
        state: user.state,
        current_company: getCompanyById(user.current_company)? getCompanyById(user.current_company): null,
        job_title: getJobTitleById(user.job_title) ? getJobTitleById(user.job_title): null,
        university: getUniversityById(user.university) ?getUniversityById(user.university)  :null  
    }))
    return new Response(JSON.stringify(enrichedResp), {status:200});

}

export const PATCH = async ({request}) => {

        const updateData = await request.json();
        console.log(updateData)

    try {

        let res;
        if('fname' in updateData) {
            res = updateMandInfobyId(updateData.UserId,updateData,true);
        } else if('current_company' in updateData) {
            res = updateEmploymentById(updateData.UserId,updateData);
        } else if ('university_name' in updateData) {
            res = updateEducationById(updateData.UserId,updateData);
        }else if('employer' in updateData) {
            res = updateWorkExperience(updateData.UserId,updateData);
        } else {
            res = null;
        }

        if (res) {
            return new Response(JSON.stringify({ message: 'User updated successfully' }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
    }


}
//will add post request to change bios etc