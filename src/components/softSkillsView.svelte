
<script>
    import { onMount } from "svelte";
    import { onDestroy } from "svelte";
    import ProfileIcon from "./profileIcon.svelte";
    import Comment from "./comment.svelte";

    let clicked = false;

    export let skills;


</script>


<div id="overlay" class:show={clicked}></div>
<div class="mandFields">
    {#each skills as skill}
    <div class="skill">{skill.name.SkillName} </div>
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