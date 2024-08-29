import { newPost } from '../../../../../database.js';

export async function POST({locals,request}) {
    const id = locals.user?.id;

    const data = await request.json();


    const resp = newPost(id,data)
    if(resp) {
        console.log("yippie I created a new post")
    } else {
        console.log("you fucked up bitch nigga")
    }
    return new Response(JSON.stringify({message:"success"},{status:200}));

}