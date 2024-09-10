<script>
    import Message from "../../../components/message.svelte";

    export let data;
    const userId = data.id


    let innerWidth = 0;
    let innerHeight = 0;
    let clicked = false;
</script>

<div class="empty">

<h2>Tap on a chat to start a conversation</h2>
</div>

<style>
    .empty {
        padding:1rem;
        border-radius:10px;
        width:72%;
        background-color: white;
        display:flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(239, 235, 255);
        box-shadow: 1px 1px 10px 5px rgb(224, 219, 219)
    }
    .empty h2 {
        opacity:60%;
        color:blueviolet
    }
</style>

<svelte:window bind:innerWidth bind:innerHeight/>