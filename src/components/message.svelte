
<script>
    import ProfileIcon from "./profileIcon.svelte";

    export let user = '';
    export let message = '';
    export let type = '';

</script>

<style>
    .pfp {
        height: 50px;
        aspect-ratio: 1/1;
        border-radius: 50%;
        border: none;
        background-color: aqua;
        position: relative; 
        margin-bottom: 0.25rem;
        margin-top: auto;
    }
    
    .messageContainerReceived {
        display: flex;
        flex-direction: row;
        min-height: 50px;
        position:relative;
        background-color: rgb(250, 240, 255);
        align-items: center; 
        padding:.2rem;
        border-radius: 10px;
    }

    .messageContainerSent {
        display: flex;
        flex-direction: row-reverse;
        min-height: 50px;
        align-items: center; 
        position: relative;
        background-color: rgb(250, 240, 255);
        padding:.2rem;
        border-radius: 10px;
    }

    .messageContainerReceived p {
        max-width: 50%;
        background-color: rgb(215, 150, 215);
        text-align: left;
        display: flex;
        width: fit-content;
        padding: 0.25rem 1rem 0.25rem 1rem;
        margin-left: 1rem;
        border-radius: 10px;
        font-size: small;
    }
    
    .messageContainerSent p {
        max-width: 50%;
        background-color: rgb(225, 190, 225);
        text-align: left;
        display: flex;
        width: fit-content;
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
    <div class="pfp"></div>
    <p>{message}</p>
    <div class="timestamp">11:40</div>
</div>
{/if}
{#if type === 'received'}
<div class="messageContainerReceived">
    <div class="pfp"></div>
    <p>{message}</p>
    <div class="timestamp">11:40</div>
</div>
{/if}