<script>
    import Logo from '../assets/logo.svg';
    let innerWidth = 0;
    let innerHeight = 0;
    let clicked = false;
    $: condition = innerWidth > 900;
</script>

<svelte:window bind:innerWidth bind:innerHeight/>

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

    .signIn {
        display: flex;
        align-items: start; 
        flex-direction: column;
        height: 450px;
        width: 400px;
        margin: 1rem;
        border-radius: 10px;
        background-color: rgb(225, 225, 225);
    }

    .signIn b {
        display: flex; 
        background-color: rgb(225, 225, 225);
        text-align: center;
        margin: 10% auto 25%;
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
        width: 25%; 
        margin-left: 15%;
        height: 50%;
        margin-right: 10%;
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
        margin: 5% auto;
    }

    .button-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 10%;
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
</style>


{#if condition}
<div class="container">
    <div class='signIn'>
        <b><img src={Logo} alt="Logo" /></b>
        <input type='email' placeholder="Email"/>
        <input type='password' placeholder="Password"/>
        <div class="button-container">
            <a href='/home' id="login">Log In</a>
            <a href='/home' id="forgot">Forgot Password?</a>
        </div>
        <div class="button-container">
            <a href='/home' id="signup">Don't have an account? Sign up!</a> 
        </div>
    </div>
</div>
{/if}