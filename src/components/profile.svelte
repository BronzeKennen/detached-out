<script>
    export let name;
    let count = 0;
    function increment() {
        count += 1
    }
</script>
<style>
</style>
<button on:click={increment}>{name.toUpperCase()} YIPPIE {count}</button>