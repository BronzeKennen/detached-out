
<script>
    export let message;
</script>

<div class="error-border">
    <p>{message}</p>
</div>

<style>

    .error-border {
        top:80%;
        left:42%;
        position:fixed;
        background-color: rgb(238, 108, 108);
        border-radius:20px;
        width:15%;
        height:50px;
        padding:1rem;
        display:flex;
        align-items: center;
        justify-content: center;
    }
</style>