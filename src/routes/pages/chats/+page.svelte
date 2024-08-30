<script>
    import PeopleCol from "../../../components/peopleCol.svelte";
    import Message from "../../../components/message.svelte";
    import PeopleColToggle from "../../../components/peopleColToggle.svelte";

    let users = ['Aris B.', 'JJ', 'Ham']; /* fetch people that have messaged */

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

    let innerWidth = 0;
    let innerHeight = 0;
    let clicked = false;
    $: condition = 0;

    $: {
        if(innerWidth < 900) {
            condition = 0;
        } else {
            condition = 1;
        }
    }
</script>

<svelte:window bind:innerWidth bind:innerHeight/>

<div class="feed">
    {#if condition === 1}
        <PeopleCol {users}/>
    {/if}
    {#if condition === 0}
        <PeopleColToggle {users}/>
    {/if}
    <div class="selectedChat">
        <div class="userInfo">
            <div id="pfp"></div>
            <div id="nameJob">
                <div id="name">Kyrios Xoirinos</div>
                <div id="job">Chief Kreopwlhs</div>
            </div>
        </div>
        <div class="seperator"></div>
        <div class="messages">
            <Message type = 'received' message ='Nice'/>
            <Message type = 'sent' message ='All gud'/>
            <Message type = 'received' message ='THIS IS A LONG MESSAGE SO I CAN SEE WHAT WILL HAPPEN. NEED TO GO LONGER.'/>
            <Message type = 'received' message ='Hey!'/>
        </div>
        <div class="seperator"></div>
        <div class="newMessage">
            <textarea
            id="textField"
            type="text"
            on:input={autoResize} 
            />
            <button id="send">
                <i class="fa-solid fa-paper-plane" id="plane"></i>
            </button>
        </div>


    </div>
</div>
    
    <style>
        .feed {
            display:flex;
            flex-direction: row;
            gap: 1rem;
        }
    
        .selectedChat {
            display: flex;
            flex-direction: column;
            flex: 1;
            background-color: rgb(250, 240, 255);
            height: 92vh;
            border-radius: 10px;
            padding-left: 1rem;
            padding-right: 1rem;
        }
    
        .userInfo {
            display: flex;
            flex-direction: row;
            padding: 1rem;
            height: 15%;
            align-items: center;
        }
    
        #pfp {
            margin-top:.5rem;
            margin-right: .5rem;
            min-width:100px;
            min-height:100px;
            background-color:cyan;
            border-radius:50%;
            margin-left: 15%;
        }
    
        #nameJob {
            padding-left: 2rem;
            display: flex;
            flex-direction: column;
        }
        
        #name {
            font-size: x-large;
            font-weight: bold;
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
            height: 55vh;
            padding: 1rem;
            gap: 1rem;
        }
    
        .newMessage {
            display: flex;
            flex-direction: row;
            gap: 1rem;
            background-color: rgb(250, 240, 255);
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
            background-color: white;
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
