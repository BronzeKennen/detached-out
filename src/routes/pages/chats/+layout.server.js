import { getChatBubbles, getCompanyById, getJobTitleById, getUniversityById, getUserById } from '../../../../getters.js';

export async function load({locals}) {
    const id = locals.user?.id;
    let receivers = [];
    const bubbles = getChatBubbles(id);
    for(const bubble of bubbles) {
        if(bubble.FirstId === id)
            receivers = [...receivers,bubble.SecondId];
        else
            receivers = [...receivers,bubble.FirstId];

    }

    for (let i = 0; i < receivers.length; i++) {
        const receiverId = receivers[i];
        const r = getUserById(receiverId);
    
        receivers[i] = {
            username: r.username,
            UserId: r.UserId,
            profile_pic_url: r.profile_pic_url,
            current_company: r.current_company ? getCompanyById(r.current_company) : null,
            job_title: r.job_title ? getJobTitleById(r.job_title) : null,
            university: r.university ? getUniversityById(r.university) : null
        };
    }
    console.log(receivers)
    return {receivers}
}