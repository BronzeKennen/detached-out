<script>
    import Logo from '../assets/logo.svg';
    import login from '../components/signin.svelte'

    let username = '';
    let fname = '';
    let lname = '';
    let email = '';
    let password = '';
    let validUser = false;


    function handleEnter(event) {
        if (event.key === "Enter" && !event.shiftKey) { 
            event.preventDefault();
            addUser(); 
        }
    }
    
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
            const userId = response.headers.get('User-Id');
            window.location.href = `/pages/home/`
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
                id="fname"
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
                id="lname"
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
            on:keypress={handleEnter}
            bind:value={password}
            type='password' 
            placeholder="Password" 
            required
            minlength="8"
            maxlength="32"/>
            <span class="invalid-feedback">
                <i class="fa-solid fa-exclamation"></i>
                <span class="feedbackText">Must be between 8 and 32 characters.</span>
            </span>
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
        height: 90vh;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto auto;
        background-color: rgb(235, 235, 235);
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
        position: absolute;
        top: 15vh;
        display: flex;
        align-items: start; 
        flex-direction: column;
        height: 450px;
        width: 400px;
        margin: 1rem;
        border-radius: 10px;
        background-color: white;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .signIn b {
        display: flex; 
        background-color: white;
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
        border-radius: 8px;
        font-weight: bold;
    }

    #signup {
        text-decoration: none;
        font-family: Helvetica, sans-serif;
        width: 40%; 
        margin-left: 0;
        height: 55%;
        margin-right: 0;
        color: rgb(255, 255, 255);
        box-shadow:0 2px 5px rgb(185, 50, 238);
        background-color: #9145a0; 
    }
    #signup:hover {
        cursor: pointer;
        box-shadow:0 2px 10px rgb(185, 50, 238);
        transition-duration: .25s; 
    }

    #login {
        text-decoration: none;
        font-family: Helvetica, sans-serif;
        width: 80%; 
        height: 65%;
        margin: 5% auto;
        cursor: pointer;
        color: #9145a0; 
        box-shadow:0 1px 3.5px rgb(185, 50, 238);
        background-color: rgb(240, 227, 240);
    }

    #login:hover {
        cursor: pointer;
        box-shadow:0 2px 10px rgb(185, 50, 238);
        transition-duration: .25s; 
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
        box-sizing: border-box; 
        position: relative; 
        border: none;
        border-radius: 10px;
        background-color: rgb(250, 240, 255);
        resize: none;
    }

    .input-wrapper input:focus {
        outline: none;
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
    }

    .input-wrapper input:hover {
        animation-duration: 0.5s;
        box-shadow: 0px 0px 5px rgba(75, 17, 113, 1.452);
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
        display: flex;
        box-shadow: 0 1px 3.5px rgb(185, 50, 238);
        background-color: rgb(185, 50, 238);
        color: rgb(240, 227, 240);
        z-index: 1;
        position:absolute;
        border-radius: 50%;
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

    .invalid-feedback:hover {
        transition-duration: 0.2s;
        cursor: pointer;
        visibility: visible;
    }

    .feedbackText {
        z-index: 999;
        position:absolute;
        box-shadow: 0 1px 3.5px rgb(185, 50, 238);
        background-color: rgb(185, 50, 238);
        color: rgb(240, 227, 240);
        text-align: center;
        font-size: x-small;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        visibility: hidden;
        opacity: 0.8;

        transform: translateY(-150%);  
        transform: translateX(50%);
        left: 0;
        top: 0;  
        height: auto;
        width: max-content;  
        padding: 2px 8px; 
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
            top: 50%;
            transform: translate(0, -50%);
            height: 70%;
            width: 90%;
        }

        #login, #signup {
            font-size: 0.8rem;
        }
    }
</style>