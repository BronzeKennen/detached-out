
<script>
    import ProfileIcon from "./profileIcon.svelte";
    export let applications;
    const applicant = applications.Applicant
    console.log(applications)
</script>
<div class="show">
    <ProfileIcon user={applicant.username} id={applicant.UserId} edu={applicant.university} pfp={applicant.profile_pic_url}/>
    <p>{applications.Message}</p>
</div>

<style>
.show {
    margin-top:2%;
    margin-left:1%;
    width:94%;
    background-color: white;
    min-height:90vh;
    overflow: scroll;
}
</style>