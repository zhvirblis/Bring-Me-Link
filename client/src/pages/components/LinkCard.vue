<template>
    <div class="card">
        <h2><a :href="link"  target="_blank"> 
            {{name}}
        </a></h2>
        <a :href="link" target="_blank">
            {{link}}
        </a>
    </div>
</template>
<script>
export default {
    props: ['name', 'link']
}
</script>
<style>
    .card {
        max-width: 760px;
        margin: 25px auto;
        padding: 20px;
        border: 1px solid #AAAAAA;
        border-radius: 10px;
    }
    .card a {
        color: #000;
    }
    .card h2 a {
        text-decoration: none;
    }
</style>


