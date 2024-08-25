import {getUserById,acceptFriendRequest, getFriends , getNotifications} from "../../../../../database"

export const PATCH = async ({request}) => {
    const data = await request.json();
    const sender = getUserById(data.sender.UserId)
    const recipient = getUserById(data.recipient)

    const resp = acceptFriendRequest(sender.UserId,recipient.UserId);
    if(resp) {
        return new Response({status: 200, message:'Success'});
    } else {
        return new Response({status:400, message:'bad request'});
    }
    
}