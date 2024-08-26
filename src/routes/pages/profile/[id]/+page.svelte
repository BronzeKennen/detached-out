
<script>
    import PrevJobView from "../../../../components/prevJobView.svelte";
    import Friend from "../../../../components/friend.svelte";
    import { onMount } from 'svelte'

    export let data;
    const profile = data.userProfile;

    let workExperience;
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
</script>
<style>
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
    }

    .nameJob {
        padding-left: 10%;
        height: 20vh;
        display: flex;
        flex-direction: column;
    }
    .name {
        margin-top: 5%;
        text-align: center;
        font-size: large;
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

</style>

<div class="top-profile">
    <div class="background"></div>
    <div class="pfp"></div>
    <div class="nameJob">
        <div class='name'>{firstName} {lastName} 
            {#if currCompany} @ {currCompany}, {#if currJobTitle} {currJobTitle} {/if} {/if}
        </div>
        <br>
       {#if bio}
       <p>{bio}</p>
       {:else}
       <p class="blank">This user has no biography.</p>
       {/if}
    
    </div>
</div>
<div class="details">
    <div class="fieldTitle">Education</div>
    <div class="mandFields">
        <div class="fieldContainer">
            {#if uni}
            <p>Studied at {uni} with a major in {major}</p>
            {:else}
            <p class="blank">This user has not set their education</p>
            {/if}
            
        </div>
    </div>
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
</div>