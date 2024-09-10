<script>
    import { onMount } from "svelte";
    import DetailedFeedJob from "../../../components/detailedFeedJob.svelte";
import FeedJob from "../../../components/feedJob.svelte";
    import NewJob from "../../../components/newJob.svelte";

    export let data;

    $: width;

    const user = data.userProfile;
    const jobs = user.jobs
    $: current = ''

    function printJob(job) {
        current = job
    }

    $: {
        width = window.innerWidth;

    }
</script>

<div class="feed">
    <!-- <div class='LeftCol'> -->
        <!-- <SideProfile {user}/> -->
    <!-- </div> -->
    <div class='MiddleCol'>
        <div class="create-job">
            <div class="text">
                <h2>Create a job Advert</h2>
                <p>Looking to hire? Create a job advert here</p>
            </div>
            <NewJob />
        </div>
        <!-- #if {user.adverts}  -->
        <div class="separator"></div>
        <div class="feed-job">
        {#each jobs as job}
            <div class="clicker" on:click={() => printJob(job)}>
                <FeedJob {job}  />
            </div>
        {/each}
        </div>
    </div>  
    <div class='RightCol'>
        {#if current !== ''}
            <DetailedFeedJob job={current}/>
        {/if}
    </div>
</div>


<style> 
    .create-job {
        padding:.5em;
        margin:.6em;
        background-color:rgb(205, 233, 255);
        border-radius:10px;
    }
    .text {
        margin:1rem .55rem;
    }
    .separator {
        border: none;
        border-top: 1px solid #ccc;
        margin: 3% auto;
        min-width: 95%;
        width: 95%;
    }

    h1 {
        margin-left: 0.5rem;
        margin-bottom: 1.5rem;
    }

    .feed {
        display:flex;
        flex-direction: row;
    }

    
    
    .LeftCol {
        display: flex;
        flex-direction: row;
        width: 300px;
        height: 50vh;
        margin-right: 1rem;
    }

    .RightCol {
        display: flex;
        flex-direction: row;
        width: 260px;
        margin-right: 5px;
        height: 50vh;
        flex:4;
    }
    
    .MiddleCol {
        flex-direction: column;
        flex: 3.5;
    }

    @media (max-width : 950px) {
        .RightCol {
            width: 210px;
        }
    }


    @media (max-width: 600px) {
        .feed {
            display:flex;
            flex-direction: column;
        }

        .LeftCol {
            width: 100%;
            height: fit-content;
            flex-direction: column;
        }
    }
</style>

