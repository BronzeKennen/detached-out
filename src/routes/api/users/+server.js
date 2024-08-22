
import { updateEducationById, updateEmploymentById, updateMandInfobyId, updateWorkExperience } from '../../../../database.js';
import { getUsers} from '/database.js' 
export const GET = () => {

    const users = getUsers();
    return new Response(JSON.stringify({
        body: users
    }, {status:200}));

}

export const PATCH = async ({request}) => {

        const updateData = await request.json();

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
        return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
    }


}
//will add post request to change bios etc