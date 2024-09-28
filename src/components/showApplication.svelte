
<script>
    import ProfileIcon from "./profileIcon.svelte";
    export let applications;
    const applicant = applications.Applicant
    console.log(applications)
</script>
<div class="show">
    <span class="ff">
        <ProfileIcon user={applicant.username} id={applicant.UserId} edu={applicant.university} pfp={applicant.profile_pic_url}/>
        <button class="message"><i class="fa-solid fa-paper-plane"></i> Message</button>
    </span>
    <div class="text"><div id="apmessage">Applicant Message:</div>{applications.Message}</div>
</div>

<style>
.show {
    border-radius: 10px;
    background-color: #f2eaf3;
    padding: 0.5rem;
    margin-top:2%;
    margin-left:1rem;
    width: 90%;
    height: fit-content;
}

.text {
    display: flex;
    padding-left: 1rem;
}

.message {
        transform: translateX(-80%);
        width: fit-content;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        border:2px black solid;
        background:none;
        border-radius:40px;
        text-wrap: nowrap;
        height: 2rem;
    }
.message:hover {
    background-color: rgba(0, 0, 0, 0.171);
    box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
    transition-duration: .3s;
}

.ff {
    width:  fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
}

#apmessage {
    padding-right: 0.25rem;
    text-wrap: nowrap;
    font-weight: bold;
}
</style>