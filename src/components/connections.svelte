<script>
    import ProfileIcon from "./profileIcon.svelte";
    import {onMount,onDestroy} from 'svelte'
    import { selectedProfile } from '$lib/stores'

    export let user;

    $: $selectedProfile;
    let profile = $selectedProfile;
    console.log('hello?>!')
    console.log(profile)

    if(!$selectedProfile) profile = user;

    // console.log(user)
    function shuffle(array) {
        let currentIndex = array.length;
        
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
        
            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
        
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    }

    $: recommended = [];
    const followRequest = ((user) => {
        user.follow = !user.follow
        recommended = recommended;
    })
    let resp;
    onMount(async () => {
        resp = await fetch('/api/users', { method:'GET'});
        let e = await resp.json();
        shuffle(e);
        if(resp.ok) {
            recommended = await e.slice(0,3);
            //need to check not to add myself as a user
            recommended.forEach(item => {
                item.follow = false;
            }) 
        }  
        else {
            console.log('what du heeeelll no way a ay ay ay ')
        }
    })
    
    onDestroy(async () => {
        console.log('a')
        recommended.forEach(async (user) =>  {
            if(user.follow) {
                resp = await fetch('/api/notifications/sendFriendRequest', { 
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    method:'POST',
                    body: JSON.stringify({sender: profile.UserId,recipient: user.UserId})
                });
                if(resp.ok) {
                    console.log(resp)
                }
            } 
        })
    })


</script>
<style>
    .connection-profile{
        align-self: flex-start;
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
        margin:.5rem;
        background-color: aliceblue;
        min-height:100px;
    }
</style>
<div class="connection-profile">
    {#each recommended as user}
        <div class="profileIcon">
        {#if user.university}
        <ProfileIcon user={user.username} edu={user.university}/>
        {:else}
        <ProfileIcon user={user.username} edu=''/>
        {/if}
        <button class:follow-button-clicked={user.follow} on:click={() => followRequest(user)} id="follow-button">{#if user.follow}Following {:else}+ Follow{/if}</button>
        </div>

    {/each}

</div>