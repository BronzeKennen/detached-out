
import { getUsers, addUser } from '/database.js' 
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST({ request }) {
    const data = await request.json();
    console.log(data);
    try {
        const hashedPassword = await bcrypt.hash(data.password,10);
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