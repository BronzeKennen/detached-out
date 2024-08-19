<script>
</script>
<style>
    .side-profile {
        margin:.5rem;
        border-radius:10%;
        position:relative;
        flex:1;
    }
    .background {
        border-top-left-radius:10px;
        border-top-right-radius:10px;
        height:75px;
        background-color: beige;
    }
    .pfp {
        position:absolute;
        width:75px;
        height:75px;
        top:75px;
        left:50%;
        border-radius:50%;
        border:3px white solid;
        background-color:aqua;
        transform: translate(-50%, -50%);
    }
    .details {
        display: flex;
        flex-direction: column-reverse;
        align-items: start;
        border-bottom-left-radius:10px;
        border-bottom-right-radius:10px;
        background-color:rgb(90, 61, 89);
        min-height:100px;
        padding-bottom: 2px;
    }

    .details .name {
        margin-left: 5%;
        color: gray;
        font-size: large;
        font-weight: bolder;
    }

    .details .info {
        margin-left: 5%;
        font-size: small;
        color: gray;
    }

    @media (max-width: 800px) {
        .side-profile {
            width:50%;
        }
    }
    @media (max-width: 600px) {
        .side-profile {
            margin:.5rem 0;
            width:100%;
        }
    }
</style>
<div class="side-profile">
    <div class="background">
    </div>
    <div class="pfp">
        

    </div>
    <div class="details">
        <div class='info'>Cleaning Crew</div>
        <div class='info'>Apple Computers</div>
        <div class='name'>Mister Baconator</div>
    </div>
</div>