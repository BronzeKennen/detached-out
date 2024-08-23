<script>
    import PeopleCol from "../../../components/peopleCol.svelte";
</script>

<style>
    .feed {
        display:flex;
        flex-direction: row;
        gap: 1rem;
    }

    .selectedChat {
        flex: 1;
        background-color: rgb(250, 240, 255);
        height: 90vh;
        border-radius: 10px;
    }

    .userInfo {
        display: flex;
        flex-direction: row;
        padding: 1rem;
        height: 15%;
        align-items: center;
    }

    #pfp {
        margin-top:.5rem;
        margin-right: .5rem;
        min-width:100px;
        min-height:100px;
        background-color:cyan;
        border-radius:50%;
        margin-left: 15%;
    }

    #nameJob {
        padding-left: 2rem;
        display: flex;
        flex-direction: column;
    }

    #name {
        font-size: xx-large;
        font-weight: bolder;
    }
    
    #name {
        font-size: x-large;
        font-weight: bold;
    }

    .seperator {
        border:none;
        border-top:1px solid #ccc;
        margin:1% 0;
        width:95%;
        margin-left: auto;
        margin-right: auto;
    }
</style>

<div class="feed">
    <PeopleCol />
    <div class="selectedChat">
        <div class="userInfo">
            <div id="pfp"></div>
            <div id="nameJob">
                <div id="name">Kyrios Xoirinos</div>
                <div id="job">Chief Kreopwlhs</div>
            </div>
        </div>
        <div class="seperator"></div>


    </div>
</div>
