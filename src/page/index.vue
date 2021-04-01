<template>
    <div>
        <!-- <page/> -->
        <home/>
        <navigate />
    </div>
</template>

<script>
import navigate from '../components/footer/navigate.vue'
import page from './page/page.vue'
import home from './home/home.vue'

export default {
    components:{
        home,
        // page,
        navigate
    }
}
</script>
<style>

</style>


