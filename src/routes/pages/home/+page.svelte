<script>
    import FeedPost from "../../../components/feedPost.svelte";
    import SideProfile from "../../../components/sideProfile.svelte";
    import Connections from "../../../components/connections.svelte";
    import { onMount } from "svelte";
    let users = [];
    let newuser = '';

    onMount(async () => {
        const resp = await fetch('/api/users');
        const data = await resp.json();
        users = data.body;
    })

</script>

<style>
    .feed {
        display:flex;
        flex-direction: row;
    }
    /* will be removed */
    @media (max-width : 1000px) {
    }

    @media (max-width: 600px) {
        .feed {
            display:flex;
            flex-direction: column;
        }
    }
</style>
<div class="feed">
    <SideProfile />
    <FeedPost />
    <Connections />
</div>
    {#if users}
    USERS
    {#each users as user}
        <p> {user.fname} {user.lname}</p>
    {/each}
    {/if}