

<script>
    export let user;
    export let edu;

    export let pfp;

    let resp;
    
</script>
    <span class="stats">
        {#if pfp}
            <span id="pfp" style={`background-image: url(${pfp})`}></span>
        {:else}
            <span id="pfp" ></span>
        {/if}
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
        background-size: cover; /* Ensures the image covers the element */
        background-position: center; /* Centers the image within the element */
        background-repeat: no-repeat;
    }
    @media (max-width:870px) {
    }


</style>