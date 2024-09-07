import { addNewSkills, deleteUserSkill } from '../../../../setters.js';

export const POST = async ({locals,request}) => {
    const id = locals.user?.id;
    const data = await request.json();
    const resp = addNewSkills(id,data.newSkills);
    if(resp) {
        return new Response({status:200});
    } else {
        return new Response({status:500});
    }

}

export const DELETE = async ({locals,request}) => {
    const id = locals.user?.id;
    const data = await request.json();
    const resp = deleteUserSkill(id,data.skill)
    
    if(resp) {
        console.log('success')
        return new Response({status:200});
    } else {
        console.log('Internal server error')
        return new Response({status:500});
    }
}