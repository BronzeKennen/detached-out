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
        border-bottom-left-radius:10px;
        border-bottom-right-radius:10px;
        background-color:rgb(90, 61, 89);
        min-height:100px;
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
        rest of info
    </div>
</div>