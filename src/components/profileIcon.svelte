
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
            <h3 class="username"><a href="/pages/profile/{id}">{user}</a></h3>
            {#if edu}
                <p class="subtitle">{edu.university_name} • {edu.major}</p>
            {/if}
        </div>
    </span>
<style>
    a {
        text-decoration: none;

    }
    a:visited {
        color: inherit;
    }
    
    .stats {
        display:flex;
        flex-direction: row;
        align-items: center;
        width: 275px;
        justify-content: flex-start;
    }
    .substats {
        display:flex;
        flex-direction: column;
        flex-grow: 1;
    }
    .subtitle {
        max-width: 200px;
        font-size: small;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    #pfp {
        margin:.5rem;
        min-width:50px;
        min-height:50px;
        width: 50px;
        height: 50px;
        background-color:cyan;
        border-radius:50%;
        background-size: cover; /* Ensures the image covers the element */
        background-position: center; /* Centers the image within the element */
        background-repeat: no-repeat;
    }
    @media (max-width:950px) {
        .stats {
            width: 200px;
        }

        .subtitle {
            font-size: x-small;
            max-width: 125px;
        }
    }


</style>