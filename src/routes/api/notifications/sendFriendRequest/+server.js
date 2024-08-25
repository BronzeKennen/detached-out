import { sendFriendRequest } from "../../../../../database"

export const POST = async ({request}) => {
    let data = await request.json()
    const resp = sendFriendRequest(data.sender,data.recipient);
    if(resp) {
        return new Response(JSON.stringify('Request sent succesfully'), {status:200});
    } else {
        return new Response(JSON.stringify('What du heelll'), {status:400});
        
    }
}