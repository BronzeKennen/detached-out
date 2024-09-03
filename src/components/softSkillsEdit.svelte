
<script>
    import { onMount } from "svelte";
    import { onDestroy } from "svelte";
    import ProfileIcon from "./profileIcon.svelte";
    import Comment from "./comment.svelte";

    let clicked = false;

    const skills = [
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

    let currSkills = ['Talkative', 'Social', 'Hard-Working'];
    let skillToAdd = '';
    let newSkills = [];

    
    
    function updateSkillsToAdd(skill) {
        newSkills = [...newSkills, skill];
    }
    
    function addNewSkills() {
        currSkills = [...currSkills, ...newSkills];
        newSkills = [];
        clicked = false;
        document.body.style.overflow = 'visible';
    }

    const handleClick = () => {
        clicked = !clicked;
    };

    const handleOutsideClick = (event) => {
        const col = document.getElementById('popupWindow');
        const inboxOpen = document.getElementById('newSkill');
        
        if (clicked && col && !col.contains(event.target) && !inboxOpen.contains(event.target)) {
            clicked = false;
            document.body.style.overflow = 'visible';
        }
    };
    

    onMount(() => {
        document.addEventListener('click', handleOutsideClick);
    });

    onDestroy(() => {
        document.removeEventListener('click', handleOutsideClick);
    });


</script>


<div id="popupWindow" class:show={clicked}>
    <button id="popupClose" on:click={handleClick}><i class="fa-solid fa-x"></i></button>
    <div class="title">Add new skill</div>
        
        <select required id="textField" bind:value={skillToAdd} on:change={updateSkillsToAdd(skillToAdd)}>
            <option value="" disabled selected hidden></option>
            {#each skills as skill}
                <option value={skill}>{skill}</option>
            {/each}
        </select>
        <div class='newSkills'>
            {#each newSkills as skill}
                <div class="skill">{skill}<button id="deleteSkill"><i class="fa-solid fa-x"></i></button></div>
            {/each}
        </div>
        <button id="confirm" on:click={addNewSkills}>Confirm</button>
</div>
<div id="overlay" class:show={clicked}></div>


<div class="mandFields">
    <button id="newSkill" on:click={handleClick}><i class="fa-solid fa-plus"></i></button>
    {#each currSkills as skill}
        <div class="skill">{skill}<button id="deleteSkill"><i class="fa-solid fa-x"></i></button></div>
    {/each}
</div>


<style>
    .mandFields {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .skill, #newSkill {
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
        width:fit-content;
        padding: 0 0.5rem;
        box-shadow:0 1px 3.5px rgb(185, 50, 238);
        background-color: rgb(240, 227, 240);
    }
    #newSkill {
        border-radius: 50%;
        font-size: 10px;
        height: 1.25rem;
        width: 1.25rem;
        margin: auto 0 auto 0.5rem;
        border: none;
        cursor: pointer;
    }

    #popupWindow {
        display: flex;
        flex-direction: row;
        position: fixed;
        z-index: 200;
        left: 50%;
        height: fit-content;
        padding: 1rem;
        width: fit-content;
        min-width: 50%;
        transform: translateX(-50%);
        box-shadow:0 1px 3.5px rgb(185, 50, 238);
        background-color: rgb(240, 227, 240);
        border-radius: 10px;
        display: none;
    }

    #overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 199;
        opacity: 0.5;
        background-color: rgb(235, 235, 235);
        display: none;
    }

    #textField {
        height: 2rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
        width: 70%;
        border: none;
        border-radius: 10px;
        box-sizing: border-box;
        background-color: white;
        display: flex;
        position: relative;
        resize: none;
        padding: 0.5rem;
        padding-left: 0.5;
        text-align: start;
    }

    #textField:focus{
        outline: none;
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
    }

    #textField:hover {
        animation-duration: 0.5s;
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
    }
    #popupWindow.show, #overlay.show {
        display: block;
    }

    .title {
        font-size: large;
        font-weight: bold;
        text-wrap: nowrap;
    }

    #popupClose {
        margin: 1rem;
        width: fit-content;
        position: absolute;
        top: 0;
        right: 0;
        background: none;
        border: none;
        font-weight: bolder;
    }

    #confirm {
        display: flex;
        margin-top: 1rem;
        margin-right: 1rem;
        margin-left: auto;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        width: fit-content;
        font-weight: bold;
        box-shadow:0 1px 3.5px rgb(185, 50, 238);
        background-color: rgb(240, 227, 240);
        border-radius: 10px;
    }

    .newSkills {
        display: flex;
        flex-direction: row;
        width: 100%;
        flex-wrap: wrap;
        gap: 0.5rem; 
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

    @media (max-width: 600px) {
        #textField {
            width: 100%;
        }
    }
</style>