<script>
    import ProfileIcon from "./profileIcon.svelte";
    $: postBody =''
    export let pfp;
    let postButton;

    export let id;

    $: {
        if(postButton) {
            if(postBody === '') {
                postButton.disabled = true;
            } else {
                postButton.disabled = false;
    
            }
        }
    }

    function removeImage(index) {
        images = images.filter((_, i) => i !== index);
    }

    function autoResize(event) {
        const textarea = event.target;
        textarea.style.height = 'auto';

        if(textarea.scrollHeight < 70) {// wtf is this 
            textarea.style.height = `${textarea.scrollHeight - 10}px`;
        } else {
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }

    let images
    async function handleFileUpload(event) {
        const postButton = document.getElementById('postButton');
        postButton.disabled = true;
        const files = event.target.files;
        const formData = new FormData();
        for(const file of files) {
            formData.append('files',file);
        }

        const response = await fetch('/api/posts/upload', {
            method: 'POST',
            body: formData
        });
        images = await response.json();
        if(response.ok) {
            console.log('images uploaded succesfully')
        } else {
            console.log('error uploading image')
        }
        postButton.disabled = false;
        images = images.uploadedFiles;
    }

    async function createPost() {
        const resp = await fetch('/api/posts/newPost',{method :'POST',
            body: JSON.stringify({
                content: postBody,
                images: images
            })
        })
        if(resp.ok) {
            console.log('success')
        } else {
            console.log('an error has occured');
        }
    }

</script>

    <div class="new-post">
        <div class="pfpText">
            {#if pfp}
                <div id="pfp" style={`background-image: url('${pfp}')`}></div>
            {:else}
                <span id="pfp"></span> 
            {/if}

            <textarea
                id="postBody"
                        type="text" 
                        placeholder="Write something..."
                        bind:value={postBody}
                        on:input={autoResize} 
            />
        </div>
        <span class="buttons">
            <input type="file" id="uploadButton" on:change={handleFileUpload} multiple> 
            <label for="uploadButton" id="uploadLabel">Upload</label>
            <button bind:this={postButton} id="postButton" class="under-text-button" on:click={createPost}>Post</button>
        </span>
        {#if images}
        <div class="images">
            {#each images as image,index}
                <span class="imgContainer">
                    <img src={image} alt='kys'>
                    <button class="imageDelete" on:click={()=>removeImage(index)}>X</button>
                </span>
            {/each}
        </div>
        {/if}
    </div>


<style>
    .buttons {
        display:flex;
        flex-direction: row;
        width:100%;
        justify-content: flex-end;

    }

    .images {
        position:relative;
        display:grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 140px;
    }
    .imgContainer {
        position:relative;
    }
    .images img {
        border-radius:8px;
        margin-top:.5rem;
        padding:.2rem;
        width:128px;
        height:128px;
        
    }
    .imageDelete {
        margin-top:.9rem;
        margin-left:-8.1rem;
        border-radius:40px;
        position:absolute;
        background-color:white;
        width:20px;
        height:20px;

    }
    .new-post {
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        background-color:white;
        box-shadow: 0 1.5px 1px rgb(159, 154, 161);
        align-items: center;
        flex: 2;
        border-radius:10px;
        padding:1rem;
        margin:.5rem;
    }

    .new-post:hover {
        box-shadow: 0 1px 5px rgb(147, 47, 214);
        transition-duration:.3s;

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
        box-shadow: 0px 0px 5px rgba(75, 17, 113, 1.452);
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
        color:black;
        font-size:13px;
        font-weight: bold;
        border-radius: 8px;
        height: 1.5rem;
        box-sizing: border-box;
        position: relative;
        width:15%;
        margin:0 .2rem;
        box-shadow:0 1px 3.5px rgb(185, 50, 238);
        background-color: rgb(240, 227, 240);
    }
    #postButton {
        box-shadow:0 2px 5px rgb(185, 50, 238);
        background-color: #9145a0; 
    }

    #postButton:disabled {
        opacity:70%;
    }

    #postButton:hover {
        cursor: pointer;
        box-shadow:0 2px 10px rgb(185, 50, 238);
        transition-duration: .25s; 
    }
    #uploadLabel:hover {
        cursor: pointer;
        box-shadow:0 1px 6.5px rgb(185, 50, 238);
        transition-duration:.1s
    }

    #pfp {
        width:50px;
        height:50px;
        min-width: 50px;
        min-height: 50px;
        background-color:cyan;
        border-radius:50%;
        background-size: cover; 
        background-position: center; 
        background-repeat: no-repeat;
    }

    @media(max-width: 500px) {
        #postButton {
            margin-left: 0;
            width: 20%;
        }
    }

    @media(max-width:1100px) {
        .images {
            grid-template-columns:1fr  1fr   1fr 1fr;
        }
        .images img {
            width:100px;
            height:100px
        }
        .imageDelete {
            margin-top:.9rem;
            margin-left:-6.2rem;
    
        }
        

    }
    @media(max-width:400px) {
        .images {
            grid-template-columns: 1fr 1fr 1fr;
        }
        .images img {
            width:110px;
            height:110px;
        }
    .imageDelete {
        margin-top:.9rem;
        margin-left:-7.6rem;

    }
    }
    @media(max-width:350px) {
        .images {
            grid-template-columns: 1fr 1fr;
        }
        .images img {
            width:110px;
            height:110px;
        }
        .imageDelete {
            margin-top:.9rem;
            margin-left:-7rem;
    
        }
    }
</style>