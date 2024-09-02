
<script>
    import { onDestroy } from "svelte";
    import ProfileIcon from "./profileIcon.svelte";
</script>

<div class="mandFields">
    <div class="skill">Talkative</div>
    <div class="skill">Hard-Working</div>
    <div class="skill">Social</div>
    <div class="skill">Driven</div>
</div>


<style>
    .mandFields {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .skill {
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

    @media (max-width: 600px) {
        .mandFields {
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 1rem;
        }
    }
</style>