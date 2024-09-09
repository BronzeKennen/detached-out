<script>
    import Message from "../../../components/message.svelte";

    export let data;
    const userId = data.id


    let innerWidth = 0;
    let innerHeight = 0;
    let clicked = false;
</script>

<h2>Tap on a chat to start a conversation</h2>

<svelte:window bind:innerWidth bind:innerHeight/>