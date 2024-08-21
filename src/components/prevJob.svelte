<script>
    let isPrivate = false;

    function toggleLock() {
        isPrivate = !isPrivate;
    }
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
            <input type="date" id="start" value="2018-07-22" min="1970-01-01" max="2024-12-31" />
        </div>
        <div class="dateAndLabel">
            <label for="date">To:</label>
            <input type="date" id="end" value="2018-07-22" min="1970-01-01" max="2024-12-31" />
        </div>
    </div>
    <div class="buttonsContainer">
        <div class="icon">
            <button  class="private" on:click={toggleLock}>
                <i id="locket" class={`fa-solid ${isPrivate ? 'fa-lock' : 'fa-lock-open'}`}></i>
            </button>   
        </div>
        <div class="icon">
            <i id="x" class="fa-solid fa-xmark"></i>
        </div>
    </div>
</div>