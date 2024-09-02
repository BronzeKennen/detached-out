import { newPost} from '../../../../../setters.js';
import {getPostById } from '../../../../../getters.js'

export async function POST({locals,request}) {
    const id = locals.user?.id;

    const data = await request.json();


    const resp = newPost(id,data)
    if(resp) {
        const post = getPostById(resp.lastInsertRowid);
        console.log(post)
        return new Response(JSON.stringify({post:post},{status:200}));
    } else {
        console.log("Internal Error when creating post")
        return new Response(JSON.stringify({message:"Internal Error"},{status:500}))
    }

}