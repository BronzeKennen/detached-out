<script>
    import Logo from '../assets/logo.svg';
    import login from '../components/signin.svelte'

    let username = '';
    let fname = '';
    let lname = '';
    let email = '';
    let password = '';
    let validUser = false;

    async function addUser() {

        if(fname.trim() === '' || lname.trim() === '' || username.trim() === '') {
            return;
        }
        console.log(username,fname,lname,email,password)

        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                username,
                fname,
                lname,
                email,
                password
            })
        })
        if(response.ok) {
            window.location.href = '/pages/home'
        } else {
            console.error("Error adding user.");
            window.location.href = '#'
            return;
        }
        
    }
</script>



<div class="container">
    <div class='signIn'>
        <b><img src={Logo} alt="Logo" /></b>
        <div id="info">Sign up quick and easy!</div>
        <div class="input-wrapper">
            <input
            bind:value={username}
            type="name"
            placeholder='Username'
            required/>
            <span class="invalid-feedback">
                <i  class="fa-solid fa-exclamation"></i>
            </span>
            <span class="feedbackText">Cannot be empty</span>
        </div>
        <div class="names">
            <div class="input-wrapper">
                <input 
                bind:value={fname}
                type='name' 
                placeholder="First Name" 
                required/>
                <span class="invalid-feedback">
                    <i class="fa-solid fa-exclamation"></i>
                </span>
                <span class="feedbackText">Cannot be empty.</span>
            </div>
            <div class="input-wrapper">
                <input 
                type='name' 
                bind:value={lname}
                placeholder="Last Name" 
                required/>
                <span class="invalid-feedback">
                    <i class="fa-solid fa-exclamation"></i>
                </span>
                <span class="feedbackText">Cannot be empty.</span>
            </div>
        </div>
        <div class="input-wrapper">
            <input 
            bind:value={email}
            type='email'
            placeholder="Email" 
            required/>
            <span class="invalid-feedback">
                <i class="fa-solid fa-exclamation"></i>
            </span>
            <span class="feedbackText">Must be a valid e-mail address.</span>
        </div>
        <div class="input-wrapper">
            <input 
            bind:value={password}
            type='password' 
            placeholder="Password" 
            required
            minlength="8"
            maxlength="32"/>
            <span class="invalid-feedback">
                <i class="fa-solid fa-exclamation"></i>
            </span>
            <span class="feedbackText">Must be between 8 and 32 characters.</span>
        </div>
        <div class="button-container">
            <a href='#' id="signup" on:click|preventDefault={addUser}>Join now!</a>
        </div>
        <div class="button-container">
            <a id="login" href='../'>Already have an account? Log in!</a> 
        </div>
    </div>
</div>

<style>
    .container {
        max-width: 1200px;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto auto;
        background-color: rgb(255, 255, 255);
    }

    .names {
        display:flex;
        align-self: center;
        flex-direction: row;
        width:89%;
        height:36px;
        padding:.5rem 0;
    }
    .signIn {
        display: flex;
        align-items: start; 
        flex-direction: column;
        height: 450px;
        width: 400px;
        margin: 1rem;
        border-radius: 10px;
        background-color: rgb(225, 225, 225);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .signIn b {
        display: flex; 
        background-color: rgb(225, 225, 225);
        text-align: center;
        margin: 5% auto 5%;
    }

    .signIn b img {
        height: 100px; 
        border-radius: 15px;
        display: flex;
        margin: 0 auto;
    }

    #login, #signup {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 4px;
    }

    #signup {
        background-color: rgb(60, 170, 30);
        color: rgb(225, 225, 225);
        text-decoration: none;
        font-family: Helvetica, sans-serif;
        width: 40%; 
        margin-left: 0;
        height: 50%;
        margin-right: 0;
    }

    #login {
        background-color: rgb(150, 50, 150);
        color: rgb(255, 255, 255);
        text-decoration: none;
        font-family: Helvetica, sans-serif;
        width: 80%; 
        height: 65%;
        margin: 5% auto;
        cursor: pointer;
    }

    .button-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 10%;
    }

    #info {
        height: 5%;
        margin-left: 10%;
        margin-bottom: 2.5%;
        margin-top: 2.5%;
        color: rgb(0, 0, 0);
        font-size: larger;
    }

    .input-wrapper input {
        text-align: center;
        margin: 1% auto 1% auto; 
        width: 80%; 
        padding: 1.5%; 
        display: flex;
        border-radius: 6px;
        border: 2px solid black;
        box-sizing: border-box; 
        position: relative; 
        background-color: rgba(0, 0, 0, 0.082);
    }

    .input-wrapper input:hover {
        box-shadow: 0px 0px 2px rgba(155, 17, 113, 1.452);
    }

    .input-wrapper {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: start;
        margin: 0 auto;
    }

    input:invalid ~ .invalid-feedback{
        visibility: visible;
    }

    .invalid-feedback {
        z-index: 1;
        position:absolute;
        background-color: red;
        border-radius: 50%;
        color: white;
        text-align: center;
        font-weight: bolder;
        right: 15%;
        top: 50%;
        transform: translateY(-50%);
        height: 50%;
        aspect-ratio: 1/1;
        display: flex;
        align-items: center;
        justify-content: center;
        visibility: hidden;
    }

    .invalid-feedback:hover ~ .feedbackText {
        transition-duration: 0.2s;
        cursor: pointer;
        visibility: visible;
    }

    .feedbackText {
        z-index: 1;
        position:absolute;
        background-color: red;
        color: white;
        text-align: center;
        font-size: x-small;
        transform: translateY(-50%);
        border-radius: 5px;
        right: 21%;
        top: 50%;
        height: 50%;
        width: fit-content;
        padding: 0.25%;
        display: flex;
        align-items: center;
        justify-content: center;
        visibility: hidden;
        opacity: 0.8;
    }

    @media (max-width: 450px) {
        :global(body) {
            margin: 0;
        }
        .container {
            flex-direction: column;
            justify-content: space-around; 
            margin: 0;
            padding: 0;
            width: 100%;
        }
        .signIn {
            height: 70%;
            width: 90%;
        }

        #login, #signup {
            font-size: 0.8rem;
        }
    }
</style>