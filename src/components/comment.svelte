
<script>
    export let user = '';
    export let comment = ''

</script>

<div class="comment">
    <div class="profileIcon">
        <span id="pfp"> </span>
        <span class="stats">
            <h3 class="username">{user}</h3>
        </span>
    </div>
    <p>{comment}</p>
</div>
<style>
    .comment {
        min-height:25px;
        position:relative;
        background-color: rgb(250, 240, 255);
        padding:1rem;
        margin:1rem 0;
        border-radius: 10px;
    }
    .comment p {
        margin:.9rem 1.5rem 0 2.7rem;
    }
    .username {
        margin:.2rem 0;
    }
    .profileIcon {
        position:absolute;
        border-radius:5px;
        margin:.5rem;
        background-color: aliceblue;
        min-height:100px;
    }
    #pfp {
        top:-15px;
        left:-15px;
        position:absolute;
        width:40px;
        height:40px;
        background-color:cyan;
        border-radius:50%;
    }
    .stats {
        position:absolute;
        left:35px;
        top:-20px;
    }
</style>