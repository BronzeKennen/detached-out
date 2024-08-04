<script>
    import FeedPost from "../../../components/feedPost.svelte";
    import MainProfile from "../../../components/mainProfile.svelte";
    import { onMount } from "svelte";
    import ProfileIcon from "../../../components/profileIcon.svelte";
</script>

<style>
    .userInfo {
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
    }
    /* will be removed */
    @media (max-width : 1000px) {
    }

    @media (max-width: 600px) {
        .userInfo {
            display:flex;
            flex-direction: column;
        }
    }
</style>

<MainProfile />
<div class="userInfo">
    PROFILE INFO TO CHANGE/UPDATE.
</div>
