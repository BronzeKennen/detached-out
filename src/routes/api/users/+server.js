
import { getUsers, addUser } from '/database.js' 

export async function POST({ request }) {
    const data = await request.json();
    console.log(data);
    addUser(
        data.username,
        data.fname,
        data.lname,
        data.email,
        data.password
    );
    return new Response(JSON.stringify({
        message: "success"
    },{status:201}))
}
export const GET = () => {

    const users = getUsers();
    return new Response(JSON.stringify({
        body: users
    }, {status:200}));
}