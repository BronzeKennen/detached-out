
<script>
    export let user;

</script>
    <span class="stats">
        <span id="pfp"></span>
        <div class="substats">
            <h3 class="username">{user}</h3>
            <p class="subtitle">National Kapodistrian University of Athens</p>
        </div>
    </span>
<style>
    .stats {
        display:flex;
        flex-direction: row;
        align-items: center;
    }
    .substats {
        display:flex;
        flex-direction: column;
    }
    .subtitle {
        font-size:85%;
    }
    #pfp {
        margin:.5rem;
        min-width:50px;
        min-height:50px;
        background-color:cyan;
        border-radius:50%;
    }
    @media (max-width:870px) {
    }


</style>