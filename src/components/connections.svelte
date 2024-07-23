<script>
    import ProfileIcon from "./profileIcon.svelte";
    let users = ['user1','user2','user3']
</script>
<style>
    .connection-profile{
        margin:.5rem;
        flex:1;
        background-color: rgba(192, 161, 161, 0.5);
        display:flex;
        flex-direction: column;
        border-radius: 5px;
    }
    @media (max-width: 820px) {
        .connection-profile {
            display:none;
        }
    }
</style>
<div class="connection-profile">
    {#each users as user}
    <ProfileIcon user={user}/>

    {/each}

</div>