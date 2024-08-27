onMount(async () => {
    const response = await fetch(`/api/workexp?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    if(response.ok) {
        workExperience = await response.json();
        console.log('Successfully fetched work experience')
        
    } else {
        console.log('ITS A BOMB');
    }
})