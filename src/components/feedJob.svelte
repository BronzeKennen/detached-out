<script>
    import { onDestroy } from "svelte";
    import { onMount } from "svelte";
    import ProfileIcon from "./profileIcon.svelte";

    export let job;
    let created = job.DateCreated
    const poster = job.Poster
    let timePassed = '';

    let apply = false;

    function applyToJob() {
        apply = !apply;
    }

    onMount(() => {

        const createdAt = new Date(created.replace(' ', 'T') + 'Z');
        timePassed = calculateTimePassed(createdAt);
    })

    function calculateTimePassed(timestamp) {
        const now = new Date();
        const diff = now - timestamp; // Difference in milliseconds

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days}d`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else if (minutes > 0) {
            return `${minutes}m`;
        } else {
            return `${seconds}s`;
        }
    }
</script>

    <div class="feed-post">
        <div class="stats">
            <ProfileIcon id={poster.UserId} user={poster.username} pfp={poster.profile_pic_url} edu={poster.university}/>
            <div id="timePassed"> {timePassed} <i class="fa-regular fa-clock"></i></div>
        </div>
        <div class="post">
            <div class="jobTitle">{job.JobTitle}</div>
            <div id="basicInfo">• {job.EnrollmentType}</div>
            <div id="basicInfo">• Location: ({job.WorkplaceType})</div>
            <div id="basicInfo">• Monthly wage: {job.MonthlyWage}€</div>
            <div id="basicInfo">• Desired Skills:
                <div class="desiredSkills">
                    {#each job.skills as skill}
                        <div class="skill">{skill.name.SkillName}</div>
                    {/each}
                </div>
            </div>
            <p>{job.AdditionalInfo}</p>
        </div>
        <button id="applyButton" class="under-text-button" on:click={applyToJob}>{apply ? 'Applied' : 'Apply'}</button>
    </div>
    
<style>
    .feed-post {
        align-self: flex-start;
        background-color: white;
        box-shadow: 0 1.5px 1px rgb(159, 154, 161);
        align-items: center;
        flex: 2;
        border-radius:10px;
        padding:1rem;
        margin:.5rem;
    }
    
    #timePassed {
        width: fit-content;
        position: absolute;
        top: 0;
        right: 0;
        font-size: small;
    }

    .stats {
        position: relative;
        margin:-.5rem;
        font-size:18px;
    }
    .post {
        margin:1rem 0rem .5rem 0;
    }

    .jobTitle {
        font-size: x-large;
        font-weight: bold;
        font-style: italic;
    }

    #basicInfo {
        display: flex;
        flex-direction: row;
        font-weight: bold;
        text-wrap: nowrap;
        margin-bottom: 0.25rem;
    }

    .desiredSkills {
        margin-left: 1rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .skill {
        display:flex;
        justify-content: center;
        align-items: center;
        color:black;
        font-size:11px;
        font-weight: bold;
        border-radius: 8px;
        height: 1.25rem;
        box-sizing: border-box;
        position: relative;
        width:fit-content;
        padding: 0 0.5rem;
        box-shadow:0 1px 3.5px rgb(185, 50, 238);
        background-color: rgb(240, 227, 240);
    }

    #applyButton {
        box-shadow:0 2px 5px rgb(185, 50, 238);
        background-color: #9145a0; 
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 8px;
        height: 1.5rem;
        box-sizing: border-box;
        position: relative;
        width:20%;
        margin:0 .2rem 0 80%;
    }

    #applyButton:hover {
        cursor: pointer;
        box-shadow:0 2px 10px rgb(185, 50, 238);
        transition-duration: .25s; 
    }

    @media(max-width: 800px) {
        .jobTitle {
            font-size: large;
            font-weight: bold;
            font-style: italic;
        }
    }
</style>