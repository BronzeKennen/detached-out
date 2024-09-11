<script>
    import FeedJob from "./feedJob.svelte";
    import ProfileIcon from "./profileIcon.svelte";
    // $: postBody =''
    export let pfp;
    // let postButton;

    

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

    let desiredSkills = [];
    let skillToAdd = '';
    let createdJob = false;

    function updateSkills(event) {
        const skill = event.target.value; 
        if (skill && !desiredSkills.includes(skill)) {
            desiredSkills = [...desiredSkills, skill]; 
        }
    }

    function deleteSkill(skill) {
        desiredSkills = desiredSkills.filter(s => s !== skill); 
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


    let postJob = false;

    function newPost() {
        postJob = !postJob;
    }

    async function createPost() {
        const resp = await fetch('/api/jobs',{
            method:"POST",
            body: JSON.stringify({
                title:title,
                enrollmentType: enrollmentType,
                location:location,
                workplaceType:workplaceType,
                monthlyWage:monthlyWage,
                moreInfo:moreInfo
            })
        })
        if(!resp.ok) {
            console.log("An error has occured")
            return;
        }
        console.log('success')
        const response = await resp.json()

        if(!desiredSkills.length) return;

        const skillResp = await fetch('/api/skills', {
            method:"POST",
            body: JSON.stringify({
                type:"Job",
                newSkills: desiredSkills,
                id: response.postId
            })
        })
        if(skillResp.ok) {
            console.log('success')
        }
        // Reset all things
        postJob = !postJob;
        title = '';
        enrollmentType = '';
        location = '';
        workplaceType = '';
        monthlyWage;
        moreInfo = '';
        desiredSkills = [];
        // createdJob = true;
    }

    export let title = '';
    export let enrollmentOptions = ['Full-time', 'Part-time'];
    export let enrollmentType = '';
    export let location = '';
    export let workplaceOptions = ['On-Site', 'Hybrid', 'Remote'];
    export let workplaceType = '';
    export let monthlyWage;
    export let moreInfo = '';
</script>

    {#if !postJob}
        <button on:click={newPost} id="newAdvert" class="under-text-button">Place an advert.</button>
    {/if}
    {#if postJob}
        <div class="new-post">
            <div style="margin-top: -0.5rem; margin-bottom: 1rem; font-weight:bold; font-size:x-large"> New job advert</div>
            <div id="field">
                <div class="fieldTitle">Title:</div>
                <textarea required
                    id="title"
                    type="text" 
                    placeholder=""
                    bind:value={title}
                />
            </div>
            <div id="field">
                <div class="fieldTitle">Job Description</div>
                <textarea
                    id="job-desc"
                            type="text" 
                            placeholder=""
                            bind:value={moreInfo}
                            on:input={autoResize} 
                />
            </div>
            <div id="field">
                <div class="fieldTitle">Location:</div>
                <textarea required
                    id="title"
                    type="text" 
                    placeholder=""
                    bind:value={location}
                />
            </div>
            <div id="field">
                <div class="fieldTitle">Monthly Wage:</div>
                <input required
                    id="title"
                    type="number" 
                    placeholder=""
                    bind:value={monthlyWage}
                    min = "0"
                    step="0.1"
                />
            </div>
            <div id="field">
                <div class="fieldTitle">Enrollment Type:</div>
                <select required id="title" bind:value={enrollmentType}>
                    <option value="" disabled selected hidden></option>
                    {#each enrollmentOptions as type}
                        <option value={type}>{type}</option>
                    {/each}
                </select>
            </div>
            <div id="field">
                <div class="fieldTitle">Workplace Type:</div>
                <select required id="title" bind:value={workplaceType}>
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
                            bind:value={moreInfo}
                            on:input={autoResize} 
                />
            </div>
            <span class="buttons">
                <button id="postButton" class="under-text-button" on:click={createPost}>Post</button>
                <label for="uploadButton" id="uploadLabel">Cancel</label>
                <button id="uploadButton" on:click={newPost}></button>
            </span>
        </div>
    {/if}
    {#if createdJob}
        <FeedJob
            title = {title};
            enrollmentType = {enrollmentType};
            location = {location};
            workplaceType = {workplaceType};
            monthlyWage = {monthlyWage};
            moreInfo = {moreInfo};
        />
    {/if}


<style>
    #deleteSkill {
        cursor: pointer;
        background: none;
        border: none;
        color: black;
        margin-left: 0.5rem;
        margin-right: -0.25rem;
        font-size: xx-small;
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

    select {
        appearance: none;
        -webkit-appearance: none;
    }

    #field {
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    .fieldTitle {
        display: flex;
        text-wrap: nowrap;
        font-weight: bold;
        margin-top: 0.25rem;
    }

    .buttons {
        display:flex;
        flex-direction: row;
        width:100%;
        justify-content: flex-end;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .new-post {
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        background-color:white;
        box-shadow: 0 1.5px 1px rgb(159, 154, 161);
        align-items: start;
        flex: 2;
        border-radius:10px;
        padding:1rem;
        margin:.5rem;
        gap: 0.5rem;
    }

    .new-post:hover {
        box-shadow: 0 1px 5px rgb(147, 47, 214);
        transition-duration:.3s;

    }
    #job-desc {
        min-height: 2rem;
        min-height:200px;
        border: none;
        border-radius: 10px;
        box-sizing: border-box;
        background-color: rgb(250, 240, 255);
        min-width: 80%;
        width: fit-content;
        display: flex;
        position: relative;
        resize: none;
        padding: .5rem;
        padding-left: 0.5;
        margin: auto 0.5rem;
    }

    #uploadButton {
        display: none;
    }

    #title, #moreInfo {
        min-height: 2rem;
        height: 2rem;
        border: none;
        border-radius: 10px;
        box-sizing: border-box;
        background-color: rgb(250, 240, 255);
        min-width: 50%;
        width: fit-content;
        display: flex;
        position: relative;
        resize: none;
        padding: .5rem;
        padding-left: 0.5;
        margin: auto 0.5rem;
    }

    #moreInfo {
        width: 100%;
    }

    #title:focus, #moreInfo:focus {
        outline: none;
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
    }

    #title:hover, #moreInfo:focus {
        animation-duration: 0.5s;
        box-shadow: 0px 0px 5px rgba(75, 17, 113, 1.452);
    }

    .under-text-button {
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 8px;
        height: 1.5rem;
        box-sizing: border-box;
        position: relative;
        width:15%;
        margin:0 .2rem;

    }

    #uploadLabel {
        display:flex;
        justify-content: center;
        align-items: center;
        color:black;
        font-size:13px;
        font-weight: bold;
        border-radius: 8px;
        height: 1.5rem;
        box-sizing: border-box;
        position: relative;
        width:15%;
        margin:0 .2rem;
        box-shadow:0 1px 3.5px rgb(185, 50, 238);
        background-color: rgb(240, 227, 240);
    }
    #postButton, #newAdvert {
        box-shadow:0 2px 5px rgb(185, 50, 238);
        background-color: #9145a0; 
    }

    #newAdvert {
        cursor: pointer;
        margin-left: 0.5rem;
        width: fit-content;
        padding: 0 0.5rem;
    }

    #postButton:disabled {
        opacity:70%;
    }

    #postButton:hover {
        cursor: pointer;
        box-shadow:0 2px 10px rgb(185, 50, 238);
        transition-duration: .25s; 
    }
    #uploadLabel:hover {
        cursor: pointer;
        box-shadow:0 1px 6.5px rgb(185, 50, 238);
        transition-duration:.1s
    }

    @media(max-width: 500px) {
        #postButton {
            margin-left: 0;
            width: 20%;
        }
    }

    @media(max-width:1100px) {
       
    }

    @media(max-width:400px) {
       
    }
    @media(max-width:350px) {
        
    }
</style>