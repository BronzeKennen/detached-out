<script>
    import ProfileIcon from "./profileIcon.svelte";
    let postBody =''

    function autoResize(event) {
        const textarea = event.target;
        textarea.style.height = 'auto';

        if(textarea.scrollHeight < 70) {// wtf is this 
            textarea.style.height = `${textarea.scrollHeight - 10}px`;
        } else {
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }

</script>

    <div class="new-post">
        <div class="pfpText">
            <div id="pfp"></div>
            <textarea
                id="postBody"
                        type="text" 
                        placeholder="Write something..."
                        bind:value={postBody}
                        on:input={autoResize} 
            />
        </div>
        <button id="postButton">Post</button>
    </div>


<style>
    .new-post {
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        background-color:white;
        align-items: center;
        flex: 2;
        border-radius:10px;
        padding:1rem;
        margin:.5rem;
    }

    .pfpText {
        min-height: 50px;
        height: auto;
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }

    #postBody {
        min-height: 50px;
        height: 100%;
        border: none;
        border-radius: 10px;
        box-sizing: border-box;
        background-color: rgb(250, 240, 255);
        width: 90%;
        display: flex;
        position: relative;
        resize: none;
        padding: .5rem;
        padding-left: 0.5;
        margin-left: 0.5rem;
    }

    #postBody:focus {
        outline: none;
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
    }

    #postBody:hover {
        animation-duration: 0.5s;
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
    }

    #postButton {
        background-color: #4CAF50;
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 8px;
        width: 15%;
        height: 1.5rem;
        margin-left: 85%;
        box-sizing: border-box;
        position: relative;
    }

    #postButton:hover {
        cursor: pointer;
        background-color: #45A049; 
        box-shadow: 0px 0px 5px rgba(76, 175, 80, 0.8); 
    }

    #pfp {
        width:50px;
        height:50px;
        min-width: 50px;
        min-height: 50px;
        background-color:cyan;
        border-radius:50%;
        }

    @media(max-width: 500px) {
        #postButton {
            margin-left: 0;
            width: 20%;
        }
    }
</style>