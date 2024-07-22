<script>
    import ProfileIcon from "./profileIcon.svelte";
</script>
<style>
    .connection-profile{
        margin:.5rem;
        flex:1;
        background-color: rgba(192, 161, 161, 0.5);
        display:flex;
        flex-direction: column;
        border-radius: 5px;
    }
    @media (max-width: 820px) {
        .connection-profile {
            display:none;
        }
    }
</style>
<div class="connection-profile">
    <ProfileIcon user='Kenny'/>
    <ProfileIcon user='Baker'/>
    <ProfileIcon user='Hydra'/>

</div>