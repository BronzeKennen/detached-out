<script>
    import { onMount, onDestroy } from 'svelte';

    let clicked = false;
    export let users;

    const handleClick = () => {
        clicked = !clicked;
    };

    const handleOutsideClick = (event) => {
        const col = document.getElementById('col');
        const inboxOpen = document.getElementById('inboxOpen');
        
        if (clicked && col && !col.contains(event.target) && !inboxOpen.contains(event.target)) {
            clicked = false;
        }
    };
    
    onMount(() => {
        if( typeof window !== 'undefined') document.addEventListener('click', handleOutsideClick);
    });

    onDestroy(() => {
        if(typeof window !== 'undefined') document.removeEventListener('click', handleOutsideClick);
    });
</script>

<style>
    #inboxOpenContainer {
        padding-top: 1rem;
        padding-bottom: 1rem;
        display: flex;
        position: absolute;
        align-items: center;
        height: 10%;
        width: 4rem;
    }

    #inboxOpen {
        height: 2rem;
        width: 100%;
        margin-top: auto;
        margin-bottom: auto;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        background-color: rgb(250, 240, 255);
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
        border: none;
    }

    #inboxClose {
        height: 2rem;
        width: 2rem;
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 0.5rem;
        margin-left: auto;
        background: none;
        border: none;
    }

    #col {
        position: fixed;
        left: -100%;
        height: 100%;
        z-index: 900;
        width: fit-content;
        min-width: 60%;
        background-color: rgb(250, 240, 255);
        display: flex;
        flex-direction: column;
        padding-left: 10px;
        padding-right: 1rem;
        padding-top: 1rem;
        gap: .25rem;
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
        border-radius: 10px;
        transition: left 0.5s ease;
    }

    #col.show {
        left: -10px;
    }

    .header {
        display: flex;
        font-weight: bolder;
        font-size: xx-large;
        background: none;
        color: black;
        margin-left: 5%;
        padding-bottom: 0.5rem;
        padding-top: 0.5rem;
        align-items: flex-end;
    }

    .userContainer {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: .5rem;
        min-height: 50px;
        position: relative;
        background-color: rgb(250, 240, 255);
    }

    .userContainer #name {
        padding-left: 1rem;
        font-size: large;
    }

    .userContainer:hover {
        animation-duration: 0.2s;
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
        border-radius: 10px;
    }

    #pfp {
        margin-top: -.1rem;
        margin-right: .5rem;
        min-width: 50px;
        min-height: 50px;
        background-color: cyan;
        border-radius: 50%;
        background-size: cover; /* Ensures the image covers the element */
        background-position: center; /* Centers the image within the element */
        background-repeat: no-repeat;
    }
    a {
        text-decoration: none;
        color:inherit;
    }

    .seperator {
        border: none;
        border-top: 1px solid #ccc;
        margin: 1% 0;
        width: 95%;
        margin-left: auto;
        margin-right: auto;
    }
</style>

<div id="inboxOpenContainer">
    <button id="inboxOpen" on:click={handleClick}><i class="fa-solid fa-users"></i></button>
</div>
<span id="col" class:show={clicked}>
    <div class="header">
        Inbox 
        <button id="inboxClose" on:click={handleClick}><i class="fa-solid fa-x"></i></button>
    </div>
    <div class="seperator"></div>
    {#each users as user}
    <a href="/pages/chats/{user.UserId}">
        <div class="userContainer">
            <div id="pfp" style={`background-image: url(${user.profile_pic_url})`}></div>
            <div id="name">{user.username}</div>
        </div>
        <div class="seperator"></div>
    </a>
    {/each}
</span>
