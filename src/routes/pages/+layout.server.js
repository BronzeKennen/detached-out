import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '$env/static/private';

export function load({ cookies }) {
    const token = cookies.get('accessToken');

    if (token) {
        try {
            const user = jwt.verify(token, ACCESS_TOKEN_SECRET);
            return {
                user
            };
        } catch (error) {
            console.error('Invalid token', error);
            return {
                user: null
            };
        }
    }

    return {
        user: null
    };
}