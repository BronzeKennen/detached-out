
<script>
    import ProfileIcon from "./profileIcon.svelte";

    export let user = '';
    export let comment = ''

</script>

<div class="comment">
    <ProfileIcon user={user}/>
    <p>{comment}</p>
</div>
<style>
    .comment {
        min-height:25px;
        position:relative;
        background-color: rgb(250, 240, 255);
        padding:.2rem;
        margin:1rem 0;
        border-radius: 10px;
    }
    .comment p {
        margin:-.3rem 4.1rem;
        padding:0 0 1rem 0;
    }
    .comment:hover {
        animation-duration: 0.2s;
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);

    }
</style>