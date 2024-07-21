
<script>
    export let className = "";
</script>

<div class={`container ${className}`}>
    <slot></slot>
</div>

<style>
    @media (min-width: 1200px){
        .container {
            max-width: 1200px;
            margin:0 auto;
            background-color:rgb(225,225,225);
        }
    }
    @media (max-width:1199px) {

    }
    
    @media (max-width: 1000px) {

    }

    @media (max-width: 760px) {

    }

    @media (max-width:480px) {

    }
</style>