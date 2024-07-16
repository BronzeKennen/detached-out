<script>
    import Logo from '../assets/logo.svg';
    export let count = 0;
    function Increment() {
        count += 1;
    }
</script>

<style>
    .navBar{
        overflow: hidden;
        background-color: rgb(225, 225, 225);
    }

    .navBar a {
        color: rgb(150, 50, 150);
        background-color: rgb(225, 225, 225);
        font-size: 20px;
        transition-duration: 0.2s;
        float: right;
        border: 0px;
        padding: 15px 15px;
        text-decoration: none;
    } 
    .navBar a:hover {
        background-color: rgb(150, 50, 150);
        color: rgb(225, 225, 225)
    }

    .navBar b {
        float: left;
    }

    .navBar b img {
        height: 40px; /* Adjust the height as needed */
        padding: 5px; /* Adjust the padding as needed */
    }
</style>

<div class='navBar'>
    <a href='#Settings'>Settings</a>
    <a href='#Profile'>Profile</a>
    <a href='#Notifications'>Notifications</a>
    <a href='#Chats'>Chats</a>
    <a href='#Jobs'>Jobs</a>
    <a href='#Network'>Network</a>
    <a href='#Home'>Home</a>
    <b><img src={Logo} alt="Logo" /></b>
</div>


