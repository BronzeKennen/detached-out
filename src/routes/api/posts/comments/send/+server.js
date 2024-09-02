import { getPostById } from '../../../../../../getters.js';
import { newComment, newNotification } from '../../../../../../setters.js';

export async function POST({locals,request}) {
    const id = locals.user?.id;

    const data = await request.json();


    const resp = newComment(id,data.postId,data.Content)
    const post = getPostById(data.postId);
    const notif = newNotification(id,post[0].UserId,'comment');
    if(!notif) {
        console.log('Error adding notification.');
    }
    if(resp) {
        console.log("comment created successfully")
        return new Response(JSON.stringify({commentId:resp.lastInsertRowid,message:"success"},{status:200}));
    } else {
        console.log("Error adding comment")
        return new Response(JSON.stringify({message:"Error adding comment"},{status:500}));
    }

}