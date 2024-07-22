
<script>
    export let user;
    let follow = false;
    const followRequest = (() => {
        console.log('test');
        follow = !follow;
    })

</script>
<div class="profileIcon">
    <span id="pfp"> </span>
    <span class="stats">
        <h3 class="username">{user}</h3>
        <p class="subtitle">National Kapodistrian University of Athens</p>
        <button class:follow-button-clicked={follow} on:click={followRequest} id="follow-button">{#if follow}Following {:else}+ Follow{/if}</button>
    </span>
</div>
<style>
    .profileIcon {
        position:relative;
        border-radius:5px;
        margin:.5rem;
        background-color: aliceblue;
        min-height:100px;
    }
    #pfp {
        margin:.5rem;
        position:absolute;
        width:50px;
        height:50px;
        /* bagkround-image:; */
        background-color:cyan;
        border-radius:50%;
    }
    .stats {
        margin:.5rem;
        position:absolute;
        left:65px;
    }
    .stats p {
        font-size:11px;
    }
    #follow-button {
        margin:.5rem 0;
        min-width: 100%;
        min-height:30px;
        border:2px black solid;
        background:none;
        border-radius:40px;
    }
    #follow-button:hover {
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
        transition-duration: .3s;
    }
    .follow-button-clicked {
        transition-duration: 0.3s;
        background-color:black !important;
        color:white;
    }
    @media (max-width:870px) {
        .stats p {
            font-size:8px;
        }
    }


</style>