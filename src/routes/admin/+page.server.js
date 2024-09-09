import { getUserById, getAllSkills, getCompanyById, getFriends, getJobTitleById, getSkillById, getUniversityById, getUsers, getUserSkillsById, getWorkExperience, getWorkExperienceById, getPostsByUserId, getJobsByUserId } from "../../../getters";


export async function load({locals}) {
    const id = locals.user?.id;

    const allUsers = getUsers();
    for(const user of allUsers) {
        if(user.current_company) user.current_company = getCompanyById(user.current_company)
        if(user.job_title) user.job_title = getJobTitleById(user.job_title)
        if(user.university) user.university = getUniversityById(user.university);
        const workExp = getWorkExperienceById(id);
        workExp.forEach((job,index) => {
            job.CompanyId = getCompanyById(job.CompanyId)
            if(job.jobTitleId)
                job.JobTitleId = getJobTitleById(job.JobtitleId)

        })

        user.work_experience = workExp;

        user.friends = getFriends(id);
        for(const friendship of user.friends) {
            let self = getUserById(id);
            self = self.username
            if(friendship.Recipient === id) {
                friendship.Recipient = self;
                friendship.Sender = getUserById(friendship.Sender)
                friendship.Sender = friendship.Sender.username
            } else {
                friendship.Sender = self;
                friendship.Recipient = getUserById(friendship.Recipient);
                friendship.Recipient = friendship.Recipient.username
            } 
        }

        user.skills = getUserSkillsById(id,'User')
        for(const skill of user.skills) {
            skill.name = getSkillById(skill.SkillId)
            skill.name = skill.name.SkillName
        }

        user.posts = getPostsByUserId(id);
        let self = getUserById(id)
        
        for(const post of user.posts) {
            post.posterUsername = self.username
        }

        user.job_adverts = getJobsByUserId(id);
        
    }
    return {allUsers}
}