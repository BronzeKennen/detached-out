<style>
    .main-profile {
        margin:.5rem;
        border-radius:10%;
        position:relative;
        flex:1;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 25vh;
    }
    .background {
        border-radius:25px;
        height: 45vh;
        background-color: beige;
        width: 100%;
        position: relative;
    }

    .pfp {
        height: 40vh;
        width: 40vh;
        border-radius: 50%;
        border: 3px white solid;
        background-color: aqua;
        position: absolute; 
        bottom: -20vh; 
        left: 50%;
        transform: translateX(-50%);
    }

    @media (max-width: 900px) {
        .main-profile {
            margin-bottom: 15vh;
        }
  
        .background {
            height: 30vh;
        }

        .pfp {
            height: 20vh;
            width: 20vh;
            bottom: -10vh;
        }
    }

    @media (max-width: 600px) {
        .main-profile {
            margin-bottom: 10vh;
        }

        .background {
            height: 20vh;
        }

        .pfp {
            height: 15vh;
            width: 15vh;
            bottom: -7.5vh;
        }
    }
</style>
<div class="main-profile">
    <div class="background"></div>
    <div class="pfp"></div>
</div>