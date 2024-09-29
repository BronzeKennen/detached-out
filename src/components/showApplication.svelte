
<script>
    import ProfileIcon from "./profileIcon.svelte";
    export let applications;
    const applicant = applications.Applicant
    console.log(applications)
</script>
<div class="show">
    <span class="ff">
        <ProfileIcon user={applicant.username} id={applicant.UserId} edu={applicant.university} pfp={applicant.profile_pic_url}/>
        <a class="message" href="/pages/chats/{applicant.UserId}"><i class="fa-solid fa-paper-plane"></i> Message</a>
    </span>
    <div class="text"><div id="apmessage">Applicant Message:</div>{applications.Message}</div>
</div>

<style>
a {
    text-decoration: none;
    color:inherit;
}

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
    background-color: black;
    color: white;
    width: fit-content;
    display: flex;
    margin-left: 1rem;
    padding: 0.25rem;
    border-radius: 8px;
}

.message {
        transform: translateX(-80%);
        width: fit-content;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        border:2px black solid;
        background:none;
        border-radius:40px;
        text-wrap: nowrap;
        height: 1.5rem;
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