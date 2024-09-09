<script>
    import { selectedProfile } from '$lib/stores'
    export let user;
    let profile;
    $: $selectedProfile;
    if(!$selectedProfile) {
        selectedProfile.set(user)
        profile = $selectedProfile
    }

    console.log('vite pls');
</script>



<style>
    .side-profile {
        margin:.5rem;
        border-radius:10%;
        position:fixed;
        height: fit-content;
        width: 300px;
    }
    .background {
        box-shadow: 0 1.5px 10px rgb(174, 0, 255);
        border-top-left-radius:10px;
        border-top-right-radius:10px;
        height:75px;
        background-color: rgb(224, 182, 215);
        margin-bottom:3px;
    }
    .pfp {
        position:absolute;
        width:75px;
        height:75px;
        top:75px;
        left:50%;
        border-radius:50%;
        border:4px rgb(212, 0, 255) solid;
        background-color:aqua;
        transform: translate(-50%, -50%);
        background-size: cover; /* Ensures the image covers the element */
        background-position: center; /* Centers the image within the element */
        background-repeat: no-repeat;
    }
    .details {
        box-shadow: 0 4.5px 9px rgb(174, 0, 255);
        display: flex;
        flex-direction: column-reverse;
        align-items: start;
        border-bottom-left-radius:10px;
        border-bottom-right-radius:10px;
        background-color:rgb(255, 255, 255);
        min-height:110px;
        padding-bottom: 2px;
    }

    .details .name {
        margin-left: 5%;
        font-size: large;
        font-weight: bolder;
    }

    .details .info {
        margin-left: 5%;
        font-size: small;
    }
    .connections {
        margin-top:2rem;
        min-width:90%;
        padding: 1.5rem 0;
        margin-left:5%;
        font-size:medium;
    }
    .connections a {
        color:black;
    }

    @media (max-width: 850px) {
        .side-profile {
            width: 250px;
        }
    }

    @media (max-width: 600px) {
        .side-profile {
            position: relative;
            margin-left: auto;
            margin-right: auto;
            width:80%;
        }
    }
</style>
<div class="side-profile">
    <div class="background">
    </div>
    {#if user.profile_pic_url}
    <div class="pfp" style={`background-image: url('${user.profile_pic_url}')`}></div>
    {:else}
    <div class="pfp"></div>
    {/if}
    <div class="details">
        {#if user.university}
        <div class='info'>{user.university.university_name} • {user.university.major} </div>
        {/if}
        {#if user.current_company && user.job_title}
        <div class='info'>{user.current_company.company_name} • {user.job_title.JobTitle}</div>
        {/if}
        <div class='name'>  {user.fname} {user.lname}</div>
        <div class="connections">
            <div class=""> Connections {user.connections} - <a href="/pages/network">Grow your network</a></div>
        </div>
    </div>
</div>