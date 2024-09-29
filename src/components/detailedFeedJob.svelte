
<script>
    import {fade} from 'svelte/transition'
    import ProfileIcon from "./profileIcon.svelte";

    export let job;
    let poster 
    $: apply = false;
    let showApplyDiv = apply;
    $: if(job) {
        applicationStatus = 2;
        apply = false;
        poster = job.Poster
    }

    $: applicationStatus = 2;

    $:applicationBody = ''

    async function sendApplication () {
        const resp = await fetch('/api/jobs/applications', {
            method: 'POST',
            body: JSON.stringify({
                advertId: job.AdvertId,
                message:applicationBody                
            })
        })
        if(resp.ok) {
            applicationStatus = 0;
        } else {
            applicationStatus = 1;
        }
        applicationBody = ''
    }

    function applyButton() {
        apply = 1;

    }


    function handleEnter(event) {
        if (event.key === "Enter" && !event.shiftKey) { 
            event.preventDefault();
            createPost(); 
        }
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
</script>

<div class="detailed-job" transition:fade={{duration:200}}>
<ProfileIcon id={poster.UserId} user={poster.username} pfp={poster.profile_pic_url} edu={poster.university}/>
<div class="details">
<h2>{job.JobTitle}</h2>
<div class="spaced">
    <p>{job.EnrollmentType}</p>
    <p>•</p>
    <p>{job.WorkplaceType}</p>
    <p>•</p>
    <p>{job.Location}</p>
</div>

<div class="spaced">
<p>Salary • {job.MonthlyWage}€ / Month</p>
</div>
<div class="buttons">
    <button class="apply" on:click={applyButton}>Apply</button>
    <button class="message"><a id="message" href="chats/{poster.UserId}">   Message</a></button> 
</div>
{#if !apply}
<div class="description" transition:fade={{duration:200}} on:outroend={() => showApplyDiv = apply}>
    <h2>About the job</h2>
    <p>{job.JobDescription}</p>
    <h2>Additional Info</h2>
    <p>{job.AdditionalInfo}</p>
</div>
{:else if showApplyDiv && applicationStatus === 2}
<div transition:fade={{duration:200}} on:outroend={() => apply = showApplyDiv} class="apply-div">
    <div class="flex-on-these-mfs">
        <h5>Send a letter along with your application</h5>
        <button id="tomfoolery" on:click={() => {showApplyDiv = false}}>X</button>
    </div>
    <textarea transition:fade={{duration:100}}
        id="postBody"
        type="text" 
        placeholder="Type your message here..."
        bind:value={applicationBody}
        on:input={autoResize} 
        on:keypress={handleEnter}
    />
    {#if applicationBody !== ''}
    <button transition:fade={{delay:50 ,duration:200}} class="send-button" on:click={sendApplication}>Send</button>
    {/if}
</div>
    {:else if applicationStatus !== 2}
    <div class="status-message" transition:fade={{delay:201, duration:200}}>
        {#if applicationStatus === 0}
        <p>Application sent successfully</p>
        {:else if applicationStatus === 1}
        <p>An error occured while sending application. This could occur if you have already applied before. If that's not the case please try again later</p>
        {/if}
    </div>

{/if}
</div>
</div>
<style>

.status-message {
    margin-top:1rem;
    padding:1rem;
    background-color: #fae4ff;
    width:91%;
    border-radius:5px;
}

#tomfoolery {
    border-radius:40px;
    width:25px;
    height:25px;
    border:none;
    margin-top:-.5%
}
.flex-on-these-mfs {
    display:flex;
    justify-content: space-between;
    flex-direction: row;
}
.send-button {
    margin-left:89%;
    font-size:15px;
    margin-top:1%;
    width:60px;
    height:20px;
    border-radius:15px;
    background-color: #a266ad;
    color:white;
    border:none;
    box-shadow: 0px 1px 8px 0px rgb(232, 57, 255)
}
.apply-div {
    margin-top:5%;
    background-color: rgb(250, 231, 255);
    padding:.5rem;
    border-radius:10px;
    width:93%;
}
.apply-div h5 {
    margin-top:.1rem;
    margin-left:.2rem;
    margin-bottom:1rem;
}
.description {
    margin-top:1.5em;
    overflow-x:hidden;
}

.detailed-job {
    padding:.6rem;
    width:100%;
    min-height:91dvh;
    border-radius:10px;
    background-color:white;
    overflow:scroll;
}

.buttons {
    width:65%;
    margin-top:.8em;
    display:flex;
}
.buttons button {
    margin:0 .5em 0 0;
    width:40%;
    height:35px;
    border:none;
    border-radius:25px;
}

.apply {
    box-shadow:0 2px 5px rgb(185, 50, 238);
    background-color: #a266ad; 
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    height: 1.5rem;
    box-sizing: border-box;
    position: relative;
    width:20%;
    margin:0 .2rem 0 80%;
}

.apply:hover {
    background-color: #9145a0; 
    cursor: pointer;
    box-shadow:0 2px 10px rgb(185, 50, 238);
    transition-duration: .25s; 
}
#message {
    display:flex;
    align-items: center;
    justify-content: center;
    text-decoration:none;
    color:inherit;
    min-width:100%;
    min-height:100%;
}

 #postBody {
    min-height: 50px;
    height: 100%;
    border: none;
    border-radius: 10px;
    box-sizing: border-box;
    background-color: rgb(236, 236, 236);
    width: 100%;
    display: flex;
    position: relative;
    resize: none;
    padding: .5rem;
    padding-left: 0.5;
    border:.5px black solid;
}

#postBody:focus {
    outline: none;
    box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
}

#postBody:hover {
    animation-duration: 0.5s;
    box-shadow: 0px 0px 5px rgba(75, 17, 113, 1.452);
}


.details {
    padding:.7rem;
}

.details h2 {
    margin:.5em 0;
}
.details p {
    opacity:70%;
    padding:.2rem 0;
}
.spaced {
    margin-top:.3em;
    width:55%;
    display:flex;
    justify-content: space-between;
}
</style>

