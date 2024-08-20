<script>
    import PrevJob from "./prevJob.svelte";
    import { invalidateAll } from '$app/navigation';

    /* FETCH USER */
    export let profile;
    if(profile.current_company === null) profile.current_company = {CompanyId: null, company_name: ''}
    if(profile.job_title === null) profile.job_title= {JobTitleId: null, JobTitle: ''};

    let originalProfile = profile;


    let firstName = profile.fname;
    let lastName = profile.lname;
    let currJobTitle = profile.job_title.JobTitle;
    let currCompany = profile.current_company.company_name;
    let id = profile.UserId;
    $: changedMand = false;
    $: changedEmp = false;
    console.log(currJobTitle)
    
    $: {
        if(firstName !== originalProfile.fname) {
            changedMand = true;
        }
        if(lastName !== originalProfile.lname) {
            changedMand = true;
        }
        if(lastName === originalProfile.lname && firstName === originalProfile.fname) {
            changedMand = false;
        }

        if(currCompany !== originalProfile.current_company.company_name) {
            changedEmp = true;
        }
        if(currJobTitle !== originalProfile.job_title.JobTitle) {
            changedEmp = true;
        }
        if(currCompany === originalProfile.current_company.company_name && currJobTitle === originalProfile.job_title.JobTitle) {
            changedEmp = false;
        }

    }

    const resetMand = (() => {    
        firstName = profile.fname;
        lastName = profile.lname;
    })

    const resetEmp = (() => {
        currJobTitle = profile.job_title.JobTitle;
        currCompany = profile.current_company.company_name;
    })

    const saveChanges = (async () => {

        const response = await fetch('/api/users', {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify( {
                UserId :id,
                fname: firstName,
                lname: lastName
            })
        })
        if(response.ok) {
            console.log('success!')
            originalProfile.fname = firstName;
            originalProfile.lname = lastName;
        } else {
            console.log('An error has occured');
        }
    })

    const saveWorkChanges = (async () => {
        const response = await fetch('/api/users', {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify( {
                UserId : id,
                current_company: currCompany,
                job_title : currJobTitle

            })
        })
        if(response.ok) {
            console.log('success')
            originalProfile.current_company.company_name = currCompany;
            originalProfile.job_title.JobTitle = currJobTitle;
        } else {
            console.log('An error has occured')
        }
    })

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
    .change-buttons {
        display:flex;
        justify-content: flex-end;
        width:100%;
    }
    .change-buttons button {
        margin:.2rem;
        margin-top:-1.3rem;
        width:15%;
        border-radius:5px;
        border:none;
        box-shadow: 0px 0px 6px rgb(127, 111, 219);
        background-color: rgb(193, 176, 221) 
    }

    .change-buttons button:hover {
        transition-duration: .2s;
        box-shadow: 0px 0px 12px rgb(127, 111, 219);
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
       {#if currCompany} <div class='companyAndTitle'>{currCompany}, {#if currJobTitle} {currJobTitle} {/if}</div> {/if}
    
    </div>
</div>
<div class="details">
    <div class="fieldTitle">First and Last Name</div>
    <div class="mandFields">
        <textarea
            id="textField"
            type="text" 
            bind:value={firstName}
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
            maxlength="30"
            minlength="3"
            bind:value={lastName}
            on:blur={(e) => {
                if (e.target.value.length > 3) {
                    lastName = e.target.value;
                } else {
                    e.target.value = ''; 
                }
            }}  
        />
    </div>
    {#if changedMand}
        <div class="change-buttons">
            <button class="save-button" on:click={saveChanges}>Save Changes</button>
            <button class="save-button" on:click={resetMand}>Reset</button>
        </div>    
    {/if}
    <div class="fieldTitle">Current Employer and Job Title</div>
    <div class="mandFields">
        <textarea
            id="textField"
            type="text" 
            bind:value={currCompany}
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
            maxlength="30"
            minlength="3"
            bind:value={currJobTitle}
            on:blur={(e) => {
                if (e.target.value.length > 3) {
                    currJobTitle = e.target.value;
                } else {
                    e.target.value = ''; 
                }
            }}  
        />
    </div>
    {#if changedEmp}
        <div class="change-buttons">
            <button class="save-button" on:click={saveWorkChanges}>Save Changes</button>
            <button class="save-button" on:click={resetEmp}>Reset</button>
        </div>    
    {/if}
    <div class="fieldTitle">Work Experience</div>
    <PrevJob />
    <PrevJob />
</div>