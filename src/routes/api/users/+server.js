
import { getUsers, addUser } from '/database.js' 
import bcrypt from 'bcryptjs'

export async function POST({ request }) {
    const data = await request.json();
    console.log(data);
    try {
        const hashedPassword = await bcrypt.hash(data.password,10);
        console.log(hashedPassword)
        addUser(
            data.username,
            data.fname,
            data.lname,
            data.email,
            hashedPassword
        );
        return new Response(JSON.stringify({
            message: "success"
        },{status:201}))
    } catch {
        return new Response(JSON.stringify({
            message: "Internal Server Error"
        }))
    } 
}
export const GET = () => {

    const users = getUsers();
    return new Response(JSON.stringify({
        body: users
    }, {status:200}));

}