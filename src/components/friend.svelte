<script>

    export let profile;
    export let id;
    let user;
    user = profile.Sender;
    if(profile.Sender.UserId === id) {
        user = profile.Recipient
    }

    console.log(profile)

</script>
<div class="friend-profile">
    <div class="background">
    </div>
    <div class="pfp">

    </div>
    <div class="details">
        <p>{user.JobTitle}</p>
        <p>{user.current_company.company_name}</p>
        <h4>{user.username}</h4>
        {#if profile.Status === 'pending'}
        <h6 style="color: orange;">{profile.Status}</h6>
        {/if}

    </div>
</div>
<style>
.friend-profile {

    color:white;
    margin:.5rem;
    border-radius:10%;
    position:relative;
}
.background {
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    height:55px;
    background-color: beige;
}
.pfp {
    position:absolute;
    width:55px;
    height:55px;
    top:55px;
    left:50%;
    border-radius:50%;
    border:3px white solid;
    background-color:aqua;
    transform: translate(-50%, -50%);
}
.details {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
    background-color:rgb(0, 0, 0);
    min-height:100px;
    padding-bottom: 2px;
}
.details p {
    font-size:12px;
}
</style>