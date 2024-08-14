<script>
    import ProfileIcon from "./profileIcon.svelte";
    let someone = 'Kyrios Xoirinos';
    let notiftype = 'friend_request';
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
        display: flex;
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 1rem;
        aspect-ratio: 1;
        background-color:cyan;
        width: 10%;
        border-radius: 50%;
    }

    .notifIcon {
        color: black;
        width: 35%;
        height: 35%;
        margin-top: 65%;
        margin-left: 60%;
    }

    .notifBlock .rest {
        display: flex;
        flex-direction: column;
        width: 90%;
    }

    .notifBlock .message {
        background-color: white;
        color: black;
        padding: 1%;
    }

    .notifBlock .requestResponce {
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 1%;
        height: 1.5rem;
    }

    .requestResponce button {
        width: 25%;
        background-color: rgb(155, 134, 175);
        margin-left: 1%;
        margin-right: 1%;
        border-radius: 5px;
        color: white;
    }

    #accept {
        background-color: rgb(0, 200, 0);
        border-color: rgb(0,200,0);
    }
    
    #decline {
        background-color: gray;
        border-color: gray;
    }

    a {
        font-weight: bolder;
        color: black;
    }

    a:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    @media (max-width: 600px) {
        .notifBlock .pfp {
            width: 15%;
        }
        
        .notifBlock .rest {
            width: 85%;
        }

        .requestResponce button {
            width: 30%;
        }
    }
</style>

<div class="notifBlock"> 
    <div class="pfp"><span class="notifIcon"><i class="fa-solid fa-user"></i></span></div>
    <div class="rest">
        <div class="message"><a href='/pages/home'>{someone}</a> wants to connect with you.</div>
        {#if notiftype === 'friend_request'}
        <div class="requestResponce">
            <button id="accept">Accept</button>
            <button id="decline">Decline</button>
        </div>
        {/if}
    </div>
</div>
<div class="notifBlock"> 
    <div class="pfp"><span class="notifIcon"><i class="fa-solid fa-comments"></i></span></div>
    <div class="rest">
        <div class="message"><a href='/pages/home'>{someone}</a> has commented on your <a href='/pages/home'>post</a>.</div>
    </div>
    
</div>
