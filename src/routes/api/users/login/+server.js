import { findUserByEmail } from '../../../../../database.js';
import bcrypt from 'bcryptjs'
import { ACCESS_TOKEN_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken'


export async function POST({request}) {
    const data = await request.json();
    const user = findUserByEmail(data.email);


    if (!user) {
        return new Response(JSON.stringify({ message: 'Not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    try {
        if(await bcrypt.compare(data.password,user.password)) {
            //User authenticated, now authenticate with jwt
            const accessToken = jwt.sign({id: user.UserId}, ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
            return new Response(JSON.stringify({ accessToken}), {
                status: 200,
                headers: { 
                    'Content-Type': 'application/json', 
                    'Set-Cookie': `accessToken=${accessToken}; Path=/; HttpOnly; Secure; Max-Age=${60*60}`,
                    'User-Id': user.UserId
                }
            });
        } else {
            console.log('wrong password :(')
            return new Response(JSON.stringify({ message: 'Forbidden' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

    } catch (err) {
        return new Response(JSON.stringify({ message: 'Forbidden' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

