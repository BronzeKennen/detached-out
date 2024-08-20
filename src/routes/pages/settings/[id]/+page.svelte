<script>
    export let data;
    const user = data.userProfile;
    const orgUser = user;
    let username = user.username
    let email = user.email
    let confirmPassword ='';
    $: isCorrect = confirmPassword === password;
    $: emptyPass = password.length ===  0;

    $: len = confirmPassword.length;

    $: changed = (email === orgUser.email) && (username === orgUser.username)
    let password = '';
    let curPassword = '';
    $: alreadyInUse = false;


    const saveChanges = (async () => {
        alreadyInUse = false;
        const response = await fetch('/api/users/creds', {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify( {
                UserId :user.UserId,
                email: email,
                username: username
            })
        })
        if(response.ok) {
            console.log('success!')
            orgUser.email = email;
            orgUser.username = username;
        } else {
            console.log(response)
            alreadyInUse =true;
        }
    })

    const savePasswordChanges = (async () => {
         const response = await fetch('/api/users/creds', {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify( {
                UserId :user.UserId,
                oldPass: curPassword,
                newPass: password,
                confirmPass: confirmPassword
            })
        })
        if(response.ok) {
            console.log('success!')
        } else {
            console.log('an error has occured')
        }

    })

    const resetUser = (async () => {
        email = orgUser.email;
        username = orgUser.username
        alreadyInUse = false;

    })
</script>

<div class="complete">
    <div class="details">
        <div class="fieldTitle">User Settings</div>
        <div class="mandFields">
            <h3>Change username {#if alreadyInUse} Email or usename already in use {/if}</h3>
            <input
                id="textField"
                type="text" 
                bind:value={username}
                maxlength="16"
                minlength="3"
            />
        </div>
        <div class="mandFields">
            <h3>Change Email Address</h3>
            <input
                bind:value={email}
                id="textField"
                type="email" 
                maxlength="30"
                minlength="8"
            />
        </div>
            {#if !changed}
                <div class="change-buttons">
                    <button on:click={saveChanges}>Save Changes</button>
                    <button on:click={resetUser}>Reset</button>
                </div>
            {/if}
        <div class="separator"></div>
        <div class="mandFields">
            <h3>Change Password</h3>
            <br>
            <p>Current Password</p>
            <input
                bind:value={curPassword}
                id="textField"
                type="password" 
                maxlength="30"
                minlength="8"
            />
            <p>New Password</p>
            <input
                bind:value={password}
                id="textField"
                type="password" 
                maxlength="30"
                minlength="8"
            />
            {#if !emptyPass}
                <p>Confirm Password</p>
                <input
                    bind:value={confirmPassword}
                    id="textField"
                    type="password" 
                    maxlength="30"
                    minlength="8"
                />
            {/if}
            {#if len >= 8}
            <div class="change-buttons">
                <button on:click={savePasswordChanges}>Save Changes</button>
            </div>
            {/if}
        </div>
        <!-- {#if changedMand} -->
            <!-- <div class="change-buttons"> -->
                <!-- <button class="save-button" on:click={saveChanges}>Save Changes</button> -->
                <!-- <button class="save-button" on:click={resetMand}>Reset</button> -->
            <!-- </div>     -->
        <!-- {/if} -->
    </div>
</div>
 <style>
    .complete {
        min-width:100%;
    }
    .details {
        flex:1;
        display: flex;
        flex-direction: column;
        align-items: start;
        position: relative;
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
        flex-direction:column;
        justify-content: space-between;
        gap: .3rem;
        margin-bottom: 2rem;
    }
    .complete {
        display:flex;
        flex-direction: row;
    }
    .change-buttons {
        display:flex;
        justify-content: flex-end;
        flex-direction: row;
        width:100%;
    }
    .change-buttons button {
        margin:.4rem;
        width:35%;
        height:100%;
        border-radius:3px;
        border:none;
        box-shadow: 0px 0px 6px rgb(127, 111, 219);
        background-color: rgb(193, 176, 221) 
    }

    .change-buttons button:hover {
        transition-duration: .2s;
        box-shadow: 0px 0px 12px rgb(127, 111, 219);
    }

    .separator {
        border:none;
        border-top:1px solid #ccc;
        margin:3% 0;
        min-width:100%;
    }

    #textField {
        height: 1rem;
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

    @media (max-width: 1000px) {
        .details {
            flex:3;
        }

    }
    @media(max-width:600px) {

    }
 </style>