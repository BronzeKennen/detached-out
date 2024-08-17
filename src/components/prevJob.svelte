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
    }

    .private {
        border: none;
        background: none;
    }

    .icon {
        align-items: center;
        display: flex;
        width: 2%;
    }

    #locket, #x {
        cursor: pointer;
    }
</style>



<div class="employmentField">
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
    <label for="date">From:</label>
    <input type="date" id="start" value="2018-07-22" min="1970-01-01" max="2024-12-31" />
    <label for="date">To:</label>
    <input type="date" id="end" value="2018-07-22" min="1970-01-01" max="2024-12-31" />
    <div class="icon">
        <button  class="private" on:click={toggleLock}>
            <i id="locket" class={`fa-solid ${isPrivate ? 'fa-lock' : 'fa-lock-open'}`}></i>
        </button>   
    </div>
    <div class="icon">
        <i id="x" class="fa-solid fa-xmark"></i>
    </div>
</div>