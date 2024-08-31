import {getUserById} from "../../../../../getters.js"
import {acceptFriendRequest} from '../../../../setters.js'

export const PATCH = async ({request}) => {
    const data = await request.json();
    const sender = getUserById(data.sender)
    const recipient = getUserById(data.recipient)

    const resp = acceptFriendRequest(sender.UserId,recipient.UserId);
    if(resp) {
        return new Response({status: 200, message:'Success'});
    } else {
        return new Response({status:400, message:'bad request'});
    }
    
}