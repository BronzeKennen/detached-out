
<script>
    import { onMount ,onDestroy} from "svelte";
    import FeedJob from "./feedJob.svelte";
    import {jobStore,current} from '$lib/stores.js'


    jobStore.set([])
    let jobs = $jobStore;
    export let profile;
    export let own = 0;

    export let id;


    let isLoading;
    let allJobsLoaded = false;
    let page = 2;

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
    <div class="clicker" on:click={() => current.set(job)}>
        <FeedJob job={job} id={id}/>
    </div>
{/each}
<style>

</style>