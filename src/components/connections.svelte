<script>
    import ProfileIcon from "./profileIcon.svelte";
    let users = ['user1','user2','user3']
    let follow = false;
    const followRequest = (() => {
        console.log('test');
        follow = !follow;
    })
</script>
<style>
    .connection-profile{
        align-self: flex-start;
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
    #follow-button {
        min-width: 90%;
        width:90%;
        min-height:30px;
        border:2px black solid;
        background:none;
        border-radius:40px;
        margin:.3rem 0 .7rem 0;
    }
    #follow-button:hover {
        background-color: rgba(0, 0, 0, 0.171);
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
        transition-duration: .3s;
    }
    .follow-button-clicked {
        transition-duration: 0.3s;
        background-color:black !important;
        color:white;
    }
    .profileIcon {
        position:relative;
        align-items: center;
        display:flex;
        flex-direction: column;
        border-radius:5px;
        margin:.5rem;
        background-color: aliceblue;
        min-height:100px;
    }
</style>
<div class="connection-profile">
    {#each users as user}
        <div class="profileIcon">
        <ProfileIcon user={user}/>
        <button class:follow-button-clicked={follow} on:click={followRequest} id="follow-button">{#if follow}Following {:else}+ Follow{/if}</button>
        </div>

    {/each}

</div>