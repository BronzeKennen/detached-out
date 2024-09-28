import { newJobImpression } from "../../../../../setters"

export const POST = async ({locals,request}) => {
    const id = locals.user?.id;
    const data = await request.json();
    const resp = newJobImpression(id,data.advertId);

    if(resp) {
        return new Response(JSON.stringify({status:201,message:"Success"}))
    } else {
        return new Response(JSON.stringify({status:500,message:"Failed!"}))
    }
}