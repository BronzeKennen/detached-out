import { findUserByEmail } from '../../../../../database.js';
import { findUserByUsername } from '/database.js' 
import bcrypt from 'bcryptjs'

export async function POST({request}) {
    const data = await request.json();
    const user = findUserByEmail(data.email);
    console.log(data.email)
    console.log(user)


    if (!user) {
        console.log('lmao')
        return new Response(JSON.stringify({ message: 'Not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }
        console.log('lmao2')
    try {
        if(await bcrypt.compare(data.password,user.password)) {
            console.log('correct password :)')
            return new Response(JSON.stringify({ message: 'Success' }), {
                status: 201,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            console.log('wrong password :(')
            return new Response(JSON.stringify({ message: 'Forbidden' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

    } catch {
        return new Response(JSON.stringify({ message: 'Forbidden' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}