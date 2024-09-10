<script>
    import PrevJob from "./prevJob.svelte";
    import { onMount } from "svelte";
    import SoftSkillsEdit from "./softSkillsEdit.svelte";
    import FeedPost from "./feedPost.svelte";
    import FeedJob from "./feedJob.svelte";

    export let profile;

    //if someone hasn't set these, set a dummy object!
    if (profile.current_company === null)
        profile.current_company = { CompanyId: null, company_name: "" };
    if (profile.job_title === null)
        profile.job_title = { JobTitleId: null, JobTitle: "" };
    if (profile.university === null)
        profile.university = {
            UniversityId: null,
            university_name: "",
            major: "",
        };

    //copy of the profile to refer to any changes made
    let originalProfile = profile;

    // ...
    let firstName = profile.fname;
    let lastName = profile.lname;
    let currJobTitle = profile.job_title.JobTitle;
    let currCompany = profile.current_company.company_name;
    let country = profile.country_of_residence;
    let state = profile.state;
    let bio = profile.biography;
    let id = profile.UserId;
    let friends = profile.friends;
    // format mm-dd-yyyy
    let birthday = profile.date_of_birth;
    //for future reference
    let uni = profile.university.university_name;
    let major = profile.university.major;
    let eduFrom = profile.university.StartDate;
    let eduTo = profile.university.EndDate;
    let pfp = profile.profile_pic_url

    let softSkills = [];
    for(const skill of profile.skills) {
        softSkills = [...softSkills, skill.name.SkillName]
    }

    //reactive variables to spawn save/reset buttons
    $: changedMand =
        lastName !== originalProfile.lname ||
        firstName !== originalProfile.fname ||
        country !== originalProfile.country_of_residence ||
        state !== originalProfile.state ||
        birthday !== originalProfile.date_of_birth ||
        bio !== originalProfile.biography;

    $: changedEmp =
        currCompany !== originalProfile.current_company.company_name ||
        currJobTitle !== originalProfile.job_title.JobTitle;

    //Both fields are required
    $: changedUni =
        (uni !== originalProfile.university.university_name ||
            major !== originalProfile.university.major ||
            eduFrom !== originalProfile.university.StartDate ||
            eduTo !== originalProfile.university.EndDate) &&
        uni &&
        major &&
        eduFrom;

    $: changedExperience = false;
    let workExperience;
    onMount(async () => {
        const response = await fetch(`/api/workexp?id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            workExperience = await response.json();
            console.log("Successfully fetched work experience");
        } else {
            console.log("ITS A BOMB");
        }
    });

    function autoResize(event) {
        const textarea = event.target;
        textarea.style.height = "auto";

        if (textarea.scrollHeight < 40) {
            textarea.style.height = `2rem`;
        } else {
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }

    async function handleFileUpload(e) {
        let imageUrl,uploadError;
        let imagepfp = e.target.files[0];

        const formData = new FormData()
        formData.append('image',imagepfp)
        const resp = await fetch("/api/upload", {
            method: "POST",
            body: formData
        });

        const result = await resp.json();
        if(resp.ok) {
            pfp = result.url
        } else {
            uploadError = result.error || 'upload failed'            
        } 
    }

    function newJob() {
        let newJob = {
            CompanyId: "",
            JobTitleId: "",
            StartDate: "",
            EndDate: "",
            Private: false,
        };
        workExperience.body = [...workExperience.body, newJob];
        changedExperience = true;
    }

    const resetFields = (type) => {
        switch (type) {
            case "mand":
                firstName = profile.fname;
                lastName = profile.lname;
                country = profile.country_of_residence;
                state = profile.state;
                birthday = profile.date_of_birth;
                bio = profile.biography;
                break;
            case "uni":
                uni = profile.university.university_name;
                major = profile.university.major;
                eduFrom = profile.university.StartDate;
                eduTo = profile.university.EndDate;
                break;
            case "work": //work
                currJobTitle = profile.job_title.JobTitle;
                currCompany = profile.current_company.company_name;
                break;
        }
    };

    const saveChanges = async (type) => {
        let body;
        if (type === "mand") {
            body = {
                UserId: id,
                fname: firstName,
                lname: lastName,
                country_of_residence: country,
                state: state,
                date_of_birth: birthday,
                biography: bio,
            };
        } else if (type === "uni") {
            body = {
                UserId: id,
                university_name: uni,
                major: major,
                from: eduFrom,
                to: eduTo,
            };
        } else {
            //work
            body = {
                UserId: id,
                current_company: currCompany,
                job_title: currJobTitle,
            };
        }
        const response = await fetch("/api/users", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (response.ok) {
            switch (type) {
                case "mand":
                    originalProfile.fname = firstName;
                    originalProfile.lname = lastName;
                    originalProfile.country_of_residence = country;
                    originalProfile.state = state;
                    originalProfile.date_of_birth = birthday;
                    originalProfile.biography = bio;
                    break;
                case "uni":
                    originalProfile.university.university_name = uni;
                    originalProfile.university.major = major;
                    originalProfile.university.StartDate = eduFrom;
                    originalProfile.university.EndDate = eduTo;
                    break;
                case "work":
                    originalProfile.current_company.company_name = currCompany;
                    originalProfile.job_title.JobTitle = currJobTitle;
                    break;
            }
            console.log("success");
        } else {
            console.log("An error has occured");
        }
    };
</script>

<div class="top-profile">
    <div class="background"></div>
    {#if pfp}
    <div class="pfp" style={`background-image: url('${pfp}');`}>
        <div class="pfphover">
            <input type="file" id="uploadButton" on:change={handleFileUpload} />
            <label for="uploadButton" id="uploadLabel"></label>
            <h4>Change Profile Picture</h4>
        </div>
    </div>
    {:else}
        <div class="pfp" >
            <div class="pfphover">
                <input type="file" id="uploadButton" on:change={handleFileUpload} />
                <label for="uploadButton" id="uploadLabel"></label>
                <h4>Change Profile Picture</h4>
            </div>
        </div>
    {/if}
    <div class="nameJob">
        <div class="name">{firstName} {lastName}</div>
        {#if currCompany}
            <div class="companyAndTitle">
                {currCompany}, {#if currJobTitle}
                    {currJobTitle}
                {/if}
            </div>
        {/if}
    </div>
</div>
<div class="details">
    <div class="fieldTitle">Personal Information</div>
    <div class="mandFields">
        <div class="fieldContainer">
            <div id="labelField">First Name</div>
            <textarea
                id="textField"
                type="text"
                bind:value={firstName}
                maxlength="16"
                minlength="3"
                on:blur={(e) => {
                    if (e.target.value.length > 3) {
                        firstName = e.target.value;
                    } else {
                        e.target.value = "";
                    }
                }}
            />
        </div>
        <div class="fieldContainer">
            <div id="labelField">Last Name</div>
            <textarea
                id="textField"
                type="text"
                maxlength="30"
                minlength="3"
                bind:value={lastName}
                on:blur={(e) => {
                    if (e.target.value.length > 3) {
                        lastName = e.target.value;
                    } else {
                        e.target.value = "";
                    }
                }}
            />
        </div>
    </div>
    <div class="mandFields">
        <div class="fieldContainer">
            <div id="labelField">Country</div>
            <textarea
                id="textField"
                type="text"
                bind:value={country}
                maxlength="16"
                minlength="3"
                on:blur={(e) => {
                    if (e.target.value.length > 3) {
                        country = e.target.value;
                    } else {
                        e.target.value = "";
                    }
                }}
            />
        </div>
        <div class="fieldContainer">
            <div id="labelField">State</div>
            <textarea
                id="textField"
                type="text"
                maxlength="30"
                minlength="3"
                bind:value={state}
                on:blur={(e) => {
                    if (e.target.value.length > 3) {
                        state = e.target.value;
                    } else {
                        e.target.value = "";
                    }
                }}
            />
        </div>
    </div>
    <div class="dateOfBirth">
        <div class="fieldContainer">
            <div id="labelField">Date of Birth</div>
            <input
                type="date"
                id="birthday"
                bind:value={birthday}
                min="1950-01-01"
                max="2007-01-01"
            />
        </div>
    </div>
    <div class="mandFields">
        <div class="fieldContainer">
            <div id="labelField">Bio</div>
            <textarea
                placeholder={bio}
                id="textField"
                type="text"
                bind:value={bio}
                on:input={autoResize}
                minlength="0"
            />
        </div>
    </div>
    <div class="mandFields">
        <div class="fieldContainer">
            <div id="labelField" style="width: 100%;">Skills</div>
            <SoftSkillsEdit currSkills={softSkills}/>
        </div>
    </div>
    {#if changedMand}
        <div class="change-buttons">
            <button class="save-button" on:click={() => saveChanges("mand")}
                >Save Changes</button
            >
            <button class="save-button" on:click={() => resetFields("mand")}
                >Reset</button
            >
        </div>
    {/if}
    <div class="separator"></div>
    <div class="fieldTitle">Education</div>
    <div class="mandFields">
        <div class="fieldContainer">
            <div id="labelField">Univeristy/College</div>
            <textarea
                id="textField"
                placeholder="University Name"
                type="text"
                bind:value={uni}
                maxlength="16"
                minlength="3"
                on:blur={(e) => {
                    if (e.target.value.length > 3) {
                        uni = e.target.value;
                    } else {
                        e.target.value = "";
                    }
                }}
            />
        </div>
        <div class="fieldContainer">
            <div id="labelField">Major</div>
            <textarea
                id="textField"
                placeholder="Major Name"
                type="text"
                maxlength="30"
                minlength="3"
                bind:value={major}
                on:blur={(e) => {
                    if (e.target.value.length > 3) {
                        major = e.target.value;
                    } else {
                        e.target.value = "";
                    }
                }}
            />
        </div>
    </div>

    <div class="mandFields">
        <div class="fieldContainer">
            <label for="date" id="labelField">From:</label>
            <input
                type="month"
                id="birthday"
                bind:value={eduFrom}
                min="1970-01-01"
                max="2024-12-31"
            />
        </div>
        <div class="fieldContainer">
            <label for="date" id="labelField">To:</label>
            <input
                type="month"
                id="birthday"
                bind:value={eduTo}
                min="1970-01-01"
                max="2024-12-31"
            />
        </div>
    </div>
    {#if changedUni}
        <div class="change-buttons">
            <button class="save-button" on:click={() => saveChanges("uni")}
                >Save Changes</button
            >
            <button class="save-button" on:click={() => resetFields("uni")}
                >Reset</button
            >
        </div>
    {/if}
    <div class="separator"></div>
    <div class="fieldTitle">Employment Information</div>
    <div class="mandFields">
        <div class="fieldContainer">
            <div id="labelField">Current Employer</div>
            <textarea
                id="textField"
                type="text"
                placeholder="Company you currently work in"
                bind:value={currCompany}
                maxlength="16"
                minlength="3"
                on:blur={(e) => {
                    if (e.target.value.length > 3) {
                        currCompany = e.target.value;
                    } else {
                        e.target.value = "";
                    }
                }}
            />
        </div>
        <div class="fieldContainer">
            <div id="labelField">Job Title</div>
            <textarea
                id="textField"
                type="text"
                placeholder="Job title of company you currently work in"
                maxlength="30"
                minlength="3"
                bind:value={currJobTitle}
                on:blur={(e) => {
                    if (e.target.value.length > 3) {
                        currJobTitle = e.target.value;
                    } else {
                        e.target.value = "";
                    }
                }}
            />
        </div>
    </div>
    {#if changedEmp}
        <div class="change-buttons">
            <button class="save-button" on:click={() => saveChanges("work")}
                >Save Changes</button
            >
            <button class="save-button" on:click={() => resetFields("work")}
                >Reset</button
            >
        </div>
    {/if}
    <div class="separator"></div>
    <div class="fieldTitle">Work Experience</div>
    <button class="addPrevJob" on:click={newJob}
        ><i class="fa-solid fa-plus" id="new"></i></button
    >
    {#if workExperience}
        {#each workExperience.body as exJob}
            <PrevJob
                employer={exJob.CompanyId}
                JobTitle={exJob.JobTitleId}
                from={exJob.StartDate}
                to={exJob.EndDate}
                UserId={id}
                privacyOn={exJob.Private}
                expId={exJob.ExperienceId}
            />
        {/each}
    {/if}
    <div class="posts-jobs">
        <div class="posts">
            <h1>Your posts </h1>
            {#each profile.posts as post} 
            <span class="post">
                <FeedPost
                    user={profile}
                    userId={profile.UserId}
                    postId={post.PostId}
                    poster={profile}
                    likes={post.Likes}
                    comments={post.Comments}
                    reposts={post.RepostCount}
                    images={post.ImagesJson}
                    content={post.Content}
                    created={post.CreatedAt}
                />
            </span>
            {/each}
        </div>
        <div class="jobs">
            <h1>Your job adverts</h1>
            {#each profile.jobs as job}
                <FeedJob job={job}/>
            {/each}
        </div>
    </div>
</div>

<style>
    .posts-jobs {
        display:flex;
    }
    .posts,.jobs{
        display:flex;
        flex-direction: column;
        align-items: center;
        flex:1;
    }
    .jobs {
        height:100%;
    }
    .posts span {
        width:100%;
    }
    .posts h1,.jobs h1 {
        margin:2% 0;
    }
    .top-profile {
        margin: 0.5rem;
        border-radius: 10%;
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: start;
    }

    .background {
        border-radius: 25px;
        height: 45vh;
        background-color: beige;
        width: 100%;
        position: relative;
    }

    #uploadButton {
        display: none;
    }

    #uploadLabel {
        width: 100%;
        height: 100%;
        position: absolute;
        border-radius: 50%;
        cursor: pointer;
    }
    .pfp {
        height: 40vh;
        width: 40vh;
        border-radius: 50%;
        border: 3px white solid;
        background-color: aqua;
        background-size:cover;
        background-position:center;
        background-repeat:no-repeat;
        position: relative;
        transform: translate(+25%, -50%);
    }
    .pfphover {
        background-color: black;
        height: 39vh;
        width: 39vh;
        border-radius: 50%;
        border: 3px white solid;
        position: relative;
        opacity: 0%;
        margin: 1.6px 1.7px;
    }
    .pfphover h4 {
        color: white;
        opacity: 100%;
        margin-top: 47%;
        margin-left: 27%;
        position: absolute;
        top: 50;
        left: 50;
    }
    .pfphover:hover {
        transition-duration: 0.35s;
        cursor: pointer;
        opacity: 60%;
    }

    .nameJob {
        padding-left: 25vh;
        height: 20vh;
        display: flex;
        flex-direction: column;
    }

    .name {
        margin-top: 5%;
        text-align: left;
        font-size: x-large;
        font-weight: bold;
    }

    .companyAndTitle {
        font-size: larger;
        text-align: left;
    }

    .fieldTitle {
        font-weight: bolder;
        font-size: xx-large;
        margin-bottom: 1rem;
    }

    .mandFields {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 2rem;
        margin-bottom: 2rem;
    }

    .dateOfBirth {
        width: 50%;
        display: flex;
        margin-bottom: 2rem;
    }

    .change-buttons {
        display: flex;
        justify-content: flex-end;
        width: 100%;
    }
    .change-buttons button {
        margin: 0.2rem;
        margin-top: -1.3rem;
        width: 15%;
        border-radius: 5px;
        border: none;
        box-shadow: 0px 0px 6px rgb(127, 111, 219);
        background-color: rgb(193, 176, 221);
    }

    .change-buttons button:hover,
    .addPrevJob:hover {
        transition-duration: 0.2s;
        box-shadow: 0px 0px 12px rgb(127, 111, 219);
    }

    .fieldContainer {
        height: auto;
        width: auto;
        flex: 1;
        display: flex;
        position: relative;
        flex-direction: column;
    }

    #labelField {
        font-size: smaller;
        margin-bottom: 0.25rem;
        font-weight: bold;
    }

    #birthday {
        margin-right: 1rem;
        height: 2rem;
        border: none;
        border-radius: 10px;
        box-sizing: border-box;
        background-color: white;
        display: flex;
        position: relative;
        resize: none;
        padding: 0.5rem;
        padding-left: 0.5;
        text-align: start;
    }

    #textField {
        height: 2rem;
        border: none;
        border-radius: 10px;
        box-sizing: border-box;
        background-color: white;
        display: flex;
        position: relative;
        resize: none;
        padding: 0.5rem;
        padding-left: 0.5;
        text-align: start;
    }

    #textField:focus,
    #birthday:focus {
        outline: none;
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
    }

    #textField:hover,
    #birthday:hover {
        animation-duration: 0.5s;
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
    }

    .separator {
        border: none;
        border-top: 1px solid #ccc;
        margin: 3% 0;
        min-width: 100%;
    }

    .addPrevJob {
        border: none;
        position: relative;
        display: flex;
        align-items: center;
        width: 2.5rem;
        aspect-ratio: 1/1;
        box-shadow: 0px 0px 6px rgb(127, 111, 219);
        background-color: rgb(193, 176, 221);
        border-radius: 50%;
        margin: auto;
        margin-bottom: 1rem;
    }

    .addPrevJob:hover {
        cursor: pointer;
    }

    #new {
        color: rgb(127, 111, 219);
        margin: auto;
    }

    .details {
        position: relative;
        transform: translateY(-15vh);
        padding-left: 1rem;
        padding-right: 1rem;
    }

    @media (max-width: 950px) {
        .background {
            height: 35vh;
        }

        .pfp {
            transform: translate(-50%, -50%);
            left: 50%;
            height: 30vh;
            width: 30vh;
        }
        .pfphover {
            height: 29vh;
            width: 29vh;
        }
        .pfphover h4 {
            margin-left: 17%;
        }

        .nameJob {
            position: inherit;
            width: 100%;
            top: -15vh;
            margin-left: auto;
            margin-right: auto;
            padding-left: 0;
            height: 7.5vh;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .name {
            font-size: large;
        }

        .companyAndTitle {
            font-size: medium;
        }

        .details {
            top: 10vh;
            padding-left: 1rem;
            padding-right: 1rem;
        }
    }

    @media (max-width: 600px) {
        .background {
            height: 20vh;
        }

        .pfp {
            left: 50%;
            height: 20vh;
            width: 20vh;
            transform: translate(-50%, -50%);
        }
        .pfphover {
            width: 19vh;
            height: 19vh;
        }
        .pfphover h4 {
            font-size: 12px;
            margin-left: 12%;
            margin-top: 45%;
        }

        .nameJob {
            position: inherit;
            width: 100%;
            top: -10vh;
            margin-left: auto;
            margin-right: auto;
            padding-left: 0;
            height: 7.5vh;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .name {
            font-size: large;
        }

        .companyAndTitle {
            font-size: medium;
        }

        .details {
            top: 10vh;
        }

        .fieldTitle {
            font-size: large;
        }

        #labelField {
            font-size: x-small;
        }

        .mandFields {
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 1rem;
        }

        #textField {
            margin-bottom: 0;
        }

        .change-buttons {
            margin-top: 1rem;
            display: flex;
            justify-content: center;
            width: 100%;
        }

        .change-buttons button {
            width: 25%;
            font-size: x-small;
        }
    }
</style>
