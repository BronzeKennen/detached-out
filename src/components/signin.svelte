<script>
    import Logo from '../assets/logo.svg';
    import { onMount } from 'svelte';

    onMount(async () => {
        await fetch('/api/users/clear-cookie');
    })

    let innerWidth = 0;
    let innerHeight = 0;
    let email = ''
    let password = ''



    export async function login() {

        if(email.trim() === '' || password.trim() === '') return;


        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers : { 
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    email,
                    password
                })
            })
            if(response.ok) {
                const userId = response.headers.get('User-Id');
                window.location.href = `/pages/home/`
            } else {
                console.error("Email or password is incorrect")
                window.location.href = '#'
            }
        } catch (err) {
            console.error('Error during login:',err);
            window.location.href = '#'
        }
    }

    $: condition = innerWidth > 450;
</script>

<svelte:window bind:innerWidth bind:innerHeight/>


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
        background-color: rgb(225, 225, 225);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .signIn b {
        display: flex; 
        background-color: rgb(225, 225, 225);
        text-align: center;
        margin: 5% auto 20%;
    }

    .signIn b img {
        height: 100px; 
        border-radius: 15px;
        display: flex;
        margin: 0 auto;
    }

    #login, #forgot, #signup {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 4px;
    }

    #login {
        background-color: rgb(150, 50, 150);
        color: rgb(225, 225, 225);
        text-decoration: none;
        font-family: Helvetica, sans-serif;
        width: 40%; 
        margin-left: 10%;
        height: 50%;
        margin-right: 0;
    }

    #forgot {
        background-color: rgb(225, 225, 225);
        color: rgb(150, 50, 150);
        text-decoration: none;
        font-family: Helvetica, sans-serif;
        width: 35%; 
        margin-left: 5%;
        margin-right: 10%;
    }

    #signup {
        background-color: rgb(60, 170, 30);
        color: rgb(255, 255, 255);
        text-decoration: none;
        font-family: Helvetica, sans-serif;
        width: 80%; 
        height: 65%;
        margin: 5% auto 5%;
        cursor: pointer;
    }

    .button-container {
    display: flex;
    justify-content: space-between;
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
    input {
        text-align: center;
        margin: 2% auto 2% auto; 
        width: 80%; 
        padding: 1.5%; 
        display: flex;
        border-radius: 6px;
        border: 2px solid black;
        box-sizing: border-box; 
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

        #forgot, #login, #signup {
            font-size: 0.8rem;
        }
    }
</style>



<div class="container">
    <div class='signIn'>
        <b><img src={Logo} alt="Logo" /></b>
        <div id="info">Welcome Back!</div>
        <input bind:value={email} type='email' placeholder="Email"/>
        <input bind:value={password} type='password' placeholder="Password"/>
        <div class="button-container">
            <a on:click|preventDefault={login} href='#' id="login">Log In</a>
            <a href='/pages/home' id="forgot">Forgot Password?</a>
        </div>
        <div class="button-container">
            <a id="signup" href='/signup'>Don't have an account? Sign up!</a> 
        </div>
    </div>
</div>

