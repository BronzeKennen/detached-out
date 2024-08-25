
<script>
    export let user;
    export let edu;


    let resp;
    
</script>
    <span class="stats">
        <span id="pfp"></span>
        <div class="substats">
            <h3 class="username">{user}</h3>
            {#if edu}
                <p class="subtitle">{edu.university_name} * {edu.major}</p>
            {/if}
        </div>
    </span>
<style>
    .stats {
        display:flex;
        flex-direction: row;
        align-items: center;
        min-width:100%;
        justify-content: flex-start;
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