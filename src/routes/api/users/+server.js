
import { getUsers, updateUserById } from '/database.js' 
export const GET = () => {

    const users = getUsers();
    return new Response(JSON.stringify({
        body: users
    }, {status:200}));

}

export const PATCH = async ({request}) => {

        const updateData = await request.json();
    try {

        const res = updateUserById(updateData.id,updateData,true);

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