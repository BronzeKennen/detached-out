<script>
    import {fade} from 'svelte/transition'
    import { onDestroy } from "svelte";
    import { onMount } from "svelte";
    import ProfileIcon from "./profileIcon.svelte";

    export let job;
    export let id;
    export let selected = false;
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

    let editing = false;

    const editJob = () => {
        editing = true;
    }
    const saveChanges = async () => {
        const resp = await fetch('/api/jobs', {
            method:'PATCH',
            body: JSON.stringify({
                jobId:job.AdvertId,
                JobTitle: job.JobTitle,
                JobDescription: job.JobDescription,
                EnrollmentType: job.EnrollmentType,
                Location: job.Location,
                MonthlyWage: job.MonthlyWage,
                WorkplaceType: job.WorkplaceType,
                AdditionalInfo: job.AdditionalInfo
            })
        })
        if(resp.ok) {
            console.log("Success")
            ogTitle = job.JobTitle;
            ogDesc = job.JobDescription
            ogEnrollment = job.EnrollmentType
            ogLocation = job.Location
            ogWage = job.MonthlyWage
            ogWorkplace = job.WorkplaceType
            ogAdditional = job.AdditionalInfo
            const skillResp = await fetch('/api/skills', {
                method:"POST",
                body: JSON.stringify({
                    type:"Job",
                    newSkills: desiredSkills,
                    id: job.AdvertId
                })
            })
            if(skillResp.ok) {
                console.log('success')
            }
            editing = false;

        } else {
            console.log("An error has occured")
        }
    }

    let deleted = false;
    const deleteJob = async () => {
        deleted = true
        const resp  = await fetch('/api/jobs',{
            method:'DELETE',
            body:JSON.stringify({
                jobId:job.AdvertId
            })
        })
        
        if(resp.ok) {
            console.log("success")
        } else {
            console.log("An error occured");
        }
    }

     const skillsOptions = [
        'Communication', 'Leadership', 'Teamwork', 'Problem-solving', 'Time management', 
        'Adaptability', 'Critical thinking', 'Creativity', 'Emotional intelligence', 
        'Conflict resolution', 'Active listening', 'Negotiation', 'Decision making', 
        'Stress management', 'Attention to detail', 'Organization', 'Initiative', 
        'Flexibility', 'Multitasking', 'Reliability', 'Responsibility', 'Work ethic', 
        'Patience', 'Open-mindedness', 'Persuasion', 'Public speaking', 'Networking', 
        'Mentoring', 'Coaching', 'Collaboration', 'Empathy', 'Positive attitude', 
        'Self-motivation', 'Self-awareness', 'Strategic thinking', 'Analytical thinking', 
        'Presentation skills', 'Innovation', 'Resourcefulness', 'Accountability', 
        'Dependability', 'Integrity', 'Diplomacy', 'Tact', 'Enthusiasm', 'Proactiveness', 
        'Detail-oriented', 'Ability to learn quickly', 'Goal-oriented', 'Self-discipline', 
        'Assertiveness', 'Cultural awareness', 'Conflict management', 'Team building', 
        'Customer service', 'Listening skills', 'Influencing', 'Facilitation', 
        'Self-confidence', 'Trustworthiness', 'Interpersonal skills', 
        'Positive reinforcement', 'Respectfulness', 'Self-initiative', 
        'Motivational skills', 'Organizational skills', 'Problem sensitivity', 
        'Active collaboration', 'Innovation mindset', 'Leadership presence', 
        'Learning agility', 'Mediation', 'Persuasiveness', 'Professionalism', 
        'Self-regulation', 'Social skills', 'Stress tolerance', 'Team leadership', 
        'Visionary thinking', 'Workplace etiquette', 'Critical analysis', 
        'Emotional resilience', 'Facilitation skills', 'Initiative-taking', 
        'Learning skills', 'Motivating others', 'Networking skills', 'Positive mindset', 
        'Resource management', 'Conflict de-escalation', 'Emotional stability', 
        'Negotiation strategies', 'Relationship building', 'Responsiveness', 
        'Situational awareness', 'Team coordination', 'Team facilitation', 
        'Time prioritization', 'Virtual collaboration', 'Work-life balance'
    ]; 

    let skills = job.skills;
    for(let i = 0; i< skills.length; i++){
        skills[i] = skills[i].name.SkillName
    }
    $:desiredSkills = skills

    function updateSkills(event) {
        const skill = event.target.value; 
        if (skill && !desiredSkills.includes(skill)) {
            desiredSkills = [...desiredSkills, skill]; 
        }
    }

    function deleteSkill(skill) {
        desiredSkills = desiredSkills.filter(s => s !== skill); 
    }

    let ogTitle = job.JobTitle;
    let ogDesc = job.JobDescription
    let ogEnrollment = job.EnrollmentType
    let ogLocation = job.Location
    let ogWage = job.MonthlyWage
    let ogWorkplace = job.WorkplaceType
    let ogAdditional = job.AdditionalInfo
    $: ogSkills = desiredSkills

    function quitEditing() {
        editing = false;
        job.JobTitle = ogTitle;
        job.JobDescription = ogDesc;
        job.Enrollment = ogEnrollment;
        job.Location = ogLocation;
        job.MonthlyWage = ogWage
        job.WorkplaceType = ogWorkplace
        job.AdditionalInfo = ogAdditional
        desiredSkills = ogSkills
    }
    
    function autoResize(event) {
        const textarea = event.target;
        textarea.style.height = 'auto';

        if(textarea.scrollHeight < 70) {// wtf is this 
            textarea.style.height = `${textarea.scrollHeight - 10}px`;
        } else {
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }

    let workplaceType = '';
    let skillToAdd;
    let moreInfo = '';
    let enrollmentOptions = ['Full-time', 'Part-time'];
    let workplaceOptions = ['On-Site', 'Hybrid', 'Remote'];
</script>

{#if !deleted}
<div class="feed-post {selected ? 'selected' : ''}" transition:fade={{duration:200}}>
    <div class="stats">
        <ProfileIcon id={poster.UserId} user={poster.username} pfp={poster.profile_pic_url} edu={poster.university}/>
            {#if poster.UserId === id}
                {#if !editing}
                    <div id="timePassed"> {timePassed} <i class="fa-regular fa-clock"></i>
                        <button class="edit-button" on:click={editJob}>Edit</button>
                    </div>
                {:else}
                    <div id="timePassed"> {timePassed} <i class="fa-regular fa-clock"></i>
                        <button class="delete-button" on:click={deleteJob}>Delete Post</button>
                        <button class="discard-button-top" on:click={quitEditing}>X</button>
                    </div>
                    <div id="field">
                    <div class="fieldTitle">Title:</div>
                    <textarea required
                        id="title"
                        type="text" 
                        placeholder=""
                        bind:value={job.JobTitle}
                    />
                    </div>
                    <div id="field">
                        <div class="fieldTitle">Job Description:</div>
                        <textarea
                            id="jobDesc"
                            type="text" 
                            placeholder=""
                            bind:value={job.JobDescription}
                            on:input={autoResize} 
                        />
                    </div>
                    <div id="field">
                        <div class="fieldTitle">Location:</div>
                        <textarea required
                            id="title"
                            type="text" 
                            placeholder=""
                            bind:value={job.Location}
                        />
                    </div>
                    <div id="field">
                        <div class="fieldTitle">Monthly Wage:</div>
                        <input required
                            id="title"
                            type="number" 
                            placeholder=""
                            bind:value={job.MonthlyWage}
                            min = "0"
                            step="0.1"
                        />
                    </div>
                    <div id="field">
                        <div class="fieldTitle">Enrollment Type:</div>
                        <select required id="title" bind:value={job.EnrollmentType}>
                            <option value="" disabled selected hidden></option>
                            {#each enrollmentOptions as type}
                                <option value={type}>{type}</option>
                            {/each}
                        </select>
                    </div>
                    <div id="field">
                        <div class="fieldTitle">Workplace Type:</div>
                        <select required id="title" bind:value={job.WorkplaceType}>
                            <option value="" disabled selected hidden></option>
                            {#each workplaceOptions as type}
                                <option value={type}>{type}</option>
                            {/each}
                        </select>
                    </div>
                    <div id="field">
                        <div class="fieldTitle">Desired Skills:</div>
                        <select required id="title" bind:value={skillToAdd} on:change={updateSkills}>
                            <option value="" disabled selected hidden></option>
                                {#each skillsOptions as skill}
                                    <option value={skill}>{skill}</option>
                                {/each}
                        </select>
                    </div>
                    {#if desiredSkills.length}
                        <div class="desiredSkills">
                            {#each desiredSkills as skill}
                                <div class="skill">{skill} <button id="deleteSkill" on:click={() => deleteSkill(skill)}><i class="fa-solid fa-x"></i></button></div>
                            {/each}
                        </div>
                    {/if}
                    <div id="field">
                            <div class="fieldTitle">Additional Info:</div>
                            <textarea
                                id="moreInfo"
                                type="text" 
                                placeholder=""
                                bind:value={job.AdditionalInfo}
                                on:input={autoResize} 
                            />
                    </div>
                    <button class="save-button" on:click={saveChanges}>Save</button>

                {/if}
            {/if}
        </div>
    {#if !editing}
        <div class="post">
            <div class="jobTitle">{job.JobTitle}</div>
            <div id="basicInfo">• {job.EnrollmentType}</div>
            <div id="basicInfo">• Location: {job.Location} ({job.WorkplaceType})</div>
            <div id="basicInfo">• Monthly wage: {job.MonthlyWage}€</div>
            <div id="basicInfo">• Desired Skills:
                <div class="desiredSkills">
                    {#each desiredSkills as skill}
                        <div class="skill">{skill}</div>
                    {/each}
                </div>
            </div>
            <div id="basicInfo">
                • Additional Info: {job.AdditionalInfo}
            </div>
        </div>
        {#if job.applications.length}
        <h4>Users that applied</h4>
        <div class="applications-received">
                {#each job.applications as application}
                <div class="applicant">
                    <p>{application.Applicant.username}</p>
                </div>
                {/each}
        </div>
        {/if}
    {/if}
</div>
{/if}
    
<style>
    .save-button {
        border-radius:7px;
        border:none;
        width:25%;
        height: 1.5rem;
        margin:.3rem 70%;
        box-shadow:0 2px 5px rgb(185, 50, 238);
        background-color: #9145a0; 
        color: white;
        font-weight: bold;
        cursor: pointer;
    }

    .save-button:hover, .delete-button:hover, .discard-button-top:hover {
        box-shadow: 0 2px 8px rgb(185, 50, 238);
    }

    .delete-button {
        box-shadow:0 2px 5px rgb(185, 50, 238);
        background-color: #9145a0; 
        color: white;
        font-weight: bold;
        cursor: pointer;
        border:none;
        margin:0 .2rem;
        border-radius:10px;
        padding:.3em;
    }

    .discard-button-top {
        box-shadow:0 2px 5px rgb(185, 50, 238);
        background-color: #9145a0; 
        color: white;
        font-weight: bold;
        cursor: pointer;
        border-radius:20px;
        border:none;
        width:25px;
        height:25px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right:.5em;
    
    }

    #jobDesc {
        min-height: 2rem;
        min-height:200px;
        border: none;
        border-radius: 10px;
        box-sizing: border-box;
        background-color: rgb(250, 240, 255);
        min-width: 70%;
        width: fit-content;
        display: flex;
        position: relative;
        resize: none;
        padding: .5rem;
        padding-left: 0.5;
        margin: auto 0.5rem;
    }

    #title, #moreInfo {
        min-height: 2rem;
        height: fit-content;
        border: none;
        border-radius: 10px;
        box-sizing: border-box;
        background-color: rgb(250, 240, 255);
        min-width: 50%;
        max-width: 100%;
        display: flex;
        position: relative;
        resize: none;
        padding: .5rem;
        padding-left: 0.5;
        margin: auto 0.5rem;
    }

    #moreInfo {
        word-wrap: break-word;  
        white-space: normal;
    }

    #title:focus, #moreInfo:focus, #jobDesc:focus {
        outline: none;
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
    }

    #title:hover, #moreInfo:focus, #jobDesc:hover {
        animation-duration: 0.5s;
        box-shadow: 0px 0px 5px rgba(75, 17, 113, 1.452);
    }

     #deleteSkill {
        cursor: pointer;
        background: none;
        border: none;
        color: black;
        margin-left: 0.5rem;
        margin-right: -0.25rem;
        font-size: xx-small;
    }

    .applications-received {
        display:grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        width:100%;
    }
    .applicant {
        margin:.5rem;
        border-radius:5px;
        background-color:#f2eaf3;
        padding:.5rem;
    }
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
        display:flex;
        width: fit-content;
        position: absolute;
        top: 0;
        right: 0;
        font-size: small;
    }
    #timePassed i {
        margin:.25rem;
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
        text-wrap: wrap;
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

    .edit-button {
        border:none;
        background-color: white;
        cursor:pointer;
        margin-left:1em;
        margin-right:.5em;
    }

    #field {
        margin:.5em;
        display: flex;
        flex-direction: row;
        width: 100%;
        max-width: 100%;
    }

    .selected {
        border: 1px solid rgba(185, 50, 238, 0.5);
        box-shadow: 0 2px 5px rgba(185, 50, 238, 0.5);
    }

    .fieldTitle {
        display: flex;
        text-wrap: nowrap;
        font-weight: bold;
        margin-top: 0.25rem;
    }
    @media(max-width: 800px) {
        .jobTitle {
            font-size: large;
            font-weight: bold;
            font-style: italic;
        }
    }
</style>