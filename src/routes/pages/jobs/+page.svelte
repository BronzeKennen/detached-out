<script>
    import { onMount } from "svelte";
    import DetailedFeedJob from "../../../components/detailedFeedJob.svelte";
    import FeedJob from "../../../components/feedJob.svelte";
    import NewJob from "../../../components/newJob.svelte";

    export let data;

    $: innerWidth = 0;

    $: setWidth = (innerWidth/2) + 29
    $: {
        if(setWidth > 635) setWidth = 635
    }

    const user = data.userProfile;
    const jobs = user.jobs
    $: current = jobs[0]

    function printJob(job) {
        current = job
    }
</script>
<svelte:window bind:innerWidth />

<div class="feed">
    {#if innerWidth < 600}
        {#if current !== ''}
            <div class="with-x">
                <button on:click={() => {current = '' }}>X</button>
                <DetailedFeedJob job={current}/>
            </div>
        {:else}
            <div class="feed-job">
                <div class="create-job">
                    <div class="text">
                        <h2>Manage Job Applications</h2>
                        <p>Go to Job Advert Dashboard</p>
                        <a href="/pages/jobs/dashboard">
                            <button class="under-text-button">Dashboard.</button>
                        </a> 
                    </div>
            </div>
            {#each jobs as job}
                    <FeedJob {job}  />
            {/each}
            </div>
        {/if}
    {:else}
    <div class='MiddleCol'>
        <div class="create-job">
            <div class="text">
                <h2>Manage Job Applications</h2>
                <p>Go to Job Advert Dashboard</p>
            </div>
            <a href="/pages/jobs/dashboard">
                <button class="under-text-button">Dashboard.</button>
            </a> 
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
            <div class="fixed-c" style="width:{setWidth}px">
                <DetailedFeedJob job={current}/>
            </div>
        {/if}
    </div>
    {/if}
</div>


<style> 
    .fixed-c {
        position:fixed;
        height:100vh;
        overflow:scroll;
    }
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
        margin-right: 5px;
        height: 100vh;
        flex:4;
    }
    
    .MiddleCol {
        flex-direction: column;
        flex: 3.5;
    }

    @media (max-width : 950px) {
    }


.fixed-c::-webkit-scrollbar {
    width: 6px; /* Width of the scrollbar */
}

.fixed-c::-webkit-scrollbar-track {
    display:none;
}

/* Handle (the part of the scrollbar you drag) */
.fixed-c::-webkit-scrollbar-thumb {
    background: #888; /* Handle color */
    border-radius: 10px; /* Rounded corners */
}

.fixed-c::-webkit-scrollbar-thumb:hover {
    background: #555; 
}
    .under-text-button {
        min-width:100px;
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 8px;
        height: 1.5rem;
        box-sizing: border-box;
        position: relative;
        width:15%;
        margin:0 .2rem;
        box-shadow:0 2px 5px rgb(185, 50, 238);
        background-color: #9145a0; 

    }

</style>

