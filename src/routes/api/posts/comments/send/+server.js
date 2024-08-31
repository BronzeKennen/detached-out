import { newComment } from '../../../../../../setters.js';

export async function POST({locals,request}) {
    const id = locals.user?.id;

    const data = await request.json();


    const resp = newComment(id,data.postId,data.Content)
    if(resp) {
        console.log("yippie I created a new post")
        return new Response(JSON.stringify({commentId:resp.lastInsertRowid,message:"success"},{status:200}));
    } else {
        console.log("Error adding comment")
        return new Response(JSON.stringify({message:"Error adding comment"},{status:500}));
    }

}