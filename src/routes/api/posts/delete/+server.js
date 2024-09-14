import { deletePostById } from '../../../../../setters.js';

export const DELETE = async ({request}) => {
    const url = new URL(request.url)
    const postId = parseInt(url.searchParams.get('postId')) || null; 
    if(!postId) {
        return new Response({status:400,message:"post id not given"});
    }
    const resp = deletePostById(postId)
    if(resp) {
        return new Response({status:200,message:"Deleted successfully"})
    } else {
        return new Response({status:500,message:"Internal Server Error"})
    }
}