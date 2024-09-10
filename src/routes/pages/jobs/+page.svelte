<script>
    import { onMount } from "svelte";
    import DetailedFeedJob from "../../../components/detailedFeedJob.svelte";
import FeedJob from "../../../components/feedJob.svelte";
    import NewJob from "../../../components/newJob.svelte";

    export let data;

    $: innerWidth = 0;

    const user = data.userProfile;
    const jobs = user.jobs
    $: current = jobs[0]

    function printJob(job) {
        current = job
    }
</script>
<svelte:window bind:innerWidth />

<div class="feed">
    <!-- <div class='LeftCol'> -->
        <!-- <SideProfile {user}/> -->
    <!-- </div> -->
    {#if innerWidth < 600}
        {#if current !== ''}
            <div class="with-x">
                <button on:click={() => {current = '' }}>X</button>
                <DetailedFeedJob job={current}/>
            </div>
        {:else}
            <div class="feed-job">
            {#each jobs as job}
                <div class="clicker" on:click={() => printJob(job)}>
                    <FeedJob {job}  />
                </div>
            {/each}
            </div>
        {/if}
    {:else}
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
    {/if}
</div>


<style> 
    .feed-job {
        min-width:100%;
    }
    .with-x {
        max-width:95.5%;
        position:relative;
    }
    .with-x button {
        position:absolute;
        top:1%;
        right:-.5%;
        border-radius:20px;
        border:none;
        background-color: rgb(201, 201, 201);
        width:30px;
        height:30px;

    }
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

    .feed {
        display:flex;
        flex-direction: row;
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
    }


</style>

