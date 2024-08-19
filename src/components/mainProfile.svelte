<script>
    import PrevJob from "./prevJob.svelte";
    /* FETCH USER */
    let firstName = "Dimitris";
    let lastName = "Papaioannou Theodoropoulos";
    let currJobTitle = "Sport Science Intern";
    let currCompany = "Liverpool F.C.";
</script>


<style>
    .top-profile {
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
        transform: translate(+25%, -50%);
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

    .details {
        display: flex;
        flex-direction: column;
        align-items: start;
        position: relative;
        top: -15vh;
        padding-left: 10%;
        padding-right: 10%;
    }

    .fieldTitle {
        font-weight: bolder;
        font-size: xx-large;
        margin-bottom: 1rem;
    }

    .mandFields {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 2rem;
        margin-bottom: 2rem;
    }

    #textField {
        height: 2rem;
        border: none;
        border-radius: 10px;
        box-sizing: border-box;
        background-color: white;
        width: auto;
        flex: 1;
        display: flex;
        position: relative;
        resize: none;
        padding: .5rem;
        padding-left: 0.5;
        text-align: start;
    }

    #textField:focus {
        outline: none;
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
    }

    #textField:hover {
        animation-duration: 0.5s;
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
    }

    @media (max-width: 950px) {

        .background {
            height: 35vh;
        }

        .pfp {
            left: 50%;
            height: 30vh;
            width: 30vh;
        }

        .nameJob {
            position: inherit;
            width: 100%;
            top: -15vh;
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

        .details {
            top: -5vh;
        }
    }

    @media (max-width: 600px) {

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
            width: 100%;
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

        .details {
            top: -5vh;
        }
    }
</style>



<div class="top-profile">
    <div class="background"></div>
    <div class="pfp"></div>
    <div class="nameJob">
        <div class='name'>{firstName} {lastName}</div>
        <div class='companyAndTitle'>{currCompany}, {currJobTitle}</div>
    </div>
</div>
<div class="details">
    <div class="fieldTitle">First and Last Name</div>
    <div class="mandFields">
        <textarea
            id="textField"
            type="text" 
            placeholder="{firstName}"
            maxlength="16"
            minlength="3"
            on:blur={(e) => {
                if (e.target.value.length > 3) {
                    firstName = e.target.value;
                } else {
                    e.target.value = ''; 
                }
            }}    
        />
        <textarea
            id="textField"
            type="text" 
            placeholder="{lastName}"
            maxlength="30"
            minlength="3"
            on:blur={(e) => {
                if (e.target.value.length > 3) {
                    lastName = e.target.value;
                } else {
                    e.target.value = ''; 
                }
            }}  
        />
    </div>
    <div class="fieldTitle">Current Employer and Job Title</div>
    <div class="mandFields">
        <textarea
            id="textField"
            type="text" 
            placeholder="{currCompany}"
            maxlength="16"
            minlength="3"
            on:blur={(e) => {
                if (e.target.value.length > 3) {
                    currCompany = e.target.value;
                } else {
                    e.target.value = ''; 
                }
            }}    
        />
        <textarea
            id="textField"
            type="text" 
            placeholder="{currJobTitle}"
            maxlength="30"
            minlength="3"
            on:blur={(e) => {
                if (e.target.value.length > 3) {
                    currJobTitle = e.target.value;
                } else {
                    e.target.value = ''; 
                }
            }}  
        />
    </div>

    <div class="fieldTitle">Work Experience</div>
    <PrevJob />
    <PrevJob />
</div>