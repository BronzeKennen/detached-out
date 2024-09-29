<script>
    import NewJob from "../../../../components/newJob.svelte";
    import LoadJobs from "../../../../components/loadJobs.svelte";
    import ShowApplication from "../../../../components/showApplication.svelte"
    import {current} from '$lib/stores.js'
    import { writable } from "svelte/store";

    let innerWidth = 0;

    let applications = [];
    
    $: {
        if($current) {
            applications = $current.applications;
        }
        
    }

    export let data;
    const profile = data.userProfile

    $: setWidth = (innerWidth / 2);
    $: {
        if (setWidth > 600) setWidth = 600;
    }



    const resetCurrent = () => {
        current.set(null)
    }
</script>
<svelte:window bind:innerWidth />
<div class="wrapper">
    {#if innerWidth < 900}
        {#if $current !== '' && $current !== null}  
            <div class="with-x">
                <button on:click={resetCurrent}>X</button>
                {#if $current}
                    {#each applications as application}
                        <ShowApplication applications={application}/>
                    {/each}
                {/if}
            </div>
        {:else}
            <div class="LeftCol">
                <div class="create-job">
                    <div class="text">
                        <h2>Create a job Advert</h2>
                        <p>Looking to hire? Create a job advert here</p>
                    </div>
                    <NewJob />
                </div>
                <h1 align="center">Your job adverts</h1>
                <LoadJobs profile={profile} own={1} id={profile.UserId}/>
            </div>
        {/if}
    {:else}
    <div class="LeftCol">
        <div class="create-job">
            <div class="text">
                <h2>Create a job Advert</h2>
                <p>Looking to hire? Create a job advert here</p>
            </div>
            <NewJob />
        </div>
        <h1 align="center">Your job adverts</h1>
        <LoadJobs profile={profile} own={1} id={profile.UserId}/>
        </div>
    <div class='RightCol'>
        {#if !$current}
        <div class="fixed-c" id="noapps" style="width:{setWidth}px">
            <h1>Select an advert to view applications.</h1>
        </div>
        {:else if applications.length}
        <div class="fixed-c" style="width:{setWidth}px">
            <h1> Applications </h1>
            {#each applications as application}
                <ShowApplication applications={application}/>
            {/each}
        </div>
        {:else if applications.length === 0}
            <div class="fixed-c" id="noapps" style="width:{setWidth}px">
                <h1>No applicants yet.</h1>
            </div>
        {/if}
    </div>
    {/if}
</div>
<style>
    .with-x {
        min-width:95.5%;
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

    #noapps {
        overflow: hidden;
    }
    h1 {
        margin:1rem;
    }

    .RightCol {
        display: flex;
        margin-right: 5px;
        height: 100vh;
        flex:4;
    }

    .create-job {
        padding:1em;
        margin:2%;
        background-color:rgb(205, 233, 255);
        border-radius:10px;
    }
    .fixed-c {
        background-color: white;
        border-radius: 10px;
        position:fixed;
        height:92vh;
        overflow:scroll;
        overflow-x: hidden;
        flex-direction: column;
        width: 60%;
    }
    .wrapper {
        display:flex;
    }
    .LeftCol,.RightCol {
        width:50%;
    }

    @media (max-width : 900px) {
        .RightCol {
            display: none;
        }

        .LeftCol {
            width: 100%;
        }
    }
</style>