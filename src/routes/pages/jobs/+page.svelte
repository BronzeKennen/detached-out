<script>
    import SideProfile from "../../../components/sideProfile.svelte";
    import Connections from "../../../components/connections.svelte";
    import FeedJob from "../../../components/feedJob.svelte";
    import NewJob from "../../../components/newJob.svelte";

    export let data;

    const user = data.userProfile;

</script>

<div class="feed">
    <div class='LeftCol'>
        <SideProfile {user}/>
    </div>
    <div class='MiddleCol'>
        <h1>Your job adverts</h1>
        <NewJob />
        <!-- #if {user.adverts}  -->
        <div class="separator"></div>
        <h1>Job adverts from other users</h1>
        <FeedJob />
    </div>  
    <div class='RightCol'>
        <Connections />
    </div>
</div>


<style>
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
    }
    
    .MiddleCol {
        flex-direction: column;
        flex: 2;
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

