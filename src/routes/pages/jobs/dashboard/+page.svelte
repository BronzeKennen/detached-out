<script>
    import NewJob from "../../../../components/newJob.svelte";
    import LoadJobs from "../../../../components/loadJobs.svelte";

    export let data;
    const profile = data.userProfile
</script>
<div class="create-job">
    <div class="text">
        <h2>Create a job Advert</h2>
        <p>Looking to hire? Create a job advert here</p>
    </div>
    <NewJob />
</div>
<div class="wrapper">
    <h1 align="center">Your job adverts</h1>
    <LoadJobs profile={profile} own={1}/>
</div>
<style>
    h1 {
        margin:1rem;
    }

    .create-job {
        padding:1em;
        margin-top:5%;
        background-color:rgb(205, 233, 255);
        border-radius:10px;
    }
</style>