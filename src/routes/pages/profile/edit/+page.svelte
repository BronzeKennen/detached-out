<script>
    import FeedPost from "../../../../components/feedPost.svelte";
    import MainProfile from "../../../../components/mainProfile.svelte";
    import ProfileIcon from "../../../../components/profileIcon.svelte";

    export let data;
    const profile = data.userProfile;


</script>

<style>
</style>
<MainProfile profile={profile} />

