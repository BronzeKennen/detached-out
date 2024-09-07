import { newJobAdvert } from '../../../../setters.js';

export const POST = async ({locals,request}) => {
    const id = locals.user?.id;
    const data = await request.json();
    const resp = newJobAdvert(id,data);
    if(resp) {
        return new Response(JSON.stringify({ postId: resp.lastInsertRowid }), {
            status: 200,
        });
    } else {
        return new Response({status:500})
    }
}