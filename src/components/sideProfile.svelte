<script>
    import { selectedProfile } from '$lib/stores'

    $: $selectedProfile;
    console.log($selectedProfile)

    let profile = $selectedProfile;
    
    if(!profile.university) {
        profile.university = {university_name : '', major:''}
    }
    if(!profile.current_company) {
        profile.current_company = {company_name : ''}
    }
    if(!profile.job_title) {
        profile.job_title = {JobTitle : ''}
    }

    let connectionNum = 0;

</script>
<style>
    .side-profile {
        margin:.5rem;
        border-radius:10%;
        position:relative;
        flex:1;
    }
    .background {
        border-top-left-radius:10px;
        border-top-right-radius:10px;
        height:75px;
        background-color: beige;
    }
    .pfp {
        position:absolute;
        width:75px;
        height:75px;
        top:75px;
        left:50%;
        border-radius:50%;
        border:3px white solid;
        background-color:aqua;
        transform: translate(-50%, -50%);
    }
    .details {
        display: flex;
        flex-direction: column-reverse;
        align-items: start;
        border-bottom-left-radius:10px;
        border-bottom-right-radius:10px;
        background-color:rgb(0, 0, 0);
        min-height:180px;
        padding-bottom: 2px;
    }

    .details .name {
        margin-left: 5%;
        color: white;
        font-size: large;
        font-weight: bolder;
    }

    .details .info {
        margin-left: 5%;
        font-size: small;
        color: white;
    }
    .connections {
        min-width:90%;
        padding: 1.5rem 0;
        margin-left:5%;
        color:white;
        font-size:medium;
    }
    .connections a {
        color:white;
    }

    @media (max-width: 800px) {
        .side-profile {
            width:50%;
        }
    }
    @media (max-width: 600px) {
        .side-profile {
            margin:.5rem 0;
            width:100%;
        }
    }
</style>
<div class="side-profile">
    <div class="background">
    </div>
    <div class="pfp">
        

    </div>
    <div class="details">
        <div class="connections">
            <div class=""> Connections {connectionNum} * <a href="/pages/network">Grow your network</a></div>
        </div>
        <div class='info'>{profile.university.university_name} * {profile.university.major} </div>
        <div class='info'>{profile.current_company.company_name} * {profile.job_title.JobTitle}</div>
        <div class='name'>  {$selectedProfile.fname} {$selectedProfile.lname}</div>
    </div>
</div>