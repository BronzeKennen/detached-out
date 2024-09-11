
<script>
    import ProfileIcon from "./profileIcon.svelte";

    export let job;
    $: poster = job.Poster
    console.log(job)

</script>

<div class="detailed-job">
<ProfileIcon id={poster.UserId} user={poster.username} pfp={poster.profile_pic_url} edu={poster.university}/>
<div class="details">
<h2>{job.JobTitle}</h2>
<div class="spaced">
    <p>{job.EnrollmentType}  </p>
    <p>•</p>
    <p>{job.WorkplaceType}</p>
    <p>•</p>
    <p>{job.Location}</p>
</div>

<div class="spaced">
<p>Salary  •  {job.MonthlyWage}$ / Month</p>
</div>
<div class="buttons">
    <button class="apply">Apply</button>
    <button class="message">Message</button>
</div>
<div class="description">
    <h2>About the job</h2>
    <p>{job.JobDescription}</p>
</div>
</div>
</div>
<style>

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

