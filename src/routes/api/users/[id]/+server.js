import { getUserById } from '/getters.js' 
export async function GET({ params }) {
    const { id } = params;

    const profile = await getUserById(id);

    if(profile) {
        return new Response(JSON.stringify(profile),{status:200});
    } else {
        console.log('broke phone');
        return new Response('Profile not found',{status:404});
    }
}