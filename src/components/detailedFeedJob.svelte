
<script>
    import ProfileIcon from "./profileIcon.svelte";

    export let job;
    $: poster = job.Poster

</script>

<div class="detailed-job">
<ProfileIcon id={poster.UserId} user={poster.username} pfp={poster.profile_pic_url} edu={poster.university}/>
<div class="details">
<h2>{job.JobTitle}</h2>
<div class="spaced">
    <p>{job.EnrollmentType}  </p>
    <p>•</p>
    <p>{job.WorkplaceType}</p>
    <p>•</p>
    <p>{job.Location}</p>
</div>

<div class="spaced">
<p>Salary  •  {job.MonthlyWage}$ / Month</p>
</div>
<div class="buttons">
    <button class="apply">Apply</button>
    <button class="message">Message</button>
</div>
<div class="description">
    <h2>About the job</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error excepturi exercitationem quaerat, animi voluptates sunt fugit nihil quas fuga veniam amet officiis minima odit. Distinctio iusto tempore rem veritatis magnam delectus, doloribus sed animi perspiciatis adipisci ut, voluptatibus praesentium ab repellat at. Repudiandae ea id earum, animi corrupti repellendus excepturi, quibusdam officiis aut illo, rem saepe quo blanditiis enim quas voluptatibus est voluptates? Voluptatum nostrum enim fugit? Blanditiis corrupti veritatis vero, vitae doloremque, nihil, dolores ullam debitis perspiciatis enim optio. Dolor ad, modi aliquam asperiores eum dolores enim, assumenda praesentium tenetur, harum odio fuga. Ullam laboriosam dolorum rem voluptates ea. Doloremque nam pariatur iusto accusamus inventore nulla dolorum possimus incidunt. Officia, suscipit quia. Expedita, eum? Eveniet ex fuga aliquid est voluptas. Error distinctio exercitationem, tempora unde dignissimos quis necessitatibus? Reiciendis molestias laudantium alias quis iste iusto veniam placeat natus. Quasi ad odit totam accusamus cupiditate quam accusantium magni sint expedita molestias? Excepturi ut voluptates animi aut, aliquid laboriosam a impedit neque aperiam veniam quo perspiciatis sint quam reprehenderit inventore corporis eius cumque obcaecati fugiat similique mollitia repellendus pariatur. Aperiam dicta exercitationem blanditiis quod sed error deleniti voluptatibus cupiditate esse dolore dolorem, ducimus laudantium magnam nobis dolorum reiciendis! Similique eos excepturi ea nisi accusantium porro accusamus rem qui, libero blanditiis error sunt quo dolorem eius autem iusto veniam quam expedita modi suscipit, harum alias quidem necessitatibus? Nobis repellat, molestiae officiis voluptatibus sit vel deserunt quaerat corporis expedita vero earum est accusantium praesentium voluptas nihil recusandae alias cupiditate illum perferendis ducimus voluptate. Rerum quasi officia facilis, facere consequatur debitis quae fugiat vitae velit tempora dolor neque minima qui itaque consequuntur incidunt repellendus omnis dolorem perferendis dolores voluptatem! Perspiciatis soluta tempora deserunt excepturi cum ullam. Quam expedita adipisci neque totam corporis delectus at repudiandae temporibus placeat sit, illum consectetur dolore deserunt nemo recusandae consequuntur soluta ad modi? Voluptate nesciunt accusantium asperiores tempore saepe, rerum magni fugit voluptatibus molestias temporibus delectus commodi laboriosam sapiente molestiae accusamus eius, repudiandae repellendus in recusandae atque non eos? Commodi soluta quos laudantium perspiciatis qui quis voluptates, cum beatae nostrum quam incidunt vitae sapiente, similique exercitationem velit! Nostrum qui repudiandae eius eveniet, laboriosam sequi quas ex reiciendis vitae eligendi animi ea ab libero quisquam, saepe, inventore corrupti nam magnam. In, tempore voluptate. Vero asperiores blanditiis ex, eius labore optio. Odio excepturi, tempore ad quo veritatis alias maiores illo mollitia? Doloribus ad voluptatibus aut quidem delectus maiores dolorem sit ducimus, earum necessitatibus dolor possimus reprehenderit provident. Veritatis consectetur iste nisi, omnis laboriosam est aliquam voluptas cupiditate assumenda quasi sequi reiciendis. Quae blanditiis quisquam a voluptates dicta architecto molestias magni voluptatem corrupti neque exercitationem consequuntur adipisci, animi facere assumenda incidunt iusto pariatur perferendis eum. Et dolor eveniet dicta, vitae, iste labore veniam laboriosam ea quisquam veritatis, qui ullam sequi neque illo. Labore tenetur voluptates accusantium voluptatibus fugit laborum architecto, maiores, fugiat ea laudantium obcaecati temporibus cum, necessitatibus ad est. Laboriosam corporis tempora soluta amet doloremque! Explicabo accusamus sed reprehenderit. Quisquam eaque porro illo, harum eum sequi ut voluptatum culpa obcaecati debitis.</p>
    <p>{job.JobDesciption}</p>
</div>
</div>
</div>
<style>

.description {
    margin-top:1.5em;
    overflow-x:hidden;
}

.detailed-job {
    padding:.6rem;
    width:100%;
    min-height:91dvh;
    border-radius:10px;
    background-color:white;
    overflow:scroll;
}

.buttons {
    width:65%;
    margin-top:.8em;
    display:flex;
}
.buttons button {
    margin:0 .5em 0 0;
    width:40%;
    height:35px;
    border:none;
    border-radius:25px;
}

.apply {
    box-shadow:0 2px 5px rgb(185, 50, 238);
    background-color: #a266ad; 
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    height: 1.5rem;
    box-sizing: border-box;
    position: relative;
    width:20%;
    margin:0 .2rem 0 80%;
}

.apply:hover {
    background-color: #9145a0; 
    cursor: pointer;
    box-shadow:0 2px 10px rgb(185, 50, 238);
    transition-duration: .25s; 
}

.details {
    padding:.7rem;
}

.details h2 {
    margin:.5em 0;
}
.details p {
    opacity:70%;
    padding:.2rem 0;
}
.spaced {
    margin-top:.3em;
    width:55%;
    display:flex;
    justify-content: space-between;
}
</style>

