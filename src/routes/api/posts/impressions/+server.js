import { newImpresion } from '../../../../../setters.js';


export const POST = async ({locals,request}) => {

    const id = locals.user?.id

    const data  = await request.json();
    const postId = data.postId;

    const resp = newImpresion(id,postId)
    if(resp) {
        return new Response({status:201,message:"success"});
    } else {
        return new Response({status:500,message:"Failed to add impression"});

    }


}