<script>
    import NewJob from "../../../../components/newJob.svelte";
    import LoadJobs from "../../../../components/loadJobs.svelte";
    import ShowApplication from "../../../../components/showApplication.svelte"
    import {current} from '$lib/stores.js'

    let innerWidth = 0;

    let applications = []
    $: {
        if($current) {
            applications = $current.applications;
        }
            
    }

    export let data;
    const profile = data.userProfile

    $: setWidth = (innerWidth / 2) + 29;
    $: {
        if (setWidth > 635) setWidth = 635;
    }
</script>
<svelte:window bind:innerWidth />
<div class="wrapper">
    <div class="LeftCol">
    <div class="create-job">
        <div class="text">
            <h2>Create a job Advert</h2>
            <p>Looking to hire? Create a job advert here</p>
        </div>
        <NewJob />
    </div>
    <h1 align="center">Your job adverts</h1>
        <LoadJobs profile={profile} own={1}/>
    </div>
    <div class='RightCol'>
        {#if applications.length}
        {#each applications as application}
            <div class="fixed-c" style="width:{setWidth}px">
                <ShowApplication applications={application}/>
            </div>
        {/each}
        {/if}
    </div>
</div>
<style>
    h1 {
        margin:1rem;
    }

    .create-job {
        padding:1em;
        margin:2%;
        background-color:rgb(205, 233, 255);
        border-radius:10px;
    }
    .fixed-c {
        position:fixed;
        height:100vh;
        overflow:scroll;
    }
    .wrapper {
        display:flex;
    }
    .LeftCol,.RightCol {
        width:50%;
    }
</style>