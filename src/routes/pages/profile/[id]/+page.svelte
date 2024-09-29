
<script>
    import PrevJobView from "../../../../components/prevJobView.svelte";
    import Friend from "../../../../components/friend.svelte";
    import { onMount } from 'svelte'
    import { friendStore } from '$lib/stores'
    import SoftSkillsView from "../../../../components/softSkillsView.svelte";
    import LoadPosts from "../../../../components/loadPosts.svelte";

    export let data;
    const profile = data.userProfile;




    let workExperience;
    let connectButton;
    let workExp = true;
    onMount(async () => {
        const response = await fetch(`/api/workexp?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        if(response.ok) {
            workExperience = await response.json();
            if(workExperience.body.length  === 0) {
                workExp= false;
            }
            console.log('Successfully fetched work experience')
            
        } else {
            console.log('ITS A BOMB');
        }
    })
    //if someone hasn't set these, set a dummy object!
    if(profile.current_company === null) profile.current_company = {CompanyId: null, company_name: ''};
    if(profile.job_title === null) profile.job_title= {JobTitleId: null, JobTitle: ''};
    if(profile.university === null) profile.university = {UniversityId: null, university_name: '', major: ''};

    //copy of the profile to refer to any changes made

    const defaultPfp = '/defaultpfp.png'

    // ... 
    let firstName = profile.fname;
    let lastName = profile.lname;
    let currJobTitle = profile.job_title.JobTitle;
    let currCompany = profile.current_company.company_name;
    let country = profile.country_of_residence;
    let state = profile.state;
    let bio = profile.biography;
    let id = profile.UserId;
    let friends = profile.friends;
    // format mm-dd-yyyy
    let birthday = profile.date_of_birth;
    //for future reference
    let uni = profile.university.university_name;
    let major = profile.university.major;
    let uniFrom = profile.university.StartDate;
    let uniTo = profile.university.EndDate;
    let pfp = profile.profile_pic_url;
    if(!pfp) pfp = defaultPfp

    let bgColor = profile.background_color
    if(!bgColor) bgColor = "#eed3e8"

    const followRequest = (async () => {
        const resp = await fetch('/api/notifications/sendFriendRequest', { 
            headers : {
                'Content-Type' : 'application/json'
            },
            method:'POST',
            body: JSON.stringify({
                recipient: id
            })
        })
        .then(resp => resp.ok ? resp.json() : null)
        .then(friend => {
            profile.button = 'pending'
            if(friend) {
                if(!$friendStore) {
                    friendStore.set([friend.friend]);
                } else {
                    friendStore.update(friends => [...friends, friend.friend]);
                }
            }
        })
    })
</script>
<style>
    a {
        color:inherit;
        text-decoration: none;
    }
    .top-profile {
        margin:.5rem;
        border-radius:10%;
        position:relative;
        flex:1;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: start;
    }
    .details {
        display: flex;
        flex-direction: column;
        align-items: start;
        position: relative;
        top: -15vh;
        padding-left: 10%;
        padding-right: 10%;
    }

    .background {
        border-radius:25px;
        height: 45vh;
        background-color: beige;
        width: 100%;
        position: relative;
    }

    .pfp {
        height: 40vh;
        width: 40vh;
        border-radius: 50%;
        border: 3px white solid;
        background-color: aqua;
        position: relative; 
        transform: translate(+25%, -50%);
        background-size: cover; /* Ensures the image covers the element */
        background-position: center; /* Centers the image within the element */
        background-repeat: no-repeat; /* Prevents the image from repeating */
    }

    #addFriend {
        margin-top: auto;
        margin-bottom: auto;
        width: fit-content;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        border:2px black solid;
        background:none;
        border-radius:40px;
        text-wrap: nowrap;
        height: 2rem;
    }
    #addFriend:hover {
        background-color: rgba(0, 0, 0, 0.171);
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
        transition-duration: .3s;
    }
    .nameJob {
        padding-left: 10%;
        height: 20vh;
        display: flex;
        flex-direction: column;
        max-width: 50%;
    }
    .name {
        display: flex;
        gap: 1rem;
        margin-top: 5%;
        text-align: center;
        font-size: xx-large;
        text-align: left;
        font-weight: bold;
    }
    .fieldTitle {
        font-weight: bolder;
        font-size: xx-large;
        margin-bottom: 1rem;
    }
    .blank {
        opacity:60%;
    }
    .separator {
        border:none;
        border-top:1px solid #ccc;
        margin:3% 0;
        min-width:100%;
    }
    .work-exp {
        width:100%;

    }
    .university {
        width:100%;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .university p {
        font-size:13px;
        opacity:60%;
    }
    .interaction-buttons {
        margin-top:1rem;
    }
    .accepted {
        font-size:10px;
        margin-top:1rem;
        opacity:90%;
        color:rgb(22, 155, 22);
    }
    .posts {
        width:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .post {
        width:60%;
    }
</style>

<div class="top-profile">
    <div class="background" style="background-color:{bgColor}"></div>
    <div class="pfp" style={`background-image:url(${pfp});`}></div>
    <div class="nameJob">
        <div class='name'>
            {firstName} {lastName} {#if currCompany} @ {currCompany}, {#if currJobTitle} {currJobTitle} {/if} {/if}
        </div>
        {#if profile.button === 'accepted'} <span class="accepted">Connected</span>{/if}
        <br>
       {#if bio}
       <p>{bio}</p>
       {:else}
       <p class="blank">This user has no biography.</p>
       {/if}
       {#if profile.button !== 'own'}
        <div class="interaction-buttons">
            {#if profile.button === 'pending'}
                <button id="addFriend" disabled=true><i class="fa-solid fa-plus"></i> Pending...</button>
            {:else if profile.button === 'rejected'}
                <button id="addFriend" disabled=true><i class="fa-solid fa-plus"></i> Connect</button>
            {:else if profile.button !== 'accepted'}
                <button id="addFriend" on:click={followRequest}><i class="fa-solid fa-plus"></i> Connect</button>
            {/if}
            <button id="addFriend"><a href="/pages/chats/{id}"><i class="fa-solid fa-paper-plane"></i> Message</a> </button>
        </div>
        {/if}
    </div>
    
</div>
<div class="details">
    <div class="fieldTitle">Education</div>
            {#if uni}
            <div class="university">
                        <h4>Studied at {uni} with a major in {major}</h4>
                        {#if uniFrom}
                        <p>{uniFrom} - {#if uniTo} {uniTo} {:else} Present {/if}</p>
                        {/if}
            </div>
            {:else}
            <p class="blank">This user has not set their education</p>
            {/if}
            
    <div class="separator"></div>
    <div class="fieldTitle">Current Employment Information</div>
    <div class="mandFields">
        {#if !currCompany}
            <p class="blank">This user has no current working company</p>
        {:else}
            <p>Currently working in {currCompany} as {currJobTitle}</p>
        {/if}
    </div>
    <div class="separator"></div>
    <div class="fieldTitle">Work Experience</div>
    <div class="work-exp">
        <div class="mandFields">
            {#if !workExp}
                <p class="blank">This user has no previous work experience</p>
            {:else}
                {#if workExperience}
                    {#each workExperience.body as exJob}
                        {#if exJob.Private === 0}
                            <PrevJobView
                                employer={exJob.CompanyId} 
                                JobTitle={exJob.JobTitleId} 
                                from={exJob.StartDate} 
                                to={exJob.EndDate}
    
                            />
                        {/if}
                    {/each}
                {/if}
            {/if}
        </div>
    </div>
    <div class="fieldTitle">Soft Skills</div>
    <div class="mandFields">
        {#if !profile.skills.length}
        <p>This user has not set their soft skills</p>
        {/if}
        <SoftSkillsView skills={profile.skills}/>
    </div>
    <div class="separator"></div>
</div>