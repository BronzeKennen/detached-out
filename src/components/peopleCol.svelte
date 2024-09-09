<script>
    export let users;
</script>

<style>
    #col {
        width: 25%;
        height: 92vh;
        background-color: rgb(255, 255, 255);
        display: flex;
        flex-direction: column;
        gap: .25rem;
        border-radius: 10px;
        box-shadow: -2px 2px 5px 2px rgb(204, 153, 204);
    }

    .header {
        display: flex;
        font-weight: bolder;
        font-size: xx-large;
        background: none;
        color: black;
        height: 15%;
        margin-left: 5%;
        padding-bottom: 1rem;
        padding-top: 1rem;
        align-items: flex-end;
    }

    .userContainer {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: .5rem;
        margin:.2rem;
        min-height:50px;
        position:relative;
        background-color: rgb(255, 255, 255);

    }

    .userContainer #name {
        padding-left: 1rem;
        font-size: large;
    }
    .userContainer:hover {
        animation-duration: 0.2s;
        background-color: rgb(240, 240, 240);
        border-radius: 10px;

    }

    #pfp {
        margin-top:-.1rem;
        margin-right: .5rem;
        min-width:50px;
        min-height:50px;
        background-color:cyan;
        border-radius:50%;
        background-size: cover; /* Ensures the image covers the element */
        background-position: center; /* Centers the image within the element */
        background-repeat: no-repeat;
    }

    .seperator {
        border:none;
        border-top:1px solid #ccc;
        margin:1% 0;
        width:95%;
        margin-left: auto;
        margin-right: auto;
    }
    a {
        text-decoration: none;
        color:inherit
    }


</style>

<div id="col">
    <div class="header">Inbox</div>
    <div class="seperator"></div>
    {#each users as user}
    <a href="/pages/chats/{user.UserId}">
        <div class="userContainer">
                {#if user.profile_pic_url}
                    <span id="pfp" style={`background-image: url(${user.profile_pic_url})`}></span>
                {:else}
                    <span id="pfp" ></span>
                {/if}
            <div id="name">{user.username}</div>
        </div>
        <div class="seperator"></div>
    </a>
    {/each}
    </div>