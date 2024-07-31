<script>
    import ProfileIcon from "./profileIcon.svelte";
    let someone = 'Kyrios Xoirinos';
</script>

<style>
    .notifBlock {
        align-self: flex-start;
        display: flex;
        flex-direction: row;
        background-color:white;
        align-items: center;
        flex: 2;
        border-radius:10px;
        padding:1rem;
        margin:.5rem;
    }

    .notifBlock .pfp {
        margin-top: auto;
        margin-right: 2.5%;
        aspect-ratio: 1;
        background-color:cyan;
        width: 10%;
        border-radius:50%;
    }

    .notifBlock .message {
        flex: 1; 
        background-color: white;
        color: black;
    }

    .userName {
        font-weight: bolder;
    }

    .userName:hover {
        text-decoration: underline;
        cursor: pointer;
    }
</style>

<div class="notifBlock"> 
    <div class="pfp"></div>
    <div class="message">You have received a new friend request from <span class="userName">{someone}</span>.</div>
</div>
<div class="notifBlock"> 
    <div class="pfp"></div>
    <div class="message"><span class="userName">{someone}</span> has commented on your post.</div>
</div>
