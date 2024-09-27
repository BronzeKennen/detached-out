
<script>
    import ProfileIcon from "./profileIcon.svelte";
    export let applications;
    const applicant = applications.Applicant
    console.log(applications)
</script>
<div class="show">
    <ProfileIcon user={applicant.username} id={applicant.UserId} edu={applicant.university} pfp={applicant.profile_pic_url}/>
    <div class="text">{applications.Message}</div>
    <button class="message">Message</button>
</div>

<style>
.show {
    border-radius: 10px;
    background-color: #f2eaf3;
    padding: 0.5rem;
    margin-top:2%;
    margin-left:1rem;
    width: auto;
    height: fit-content;
}

.text {
    padding-left: 0.5rem;
}

.message {
    position: inherit;
    margin: auto 20% auto 80%;
}
</style>