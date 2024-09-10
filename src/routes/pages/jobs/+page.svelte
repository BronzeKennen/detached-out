<script>
    import FeedJob from "../../../components/feedJob.svelte";
    import NewJob from "../../../components/newJob.svelte";

    export let data;

    const user = data.userProfile;
    const jobs = user.jobs

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
        {#each jobs as job}
            <FeedJob {job}/>
        {/each}
    </div>  
    <div class='RightCol'>
        <p>Extension</p>
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
        border:1px red solid;
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

    @media (max-width : 850px) {
        .LeftCol {
            width: 250px;
        }
        .RightCol {
            display: none;
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

