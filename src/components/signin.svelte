<script>
    import Logo from '../assets/logo.svg';
</script>

<style>
    .container {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: start; /* align items at the start */
        background-color: rgb(255, 255, 255);
    }

    .signIn {
        display: block;
        height: 50%;
        width: 25%;
        margin: 10% auto;
        background-color: rgb(225, 225, 225);
    }

    .signIn b {
        display: block; 
        background-color: rgb(225, 225, 225);
        text-align: center;
        margin: 10% auto;
    }

    .signIn b img {
        height: 100px; 
        display: block;
        margin: 0 auto;
    }
    
    .signIn .textBoxes {
        display: block; 
        background-color: black;
        margin: auto auto 30% auto;
        height: 20%;
        padding: 5%; 
        color: white; 
        width: 80%; 
    }

    .signIn .logInButton {
        display: block;
        text-align: center;
        width: 30%; 
        margin-top: -22% 75%;
        padding: 1.5%;
    }

    input {
        text-align: center;
        margin: 2% auto 2% auto; 
        width: 100%; 
        padding: 1.5%; 
        display: flex;
        box-sizing: border-box; 
    }
</style>

<div class="container">
    <div class='signIn'>
        <b><img src={Logo} alt="Logo" /></b>
        <div class ='textBoxes'>
            <input type='email' placeholder="Email" />
            <input type='password' placeholder="Password" />
        </div>
        <button class='logInButton'>Press</button>
    </div>
</div>