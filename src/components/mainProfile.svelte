<style>
    .main-profile {
        margin:.5rem;
        border-radius:10%;
        position:relative;
        flex:1;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: start;
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
        position: relative; 
        left: 20%;
        transform: translate(-50%, -50%);
    }

    .nameJob {
        padding-left: 25vh;
        height: 20vh;
        display: flex;
        flex-direction: column;
    }

    .name {
        margin-top: 5%;
        text-align: center;
        font-size: x-large;
        font-weight: bold;
    }

    .companyAndTitle {
        font-size: larger;
    }

    @media (max-width: 900px) {
        .main-profile {
        }
  
        .background {
            height: 30vh;
        }

        .pfp {
            left: 20%;
            height: 25vh;
            width: 25vh;
        }

        .nameJob {
            padding-left: 5vh;
            height: 7.5vh;
            display: flex;
            flex-direction: column;
        }

        .name {
            font-size: larger;
        }

        .companyAndTitle {
            font-size: medium;
        }
    }

    @media (max-width: 600px) {
        .main-profile {
        }

        .background {
            height: 20vh;
        }

        .pfp {
            left: 50%;
            height: 20vh;
            width: 20vh;
        }

        .nameJob {
            position: inherit;
            top: -10vh;
            margin-left: auto;
            margin-right: auto;
            padding-left: 0;
            height: 7.5vh;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .name {
            font-size: large;
        }

        .companyAndTitle {
            font-size: medium;
        }
    }
</style>
<div class="main-profile">
    <div class="background"></div>
    <div class="pfp"></div>
    <div class="nameJob">
        <div class='name'>Dimitris Papaioannou Theodoropoulos</div>
        <div class='companyAndTitle'>Liverpool F.C, Sport Science Intern</div>
    </div>
</div>