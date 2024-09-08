<script>
    import { onMount } from "svelte";
    import Message from "../../../../components/message.svelte";
    import ProfileIcon from "../../../../components/profileIcon.svelte";


    export let data;
    const userId = data.loggedId;
    const profile = data.userProfile;

    let inputContent = '';

    function autoResize(event) {
        const textarea = event.target;
        textarea.style.height = 'auto';

        if(textarea.scrollHeight < 40) {
            textarea.style.height = `2rem`;
        } else if(textarea.scrollHeight > 250) {
                textarea.style.height = '250px'
            }
        else {
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }

    $: receivedMsgs = [];
    $: sentMessages = [];
    let ws;
    onMount(() => {
        ws = new WebSocket(`ws://localhost:5173/${userId}`);
    
        ws.onopen = () => {
            console.log("Connected to WebSocket")
        }
    
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            receivedMsgs = [...receivedMsgs,data]
        }
    
        ws.onclose = () => {
            console.log("Connection closed.")
        }
    
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        }
    })

    const sendMessage = () => {
        ws.send(JSON.stringify({message:inputContent}));
        sentMessages = [...sentMessages,inputContent]
        inputContent =''
    }


</script>
    <div class="selectedChat">
        <div class="userInfo">
            <div class="test">
                <ProfileIcon user={profile.username} pfp={profile.profile_pic_url} id={profile.UserId} edu={profile.university}/>
            </div>
        </div>
        <div class="seperator"></div>
        <div class="messages">
            {#each receivedMsgs as msg}
                <Message type="received" message={msg.message}/>
            {/each}
            {#each sentMessages as msg}
                <Message type="sent" message={msg}/>
            {/each}
            <!-- Messages Here -->
        </div>
        <div class="seperator"></div>
        <div class="newMessage">
            <textarea
            id="textField"
            type="text"
            on:input={autoResize} 
            bind:value={inputContent}
            />
            <button id="send" on:click={sendMessage}>
                <i class="fa-solid fa-paper-plane" id="plane"></i>
            </button>
        </div>


    </div>


<style>

    .test {
        width:100%;
        height:100%;
    }
    .selectedChat {
        display: flex;
        flex-direction: column;
        flex: 1;
        background-color: rgb(255, 255, 255);
        height: 92vh;
        border-radius: 10px;
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .userInfo {
        display: flex;
        flex-direction: row;
        padding: 1rem;
        height: 7%;
        align-items: center;
    }

    .seperator {
        border:none;
        border-top:1px solid #ccc;
        margin:1% 0;
        width:95%;
        margin-left: auto;
        margin-right: auto;
    }

    .messages {
        display: flex;
        flex-direction: column-reverse;
        height: 80%;
        padding: 1rem;
        gap: 1rem;
    }

    .newMessage {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        background-color: white;
        padding: 1rem;
        padding-top: 0;
        flex: 1;
    }

    #textField {
        height: 100%;
        width: 100%;
        border: none;
        border-radius: 10px;
        box-sizing: border-box;
        background-color: rgb(240, 240, 240);
        display: flex;
        position: relative;
        resize: none;
        padding: .5rem;
        padding-left: 0.5;
        text-align: start;
    }

    #textField:focus {
        outline: none;
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
    }

    #textField:hover {
        animation-duration: 0.5s;
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
    }

    #plane {
        font-size: larger;
    }

    #send:hover {
        animation-duration: 0.5s;
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
    }

    textarea::-webkit-scrollbar-track {
        border-radius: 10px;
    }

    #send {
        margin-top: auto;
        margin-bottom: auto;
        background: none;
        text-align: center;
        justify-content: center;
        height: 70%;
        aspect-ratio: 1/1;
        font-size: large;
        cursor: pointer;
        border-radius: 50%;
        border: none;
        color: rgba(155, 17, 113, 1.452);
    }
    @media (max-width:900px) {
        .userInfo {
            height: 10%;
        }

        #pfp {
            min-width: 75px;
            min-height: 75px;
        }

        #name {
            font-size: large;
        }

        .messages {
            flex: 2;
        }
        .newMessage {
            max-height: 4rem;
        }
    }
</style>