
import { addUser ,findUserByEmail} from '/database.js' 
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from '$env/static/private';

export async function POST({ request }) {
    const data = await request.json();
    try {
        const hashedPassword = await bcrypt.hash(data.password,10);
        addUser(
            data.username,
            data.fname,
            data.lname,
            data.email,
            hashedPassword
        );
        const user = findUserByEmail(data.email);
        const accessToken = jwt.sign({id: user.UserId}, ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
        return new Response(JSON.stringify({ accessToken}), {
            status: 200,
            headers: { 
                'Content-Type': 'application/json', 
                'Set-Cookie': `accessToken=${accessToken}; Path=/; HttpOnly; Secure=false; Max-Age=${60*60}`
            }
        });
    } catch {
        return new Response(JSON.stringify({
            message: "Internal Server Error"
        }))
    } 
}