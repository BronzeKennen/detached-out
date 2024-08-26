
<script>

    export let employer;
    export let JobTitle;
    export let from;
    export let to;
</script>
    <div class="job-title-date">
        <h2>{employer}</h2> 
        <p>{from} - {#if to} {to} {:else} Present {/if}</p>
    </div>
    <h4>{JobTitle}</h4>

<div class="separator"></div>
<style>
    .job-title-date {
        width:100%;
        display:flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: .5rem;
    }
    .job-title-date p {
        font-size:12px;
        opacity:60%;
    }
    .separator {
        border:none;
        border-top:1px solid #ccc;
        margin:3% 0;
        min-width:100%;
    }
</style>