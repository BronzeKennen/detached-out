import { editPostContent } from '../../../../../setters.js';
export const PATCH = async ({request}) => {
    const data = await request.json();
    const id = data.postId
    const content = data.newContent;
    const resp = editPostContent(id,content);
    if(resp) {
        return new Response({status:200, message:"Success"})
    } else {
        return new Response({status:500, message:"Internal Server Error"})
    }
}