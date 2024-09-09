
<script>
    import { onDestroy, onMount } from "svelte";
    import ProfileIcon from "./profileIcon.svelte";

    export let message = '';
    export let type = '';
    export let pfp =''
    export let created = ''
    let timePassed = '';

     function calculateTimePassed(timestamp) {
        const now = new Date();
        const diff = now - timestamp; // Difference in milliseconds

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days}d`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else if (minutes > 0) {
            return `${minutes}m`;
        } else {
            return `${seconds}s`;
        }
    }
    let intervalId;

    onMount(() => {
        let createdAt;
        if(!created) {
            console.log('1')
            timePassed = 'now'
            createdAt = new Date();
            intervalId = setInterval(() => {
                timePassed = calculateTimePassed(createdAt);
            }, 1000);
        } else if(created.includes("T")) {
            console.log('2')
            console.log(created)
            createdAt = new Date(created);
            intervalId = setInterval(() => {
                timePassed = calculateTimePassed(createdAt);
            }, 1000);
            
        } else {
            console.log('gangsta brizzim')
            createdAt = new Date(created.replace(' ', 'T') + 'Z');
            timePassed = calculateTimePassed(createdAt);
        }
    })

    onDestroy(() => {
        clearInterval(intervalId)
    })

</script>

<style>
    .pfp {
        margin:.5rem;
        min-width:50px;
        min-height:50px;
        background-color:cyan;
        border-radius:50%;
        background-size: cover; /* Ensures the image covers the element */
        background-position: center; /* Centers the image within the element */
        background-repeat: no-repeat;
    }
    
    .messageContainerReceived {
        display: flex;
        flex-direction: row;
        position:relative;
        background-color: rgb(255, 255, 255);
        align-items: center; 
        padding:.2rem;
        border-radius: 10px;
    }

    .messageContainerSent {
        display: flex;
        height:auto;
        align-items: center; 
        position: relative;
        background-color: rgb(255, 255, 255);
        padding:.2rem;
        border-radius: 10px;
        flex-direction: row-reverse;
    }

    .messageContainerReceived p {
        word-wrap: break-word;
        white-space: pre-wrap;
        max-width: 50%;
        text-align: left;
        padding: 0.25rem 1rem 0.25rem 1rem;
        margin-right: 1rem;
        border-radius: 10px;
        font-size: small;
        background-color: rgb(215, 150, 215);
    }
    
    .messageContainerSent p {
        background-color: rgb(225, 190, 225);
        word-wrap: break-word;
        white-space: pre-wrap;
        max-width: 50%;
        text-align: left;
        padding: 0.25rem 1rem 0.25rem 1rem;
        margin-right: 1rem;
        border-radius: 10px;
        font-size: small;
    }

    .timestamp {
        background: none;
        font-size: x-small;
        margin: auto 0.5rem;
    }

</style>

{#if type === 'sent'}
<div class="messageContainerSent">
        {#if pfp}
            <span class="pfp" style={`background-image: url(${pfp})`}></span>
        {:else}
            <span class="pfp" ></span>
        {/if}
    <p>{message}</p>
    <div class="timestamp">{timePassed}</div>
</div>
{/if}
{#if type === 'received'}
<div class="messageContainerReceived">
        {#if pfp}
            <span class="pfp" style={`background-image: url(${pfp})`}></span>
        {:else}
            <span class="pfp" ></span>
        {/if}
    <p>{message}</p>
    <div class="timestamp">{timePassed}</div>
</div>
{/if}