
import { removeLike } from '../../../../../../database.js';
import { newLike } from '../../../../../../database.js';

export async function PATCH({locals,request}) {
    const id = locals.user?.id;

    const data = await request.json();
    let response;

    if(data.status === 'added') {
        response = newLike(id,data.postId,data.type)        
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