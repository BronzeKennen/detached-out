
<script>
    import { onMount ,onDestroy} from "svelte";
    import FeedJob from "./feedJob.svelte";

    let jobs = []
    export let profile;

    let isLoading;
    let allJobsLoaded = false;
    let page = 1;

    async function fetchPosts() {
        const resp = await fetch(`/api/jobs?page=${page}&limit=5&own=1&id=${profile.UserId}`,{
            method:'GET'
        })
        if(resp.ok) {
            const data = await resp.json();
            if(data.jobs.length > 0) {
                for(const newJob of data.jobs) {
                    jobs = [...jobs,newJob]
    
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
{#each jobs as job}
    <FeedJob job={job}/>
{/each}
<style>

</style>