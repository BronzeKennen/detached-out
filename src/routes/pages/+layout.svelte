
<script>
    import Logo from '../../assets/logo.svg';
    import Container from '../../components/container.svelte';

    let innerWidth = 0;
    let innerHeight = 0;
    let clicked = false;
    $: condition  = 0;

    $: {
        if(innerWidth < 600) {
            condition = 3;
        } else if (innerWidth < 860) {
            condition = 2;
        } else if (innerWidth < 1000) {
            condition = 1;
        } else {
            condition = 0;
        }
    }
    //should make conditions for multiple resolutions

    
    const handleClick = (() => {
        clicked = !clicked;
    });
</script>


<svelte:window bind:innerWidth bind:innerHeight/>

<style>
    .navBar{
        height:40px;
        display:flex;
        overflow: hidden;
        background-color: rgb(225, 225, 225);
        margin-bottom: 1em;
        justify-content: space-between;
        align-items: center;
    }
    .navBar ul {
        flex: 1;
        height:90%;
        display:flex;
        align-items: center;
        justify-content: flex-end;
        list-style: none;
    }

    .navBar li {
        height:100%;
        display:flex;
        justify-content:space-between;
        align-items: center;
    }
    .navBar button {
        border:none;
        background:none;
        cursor: pointer;
    }

    .navBar a {
        height:100%;
        color: rgb(0, 0, 0);
        background-color: rgb(225, 225, 225);
        font-size: 18px;
        transition-duration: 0.2s;
        display:flex;
        align-items: center;
        border: 0px;
        padding:0 .5em;
        text-decoration: none;
    }
    .navBar i {
        padding:0 .3rem 0 0;
        font-size: 140%;
    }
    .fa-bars {
        padding:0 .4rem !important;
    }
    .navBar a:hover {
        box-shadow:inset 0px -2px 0px rgb(0,0,0);
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
        color: black;
        font-size: 20px;
        transition-duration: 0.2s;
        display:flex;
        border: 0px;
        padding: .4em 1em;
        text-decoration: none;
        border-radius:10px;
    }
    .sideBar i {
        padding: 0 .5rem;
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
    .sideBar button {
        display:flex;
        align-items: center;
        background:none;
        border:none;
        text-align: left;
        width:100%;
        height:100%;
    }
</style>

{#if clicked}
<nav class='sideBar'>
    <b><img src={Logo} alt="Logo" /></b>
    <ul>
        <li>
            <a on:click={handleClick} href=''>
                <i class="fa-solide fa-x"></i>
                <span>Close</span>
            </a>
        </li>
        <li>
            <a href='/home'>
                <i class="fa-solid fa-house"></i>
                <span>Home</span>
            </a>
        </li>
        <li>
            <a href='/profile'>
                <i class="fa-solid fa-user"></i>
                <span>Profile</span>
            </a>
        </li>
        <li>
            <a href='/settings'>
                <i class="fa-solid fa-gear"></i>
                <span>Settings</span>
            </a>
        </li>
        <li>
            <a href='/notifications'>
                <i class="fa-solid fa-bell"></i>
                <span>Notifications</span>
            </a>
        </li>
        <li>
            <a href='/chats'>
                <i class="fa-solid fa-comments"></i>
                <span>Chats</span>
            </a>
        </li>
        <li>
            <a href='/jobs'>
                <i class="fa-solid fa-suitcase"></i>
                <span>Jobs</span>
            </a>
        </li>
        <li>
            <a href='/network'>
                <i class="fa-solid fa-person"></i>
                <span>Network</span>
            </a>
        </li>
    </ul>
</nav>
{/if}

<Container>
<nav class='navBar'>
    <b><img src={Logo} alt="Logo" /></b>
    <ul>
        <li>
            <a href='/home'>
                <i class="fa-solid fa-house"></i>
                <span>Home</span>
            </a>
        </li>
        <li>
            <a href='/profile'>
                <i class="fa-solid fa-user"></i>
                <span>Profile</span>
            </a>
        </li>
        {#if condition <= 2}
        <li>
            <a href='/settings'>
                <i class="fa-solid fa-gear"></i>
                <span>Settings</span>
            </a>
        </li>
        <li>
            <a href='/notifications'>
                <i class="fa-solid fa-bell"></i>
                <span>Notifications</span>
            </a>
        </li>
        {/if}
        {#if condition <= 1}
        <li>
            <a href='/chats'>
                <i class="fa-solid fa-comments"></i>
                <span>Chats</span>
            </a>
        </li>
        <li>
            <a href='/jobs'>
                <i class="fa-solid fa-suitcase"></i>
                <span>Jobs</span>
            </a>
        </li>
        {/if}
        {#if condition <= 0}
        <li>
            <a href='/network'>
                <i class="fa-solid fa-person"></i>
                <span>Network</span>
            </a>
        </li>
        {/if}
        <li><a href=''><button on:click={handleClick}><i class="fa-solid fa-bars"></i></button></a></li>
    </ul>
</nav>
</Container>
<slot/>