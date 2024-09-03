<script>
    import SideProfile from "../../../components/sideProfile.svelte";
    import Connections from "../../../components/connections.svelte";
    import FeedJob from "../../../components/feedJob.svelte";

    export let data;

    const user = data.userProfile;



</script>

<style>
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

<div class="feed">
    <div class='LeftCol'>
        <SideProfile {user}/>
    </div>
    <div class='MiddleCol'>
        <FeedJob />
    </div>  
    <div class='RightCol'>
        <Connections />
    </div>
</div>
