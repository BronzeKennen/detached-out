import { Handle, redirect } from "@sveltejs/kit"
import { ACCESS_TOKEN_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken'

export const handle = async ({ event, resolve }) => {
    const url = new URL(event.request.url);

    // Skip authorization checks for login page
    if (url.pathname === '/' || url.pathname === '/api/users/login' || url.pathname === '/api/users/register') {
        return resolve(event);
    }

    const cookieHeader = event.request.headers.get('cookie');
    let token = null;
    if(cookieHeader) {
        const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
        const tokenCookie = cookies.find(cookie => cookie.startsWith('accessToken='));

        if(tokenCookie) {
            token = cookieHeader.split('=')[1];
        }
    }
    if(token) {
        try {
            const user = jwt.verify(token,ACCESS_TOKEN_SECRET)
            event.locals.user = user;
            return resolve(event)
        } catch(err) {
            console.error('JWT failed:',err);
            return new Response('Unauthorized', {status:401});
        }
    } 
    // console.log(window.location)

    return redirect(303, '/');
}