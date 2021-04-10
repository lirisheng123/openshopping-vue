<template>
  <div id="app">
    <!-- <router-view/> -->
    <!--需要缓存组件-->
        <keep-alive>
            <!--router-view组件是一个 functional 组件，渲染路径匹配到的视图组件-->
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <!--不需要缓存组件-->
        <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import './assets/style/common.css';

export default {
  name: 'app'
}
</script>


