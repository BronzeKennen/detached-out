
import { updateUserCredentials, updatePassword } from '/setters.js' 
export const GET = () => {

    const users = getUsers();
    return new Response(JSON.stringify({
        body: users
    }, {status:200}));

}

export const PATCH = async ({request}) => {

        const updateData = await request.json();
    try {

        if('oldPass' in updateData) {
            const res = await updatePassword(updateData);
            if(!res) {
                return new Response(JSON.stringify({message: 'Password doesn\'t match confirm password'}), {status: 401})
            } else {
                return new Response(JSON.stringify({ message: 'User updated successfully' }), { status: 200 });
            }
        }else {
            const res = updateUserCredentials(updateData);
            
            if(!res) {
                return new Response(JSON.stringify({message: 'Password doesn\'t match confirm password'}), {status: 401})
            } else {
                return new Response(JSON.stringify({ message: 'User updated successfully' }), { status: 200 });
            }
        }

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
    }


}