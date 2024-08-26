<script>
    import FeedPost from "../../../../components/feedPost.svelte";
    import MainProfile from "../../../../components/mainProfile.svelte";
    import ProfileIcon from "../../../../components/profileIcon.svelte";

    export let data;
    console.log(data.userProfile)

</script>

<style>
</style>
<MainProfile profile={data.userProfile} />

