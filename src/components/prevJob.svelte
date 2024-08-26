<script>

    let isPrivate = false;
    export let employer;
    export let JobTitle;
    export let from;
    export let to;
    export let UserId;
    export let privacyOn;
    export let expId;

    let ogEmployer = employer;
    let ogJobTitle = JobTitle;
    let ogfrom = from;
    let ogto = to;
    let ogPrivacyOn = privacyOn;
    let id = UserId;

    let newExp = false;
    if (employer === '' && JobTitle === '' && from === '' && to === '') {
        newExp = true;

    }


    $: changed = 
        (ogEmployer !== employer
        || ogJobTitle !== JobTitle
        || ogfrom !== from
        || ogto !== to
        || ogPrivacyOn !== privacyOn) &&
        (employer !==  ''
        && JobTitle !== ''
        && from !== ''
        && to !== ''
        );

    function toggleLock() {
        privacyOn = !privacyOn;
    }

    const reset = (() => {
        employer = ogEmployer;
        JobTitle = ogJobTitle;
        from = ogfrom;
        to = ogto;
        privacyOn = ogPrivacyOn;
    });

    const saveChanges = (async () => {
        const body = {
            UserId : id,
            employer : employer,
            JobTitle : JobTitle,
            from: from,
            to: to,
            newExp: newExp,
            private : privacyOn,
            expId: expId
        }
        const response = await fetch('/api/users', {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(body)
        })
        if(response.ok) {
            ogEmployer = employer;
            ogJobTitle = JobTitle;
            ogfrom = from;
            ogto = to;
            ogPrivacyOn = privacyOn
            console.log('success')
        } else {
            console.log('An error has occured');
        }

    })
</script>

<style>
    .employmentField {
        display: flex;
        flex-direction: row;
        width: 100%;
        margin-bottom: 0.5rem;
        gap: 1rem;
        align-items: center;
    }

    .jobContainer {
        gap: 1rem;
        width: 62.5%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .dateContainer {
        gap: 1rem;
        width: 30%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .dateAndLabel {
        gap: 0.25rem;
    }

    .buttonsContainer {
        width: 7.5%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }


    .smallSeparator {
        border:none;
        border-top:1px solid #ccc;
        margin:1% 0;
        min-width:100%;
    }
    .change-buttons {
        display:flex;
        justify-content: flex-end;
        width:100%;
    }
    .change-buttons button {
        margin:.2rem;
        margin-top:-1.3rem;
        width:15%;
        border-radius:5px;
        border:none;
        box-shadow: 0px 0px 6px rgb(127, 111, 219);
        background-color: rgb(193, 176, 221) 
    }

    #textField {
        height: 2rem;
        border: none;
        border-radius: 10px;
        box-sizing: border-box;
        background-color: white;
        width: auto;
        flex: 1;
        display: flex;
        position: relative;
        resize: none;
        padding: .5rem;
        padding-left: 0.5;
        text-align: start;
    }

    #textField:focus {
        outline: none;
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
    }

    #textField:hover {
        animation-duration: 0.5s;
        box-shadow: 0px 0px 5px rgba(155, 17, 113, 1.452);
    }

    #start, #end {
        border-radius: 10px;
        border: none;
        height: 2rem;
        width: auto;
    }

    .private {
        border: none;
        background: none;
    }

    .icon {
        align-items: center;
        display: flex;
        width: 50%;
    }

    #locket, #x {
        cursor: pointer;
    }

    @media (max-width: 950px) {

        #textField {
            width: 50%;
        }

        .employmentField {
            flex-direction: column;
        }

        .jobContainer {
            width: 100%;
        }

        .dateContainer {
            width: 100%;
        }

        .buttonsContainer {
            width: 15%;
            align-items: center;
            justify-content: space-between;
        }

        .icon {
            width: auto;
        }

        .dateAndLabel {
            width: 50%;
            gap: 0.5rem;
            display: flex;
        }

        .label {
            width: 5%;
        }

        #start, #end {
            flex: 1;
        }
    }
</style>



<div class="employmentField">
    <div class="jobContainer">
        <textarea
            id="textField"
            type="text" 
            placeholder="Employer"
            bind:value={employer}
            maxlength="30"
            minlength="3"
            on:blur={(e) => {
                if (e.target.value.length > 3) {
                } else {
                    e.target.value = ''; 
                }
            }}  
        />
        <textarea
            id="textField"
            type="text" 
            placeholder="Job title"
            bind:value={JobTitle}
            maxlength="30"
            minlength="3"
            on:blur={(e) => {
                if (e.target.value.length > 3) {
                    
                } else {
                    e.target.value = ''; 
                }
            }}  
        />
    </div>
    <div class="dateContainer">
        <div class="dateAndLabel">
            <label for="date">From:</label>
            <input type="date" id="start" bind:value={from} min="1970-01-01" max="2024-12-31" />
        </div>
        <div class="dateAndLabel">
            <label for="date">To:</label>
            <input type="date" id="end" bind:value={to} min="1970-01-01" max="2024-12-31" />
        </div>
    </div>
    <div class="buttonsContainer">
        <div class="icon">
            <button  class="private" on:click={toggleLock}>
                <i id="locket" class={`fa-solid ${privacyOn ? 'fa-lock' : 'fa-lock-open'}`}></i>
            </button>   
        </div>
        <div class="icon">
            <i id="x" class="fa-solid fa-xmark"></i>
        </div>
    </div>
</div>
<div class="smallSeparator"></div>
{#if changed}
    <div class="change-buttons">
        <button class="save-button" on:click={saveChanges}>Save Changes</button>
        <button class="save-button" on:click={reset}>Reset</button>
    </div>    
{/if}