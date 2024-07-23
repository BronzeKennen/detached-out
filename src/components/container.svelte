
<script>
    export let className = "";
</script>

<div class={`container ${className}`}>
    <slot></slot>
</div>

<style>
        .container {
            max-width: 1200px;
            margin:auto;
            /* padding:1em; */
            background-color:rgba(255, 239, 239, 0.75);
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