<script>
    import ProfileIcon from "./profileIcon.svelte";
    import {onMount,onDestroy} from 'svelte'
    import { selectedProfile,friendStore } from '$lib/stores'

    export let user;

    $: $selectedProfile;
    let profile = $selectedProfile;

    if(!$selectedProfile) profile = user;

    // console.log(user)
    function shuffle(array) {
        let currentIndex = array.length;
        
        while (currentIndex != 0) {
        
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
        
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    }

    const getRecommended = async () => {

        resp = await fetch('/api/users', { 
            method:'GET', 
            //basically fetching people for the recommended tab. Cannot fetch friends or yourself
            headers: {
                'Content-Type': 'application/json',
                'userQueryType': 'recommended-connections',
                'UserId': $selectedProfile.UserId
            }
        })
        
        let e = await resp.json();
        shuffle(e);
        if(resp.ok) {
            recommended = await e.slice(0,3);
            recommended.forEach(item => {
                item.follow = false;
            }) 
        }  
        else {
            console.log('what du heeeelll no way a ay ay ay ')
        }
    }

    $: recommended = [];
    const followRequest = (async (user) => {
        user.follow = !user.follow
        recommended = recommended;
        resp = await fetch('/api/notifications/sendFriendRequest', { 
            headers : {
                'Content-Type' : 'application/json'
            },
            method:'POST',
            body: JSON.stringify({
                sender: profile.UserId,
                recipient: user.UserId
            })
        })
        .then(resp => resp.ok ? resp.json() : null)
        .then(friend => {
            if(friend) {
                if(!$friendStore) {
                    friendStore.set([friend.friend]);
                } else {
                    friendStore.update(friends => [...friends, friend.friend]);
                }
                console.log($friendStore)
            }
        }).then(
            getRecommended()
        );
    })
    let resp;
    onMount(async () => {
        await getRecommended();
    })
    


</script>
<style>
    
    .connection-profile{
        align-self: flex-start;
        margin:.5rem;
        flex:1;
        display:flex;
        flex-direction: column;
        border-radius: 5px;
    }
    @media (max-width: 820px) {
        .connection-profile {
            display:none;
        }
    }
    #follow-button {
        min-width: 90%;
        width:90%;
        min-height:30px;
        border:2px black solid;
        background:none;
        border-radius:40px;
        margin:.3rem 0 .7rem 0;
    }
    #follow-button:hover {
        background-color: rgba(0, 0, 0, 0.171);
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
        transition-duration: .3s;
    }
    .follow-button-clicked {
        transition-duration: 0.3s;
        background-color:black !important;
        color:white;
    }
    .profileIcon {
        position:relative;
        align-items: center;
        display:flex;
        flex-direction: column;
        border-radius:5px;
        margin-bottom:.5rem;
        margin-top:.1rem;
        background-color: aliceblue;
        min-height:100px;
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
    }
</style>
<div class="connection-profile">
    {#if recommended.length === 0} 
    <p>No people to recommend</p>
    {/if}
    {#each recommended as user}
        <div class="profileIcon">
        {#if user.university}
        <ProfileIcon user={user.username} edu={user.university} pfp={user.profile_pic_url}/>
        {:else}
        <ProfileIcon user={user.username} edu='' id={user.UserId}/>
        {/if}
        <button class:follow-button-clicked={user.follow} on:click={() => followRequest(user)} id="follow-button">{#if user.follow}Following {:else}+ Follow{/if}</button>
        </div>

    {/each}

</div>