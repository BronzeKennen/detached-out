
<script>
    import PrevJob from "../../../../components/prevJob.svelte";
    import Friend from "../../../../components/friend.svelte";
    import { onMount } from 'svelte'

    export let data;
    const profile = data.userProfile;

    //if someone hasn't set these, set a dummy object!
    if(profile.current_company === null) profile.current_company = {CompanyId: null, company_name: ''};
    if(profile.job_title === null) profile.job_title= {JobTitleId: null, JobTitle: ''};
    if(profile.university === null) profile.university = {UniversityId: null, university_name: '', major: ''};

    //copy of the profile to refer to any changes made

    console.log(profile)

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
        padding-left: 25vh;
        height: 20vh;
        display: flex;
        flex-direction: column;
    }
    .name {
        margin-top: 5%;
        text-align: center;
        font-size: x-large;
        font-weight: bold;
    }
    .companyAndTitle {
        font-size: larger;
    }

</style>

<div class="top-profile">
    <div class="background"></div>
    <div class="pfp"></div>
    <div class="nameJob">
        <div class='name'>{firstName} {lastName}</div>
       {#if currCompany} <div class='companyAndTitle'>{currCompany}, {#if currJobTitle} {currJobTitle} {/if}</div> {/if}
       <br>
       <p>{bio}</p>
    
    </div>
</div>
<div class="details">
    <div class="fieldTitle">Personal Information</div>
    <div class="mandFields">
        <div class="fieldContainer">
            
        </div>
    </div>
</div>