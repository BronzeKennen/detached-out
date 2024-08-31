import { getCompanyById, getJobTitleById, getUserById, sendFriendRequest } from "../../../../../database"

export const POST = async ({request}) => {
    let data = await request.json()
    const resp = sendFriendRequest(data.sender,data.recipient);
    let sender = getUserById(data.sender)
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