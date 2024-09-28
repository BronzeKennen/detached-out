
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
    
    const handleClick = (() => {
        clicked = !clicked;
    });

    export let data;
</script>


<svelte:window bind:innerWidth bind:innerHeight/>

<style>
    .navBar {
    position: fixed;
    top: 0;
    width: 100%; 
    max-width: 1184px;
    margin-left: auto;
    margin-right: auto;
    z-index: 900; 
    height: 40px;
    display: flex;
    overflow: hidden;
    background-color: #ece4f0;
    margin-bottom: 1em;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem; 
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0 1.5px 10px rgb(212, 147, 242);
}

.navBar ul {
    flex: 1;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    list-style: none;
}

.navBar li {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.navBar button {
    border: none;
    background: none;
    cursor: pointer;
}

.navBar a {
    height: 100%;
    color: #393231;
    background-color: #ece4f0;
    font-size: 18px;
    transition-duration: 0.2s;
    display: flex;
    align-items: center;
    border: 0;
    padding: 0 0.5em;
    text-decoration: none;
}

.logo {
    border:none;
    background-color: none;
}

.navBar i {
    padding: 0 0.3rem 0 0;
    font-size: 140%;
}

.fa-bars {
    padding: 0 0.4rem !important;
}

.navBar a:hover {
    box-shadow: inset 0px -2px 0px #393231;
}

.navBar b img {
    height: 40px; 
    padding: 5px; 
}

.sideBar {
    overflow-y:scroll;
    overflow-x:hidden;
    background-color: #F3E9E9;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    z-index: 999;
    box-shadow: -10px 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
}
.sideBar::-webkit-scrollbar {
    width: 6px; /* Width of the scrollbar */
}

.sideBar::-webkit-scrollbar-track {
    display:none;
}

/* Handle (the part of the scrollbar you drag) */
.sideBar::-webkit-scrollbar-thumb {
    background: #888; /* Handle color */
    border-radius: 10px; /* Rounded corners */
}

.sideBar::-webkit-scrollbar-thumb:hover {
    background: #555; 
}

.sideBar ul {
    list-style: none;
    width: 100%;
}

.sideBar li {
    width: 100%;
    padding: 1rem;
}

.sideBar a {
    height: 100%;
    width: 100%;
    color: #393231;
    font-size: 20px;
    transition-duration: 0.2s;
    display: flex;
    border: 0px;
    padding: 0.4em 1em;
    text-decoration: none;
    border-radius: 10px;
}

.sideBar i {
    padding: 0 0.5rem;
}

.sideBar li:hover {
    color: #8D000E;
    background-color: #E3CAC3;
    font-size: 20px;
    transition-duration: 0.2s;
    display: flex;
    align-items: center;
    text-decoration: none;
}

@media (max-width: 600px) {
    .sideBar {
        width: 100%;
    }
    .sideBar img {
        display: none;
    }
    .sideBar ul {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
    }
    .sideBar li {
        height: 100%;
        padding: 0;
    }
    .sideBar a {
        width: 92%;
        display: flex; 
        align-items: center;
        justify-content: center;
    }
}

</style>

{#if clicked}
<nav class='sideBar'>
    <b><button on:click={() => window.location = '/pages/home'}><img src={Logo} alt="Logo" /></button></b>
    <ul>
        <li>
            <a on:click={handleClick} href=''>
                <i class="fa-solide fa-x"></i>
                <span>Close</span>
            </a>
        </li>
        <li>
            <a href='/'>
                <i class="fa-solid fa-circle-user"></i>
                <span>Logout</span>
            </a>
        </li>
        <li>
            <a href='/pages/home'>
                <i class="fa-solid fa-house"></i>
                <span>Home</span>
            </a>
        </li>
        <li>
            <a href='/pages/profile/edit'>
                <i class="fa-solid fa-user"></i>
                <span>Profile</span>
            </a>
        </li>
        <li>
            <a href='/pages/settings/'>
                <i class="fa-solid fa-gear"></i>
                <span>Settings</span>
            </a>
        </li>
        <li>
            <a href='/pages/notifications/'>
                <i class="fa-solid fa-bell"></i>
                <span>Notifications</span>
            </a>
        </li>
        <li>
            <a href='/pages/chats'>
                <i class="fa-solid fa-comments"></i>
                <span>Chats</span>
            </a>
        </li>
        <li>
            <a href='/pages/jobs'>
                <i class="fa-solid fa-suitcase"></i>
                <span>Jobs</span>
            </a>
        </li>
        <li>
            <a href='/pages/network/{data.user.id}'>
                <i class="fa-solid fa-person"></i>
                <span>Network</span>
            </a>
        </li>
    </ul>
</nav>
{/if}

<Container>
<nav class='navBar'>
    <b><button on:click={() => window.location = '/pages/home'}><img src={Logo} alt="Logo" /></button></b>
    <ul>
        <li>
            <a href='/pages/home/'>
                <i class="fa-solid fa-house"></i>
                {#if condition < 3}
                <span>Home</span>
                {/if}
            </a>
        </li>
        <li>
            <a href='/pages/profile/edit'>
                <i class="fa-solid fa-user"></i>
                {#if condition < 3}
                <span>Profile</span>
                {/if}
            </a>
        </li>
        <li>
        {#if condition === 3}
        <li>
            <a href='/pages/notifications'>
                <i class="fa-solid fa-gear"></i>
            </a>
        </li>
        <li>
            <a href='/pages/chats'>
                <i class="fa-solid fa-comments"></i>
            </a>
        </li>
        <li>
            <a href='/pages/jobs'>
                <i class="fa-solid fa-suitcase"></i>
            </a>
        </li>
        {/if}
        {#if condition <= 2}
        <li>
            <a href='/pages/settings/'>
                <i class="fa-solid fa-gear"></i>
                <span>Settings</span>
            </a>
        </li>
        <li>
            <a href='/pages/notifications/'>
                <i class="fa-solid fa-bell"></i>
                <span>Notifications</span>
            </a>
        </li>
        {/if}
        {#if condition <= 1}
        <li>
            <a href='/pages/chats'>
                <i class="fa-solid fa-comments"></i>
                <span>Chats</span>
            </a>
        </li>
        <li>
            <a href='/pages/jobs'>
                <i class="fa-solid fa-suitcase"></i>
                <span>Jobs</span>
            </a>
        </li>
        {/if}
        {#if condition <= 0}
        <li>
            <a href='/pages/network/'>
                <i class="fa-solid fa-person"></i>
                <span>Network</span>
            </a>
        </li>
        {/if}
        <li>
            <a href='/'>
                <i class="fa-solid fa-circle-user"></i>
                {#if condition < 3}
                <span>Logout</span>
                {/if}
            </a>
        </li>
        <li><a href=''><button on:click={handleClick}><i class="fa-solid fa-bars"></i></button></a></li>
    </ul>
</nav>
</Container>
<Container>
<slot/>
</Container>