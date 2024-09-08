import { getCompanyById, getJobTitleById, getUserById} from "../../../../../getters.js"
import {sendFriendRequest } from "../../../../../setters.js"

export const POST = async ({locals,request}) => {
    let data = await request.json()
    const id = locals.user?.id
    const resp = sendFriendRequest(id,data.recipient);
    let sender = getUserById(id)
    let recipient = getUserById(data.recipient)
    sender = {
        UserId: sender.UserId,
        current_company: getCompanyById(sender.current_company),
        job_title: getJobTitleById(sender.job_title),
        profile_pic_url: sender.profile_pic_url,
        username: sender.username
    }
    recipient = {
        UserId: recipient.UserId,
        current_company: getCompanyById(recipient.current_company),
        job_title: getJobTitleById(recipient.job_title),
        profile_pic_url: recipient.profile_pic_url,
        username: recipient.username
    }
    if(resp) {
        const friend =  {
            FriendId: resp.lastInsertRowid,
            Sender: sender,
            Recipient: recipient,
            Status: 'pending',
        }
        return new Response(JSON.stringify({message:'Request sent successfully',friend:friend}), {status:200});
    } else {
        return new Response(JSON.stringify('What du heelll'), {status:400});
        
    }
}