
<script>
    import { onMount ,onDestroy} from "svelte";
    import FeedJob from "./feedJob.svelte";
    import {jobStore,current} from '$lib/stores.js'
    import { writable } from "svelte/store";


    jobStore.set([])
    let jobs = $jobStore;
    export let profile;
    export let own = 0;
    export let selectedJob = writable(null);

    export let id;
    $: {
        console.log($jobStore)

    }


    let isLoading;
    let allJobsLoaded = false;
    let page = 1;

    async function createJobImpression() {
        const resp = await fetch('/api/jobs/impression',{
            method: 'POST',
            body: JSON.stringify({
                advertId: $current.AdvertId
            })
        })
        if(resp.ok) {
            console.log("Success")
        } else {
            console.log("An error has occured")
        }
        
    }

    async function fetchPosts() {
        const resp = await fetch(`/api/jobs?page=${page}&limit=5&own=${own}&id=${profile.UserId}`,{
            method:'GET'
        })
        if(resp.ok) {
            const data = await resp.json();
            if(data.jobs.length > 0) {
                for(const newJob of data.jobs) {
                    if(own) {
                        const applications = await fetch(`/api/jobs/applications?advertId=${newJob.AdvertId}`)
                        const data = await applications.json();
                        newJob.applications = data.applications
                    } else {
                        newJob.applications = []
                    }
                    jobs = [...jobs,newJob]
                    jobStore.set(jobs)
    
                }
            page += 1;
            } else {
                allJobsLoaded = true;

            }
        }
        isLoading = false;
    }

    function checkScroll() {
        const scrollableHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;

        if (scrollableHeight - scrollTop <= windowHeight * 1.5) {
            if (!isLoading) {
                isLoading = true;
                fetchPosts();
            }
        }
    }

    onMount(async () => {
        if(typeof window !== 'undefined')
        window.addEventListener('scroll', checkScroll);

        fetchPosts();

    });

    onDestroy(() => {
        if(typeof window !== 'undefined')
            window.removeEventListener('scroll', checkScroll);
    });
</script>
{#each $jobStore as job}
    <div class="clicker" on:click={() => {selectedJob.set(job); current.set(job); createJobImpression()}}>
        <FeedJob job={job} id={id} selected={job === $selectedJob ? true : false}/>
    </div>
{/each}


<style>
</style>