<script>
    import ProfileIcon from "./profileIcon.svelte";
    let postBody =''
    function handleLikes() {
        if (liked) {
            likes -= 1;
        } else {
            likes +=1;
        }
        liked = !liked;
        
    }
    function handleReposts() {
        if(reposted) {
            reposts -= 1;
        } else {
            reposts += 1;
        }
        reposted = !reposted;
    }

    function toggleCommenter() {
        commenter = !commenter
        autoResize();
    }
    const submitComment = (() => {
        commenter = !commenter;
        comments += 1;
        comment = '';
    })

    function autoResize(event) {
        const textarea = event.target;
        textarea.style.height = 'auto';

        if(textarea.scrollHeight < 70) {// wtf is this 
            textarea.style.height = `${textarea.scrollHeight - 10}px`;
        } else {
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }

    let imageUrl;
    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imageUrl = e.target.result;
            };
            reader.readAsDataURL(file);
            console.log(reader)
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
        <span class="buttons">
            <input type="file" id="uploadButton" on:change={handleFileUpload}> 
            <label for="uploadButton" id="uploadLabel">Upload Files</label>
            <button id="postButton" class="under-text-button">Post</button>
        </span>
    </div>


<style>
    .buttons {
        display:flex;
        flex-direction: row;
        width:100%;
        justify-content: flex-end;

    }
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

    .under-text-button {
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 8px;
        height: 1.5rem;
        box-sizing: border-box;
        position: relative;
        width:15%;
        margin:0 .2rem;

    }
    #uploadButton {
        display:none;
    }

    #uploadLabel {
        display:flex;
        justify-content: center;
        align-items: center;
        color:white;
        font-size:13px;
        font-weight: bold;
        border-radius: 8px;
        height: 1.5rem;
        box-sizing: border-box;
        position: relative;
        width:15%;
        margin:0 .2rem;
        background-color:blue;
    }
    #postButton {
        background-color: #4CAF50;
    }

    #postButton:hover {
        cursor: pointer;
        background-color: #45A049; 
        box-shadow: 0px 0px 5px rgba(76, 175, 80, 0.8); 
    }
    #uploadLabel:hover {
        cursor: pointer;
        background-color: rgb(0, 0, 173); 
        box-shadow: 0px 0px 5px rgba(76, 144, 175, 0.8); 
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