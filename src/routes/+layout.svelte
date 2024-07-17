
<script>
    import Logo from '../assets/logo.svg';

    let innerWidth = 0;
    let innerHeight = 0;
    let clicked = false;

    //should make conditions for multiple resolutions
    $: condition = innerWidth < 900;
    const handleClick = (() => {
        clicked = !clicked;
    });
</script>

<svelte:window bind:innerWidth bind:innerHeight/>

<style>
    .navBar{
        overflow: hidden;
        background-color: rgb(225, 225, 225);
        box-shadow: 3px 3px 2px rgba(0,0,0,.6);
        margin-bottom: 1em;
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
    .navBar ul {
        display:flex;
        align-items: center;
        justify-content: flex-end;
        list-style: none;
    }

    .navBar li {
        padding:0 .5rem;
        display:flex;
        align-items: center;
    }
    .navBar button {
        height:100%;
    }

    .navBar a {
        height:100%;
        width:100%;
        color: rgb(150, 50, 150);
        background-color: rgb(225, 225, 225);
        font-size: 20px;
        transition-duration: 0.2s;
        display:flex;
        align-items: center;
        border: 0px;
        padding: .4em 1em;
        text-decoration: none;
        border-radius:10px;
    }
    .navBar a:hover {
        background-color: rgb(204, 114, 204);
        color: rgb(225, 225, 225);
    }

    .navBar b img {
        height: 40px; /* Adjust the height as needed */
        padding: 5px; /* Adjust the padding as needed */
    }
    .sideBar {
        background-color: rgb(245, 244, 244);
        position:fixed;
        top:0;
        right:0;
        height:100vh;
        z-index: 999;
        box-shadow: -10px 0 10px rgba(0,0,0,.1);
        display:flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }
    .sideBar ul {
        list-style: none;
        width:100%;
    }
    .sideBar li {
        width:100%;
        padding:1rem;
    }
    .sideBar a {
        height:100%;
        width:100%;
        color: rgb(150, 50, 150);
        font-size: 20px;
        transition-duration: 0.2s;
        display:flex;
        align-items: center;
        border: 0px;
        padding: .4em 1em;
        text-decoration: none;
        border-radius:10px;
    }
    .sideBar li:hover {
        color: rgb(150, 50, 150);
        background-color: rgb(225, 225, 225);
        font-size: 20px;
        transition-duration: 0.2s;
        display:flex;
        align-items: center;
        text-decoration: none;
    }
</style>

{#if condition}
{#if clicked}
<nav class='sideBar'>
    <b><img src={Logo} alt="Logo" /></b>
    <ul>
        <li><button on:click={handleClick}>X LMAO</li>
        <li><a href='/home'>Home</a></li>
        <li><a href='/settings'>Settings</a></li>
        <li><a href='/profile'>Profile</a></li>
        <li><a href='/notifications'>Notifications</a></li>
        <li><a href='/chats'>Chats</a></li>
        <li><a href='/jobs'>Jobs</a></li>
        <li><a href='/network'>Network</a></li>
    </ul>
</nav>
{/if}
<nav class='navBar'>
    <b><img src={Logo} alt="Logo" /></b>
    <ul>
        <li><a href='/home'>Home</a></li>
        <li><a href='/settings'>Settings</a></li>
        <li><button on:click={handleClick}>LMAO</button></li>
    </ul>
</nav>
{:else}
<nav class='navBar'>
    <b><img src={Logo} alt="Logo" /></b>
    <ul>
        <li><a href='/home'>Home</a></li>
        <li><a href='/settings'>Settings</a></li>
        <li><a href='/profile'>Profile</a></li>
        <li><a href='/notifications'>Notifications</a></li>
        <li><a href='/chats'>Chats</a></li>
        <li><a href='/jobs'>Jobs</a></li>
        <li><a href='/network'>Network</a></li>
    </ul>
</nav>
{/if}
<slot/>