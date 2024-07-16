<script>
    export let name;
    let count = 0;
    function increment() {
        count += 1
    }
</script>
<style>
    button {
        color:black;
        background-color: aquamarine;
    }
</style>
<button on:click={increment}>{name.toUpperCase()} YIPPIE {count}</button>