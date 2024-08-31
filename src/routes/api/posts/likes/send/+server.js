
import { getCommentById, getPostById } from '../../../../../../getters.js';
import { removeLike ,newLike, newNotification} from '../../../../../../setters.js';

export async function PATCH({locals,request}) {
    const id = locals.user?.id;

    const data = await request.json();
    let response;

    if(data.status === 'added') {
        response = newLike(id,data.postId,data.type)        
        if(data.type === 'comment') {
            const user = getCommentById(data.postId)
            const resp = newNotification(id,user[0].UserFrom.UserFrom,'comment-like');
            if(!resp) {
                console.log("You cant create a notification to yourself")
            }
        } else if (data.type === 'post') {
            let user = getPostById(data.postId);
            console.log(user)
            user = user[0].UserId
            const resp = newNotification(id,user,'post-like')
            if(!resp) {
                console.log("You cant create a notification to yourself")
            }

        }
    } else if (data.status === 'removed') {
        response = removeLike(id,data.postId,data.type);

    } else {
        console.log('die')
        
    }


    if(response) {
        console.log("Like changed successfully")
        return new Response(JSON.stringify({message:"success"},{status:200}));
    } else {
        console.log("Error adding like")
        return new Response(JSON.stringify({message:"Error adding comment"},{status:500}));
    }

}