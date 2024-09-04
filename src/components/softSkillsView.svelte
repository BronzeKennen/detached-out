
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

    let newSkills = [];

    function addSkill(skill) {
        newSkills = [...newSkills, skill];
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


<div id="overlay" class:show={clicked}></div>
<div class="mandFields">
    <button id="newSkill" on:click={handleClick}><i class="fa-solid fa-plus"></i></button>
    <div class="skill">Talkative <button id="deleteSkill"><i class="fa-solid fa-x"></i></button></div>
    <div class="skill">Social <button id="deleteSkill"><i class="fa-solid fa-x"></i></button></div>
    <div class="skill">Hard-Working <button id="deleteSkill"><i class="fa-solid fa-x"></i></button></div>
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
    }
</style>