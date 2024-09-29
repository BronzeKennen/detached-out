<script> 

    export let data;
    const users = data.allUsers;
    const jsonToXml = (json) => {
        let xml = '<users>';
        json.forEach(user => {
            xml += '<user>';
            xml += convertToXml(user)
            xml += '</user>';
        });
        xml += '</users>';
        return xml;
    };

    const convertToXml = (obj) => {
    let xml = '';
    for (const key in obj) {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            xml += `<${key}>${convertToXml(obj[key])}</${key}>`;
        } else if (Array.isArray(obj[key])) {
            xml += `<${key}>`;
            obj[key].forEach(item => {
                xml += `<item>${convertToXml(item)}</item>`;
            });
            xml += `</${key}>`;
        } else {
            xml += `<${key}>${obj[key]}</${key}>`;
        }
    }
    return xml;
};

    const jsonExport = () => {
        const userString = JSON.stringify(users);

        const blob = new Blob([userString], {type: 'application/json'});

        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'All-Users.json'
        a.click();

        URL.revokeObjectURL(url);

    }

    const exportUser = (id) => {
        const userString = JSON.stringify(users[id])
        const blob = new Blob([userString], {type: 'application/json'});

        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${users[id].username}.json`
        a.click();
        
        URL.revokeObjectURL(url);
        
    }

    const xmlExport = () => {
        const xmlString = jsonToXml(users);
          const blob = new Blob([xmlString], { type: 'application/xml' });

        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'All-Users.xml';
        a.click();

        URL.revokeObjectURL(url);
    }

    const exportUserXml = (id) => {
         const xmlString = jsonToXml([users[id]]);
          const blob = new Blob([xmlString], { type: 'application/xml' });

        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${users[id].username}.xml`
        a.click();

        URL.revokeObjectURL(url);

    }
</script> 

<div class="header">
    <h2>Welcome to the shittiest admin page of all time!</h2>
    <h3>You can do bunch of bs like...</h3>
    <div class="buttons head-buttons">
        <button on:click={jsonExport}>EXPORT ALL USERS IN JSON</button>
        <button on:click={xmlExport}>EXPORT ALL USERS IN XML</button>

    </div>
</div>
<div class="user-grid">
{#each users as user}
    <div class="user-block">
        <h4>Basic info</h4>
        <div class="id">
            <span style="color:red">UserID</span>
            <span>{user.UserId}</span>
        </div>
        <div class="username">
            <span style="color:red">Username </span>
            <span>{user.username}</span>
        </div>
        <div class="full-name">
            <span style="color:red">Full Name</span>
            <span>{user.fname} {user.lname}</span>
        </div>
         <!-- Remember to add profile pic somewhere or the profile icon component -->
        <div class="origin">
        <span style="color:red">Origin</span>
        <span>{user.state} {user.country_of_residence}</span>
        </div>
            <div class="company">
                <span style="color:red">Current Company</span>
                {#if user.current_company}
                    <span>{user.current_company.company_name}</span>
                {:else}
                    <span>null</span>
                {/if}
            </div>

        <div class="job-title">
            <span style="color:red">job title</span>
        {#if user.job_title}
            <span>{user.job_title.JobTitle}</span>
        {:else}
            <span>null</span>
        {/if}
        </div>

        <div class="university">
            <span style="color:red">Education</span>
            {#if user.university}
                <span>{user.university.university_name}</span>
            {:else}
                <span>null</span>
            {/if}
        </div>
        <p>Joined in {user.date_created}</p>
        <a href="pages/profile/{user.UserId}">Profile Page</a>
        <div class="buttons">
            <button class="export" on:click={() => {exportUser(user.UserId)}}>Export in JSON</button>
            <button class="export" on:click={() => {exportUserXml(user.UserId)}}>Export in XML</button>
        </div>
    </div>
{/each}
</div>

<style>
.header {
    margin:0 15%;
    padding:1em;
}
.user-grid {
    margin:0 15%;
    display:grid;
    grid-template-columns: repeat(4,1fr);
    gap:10px;
    
}

.head-buttons {
    display:flex;
    flex-direction: row;
}
.user-block {
    background-color:antiquewhite;
    width:100%;
    min-height:200px;
    margin:1rem;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.user-block div {
    width:100%;
    display:flex;
    margin:.2rem;
    flex-direction: row;
    justify-content: space-between;
}

.buttons button{
    margin:.2rem .5rem;
    background-color: aquamarine;
    border-radius:7px;
    padding: 0.5em;
    width:100%;
}
</style>