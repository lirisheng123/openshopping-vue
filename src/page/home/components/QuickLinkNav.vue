<template>
  <div class="quick-nav-box">
    <nav class="quick-link-nav">
      <div class="quick-link-item" v-for="item in data" :key="item.id">
         
         <!-- <router-link  :to="{path:'/category?categoryId='+item.value}"> -->

                      <!-- <router-link to="/search?keyword=null&categoryId="> -->
                        <!-- <img :src="item.icon">
                        <span>{{item.label}}</span>
                      </router-link> -->
        <span class="quick-box">
          <router-link  :to="{path:'/category?categoryId='+item.value}">
          <img :src="item.icon" />
          </router-link> 
          <span class="ellipsis">{{ item.label }}</span>
        </span> 
      </div>
    </nav>
  </div>
</template>

<script >

export default {
    name:"quickLinkNav",
    props: {
        data:{
        type: Array,
        default: () => []
        }
    },
    data(){  
        return{
            topheight:0,
            page:{},
           
            banners:null,
            quicknavlist:null,
            customs:null,
            goodslist:null
        }
    },
    created(){
           
    },
    methods:{
        settopheight:function(value){
            this.topheight=value;
        }
    }
};
//  lang="scss" 
//@at-root
</script>



<style  lang="less" scoped>

.quick-nav-box {
  position: relative;
  overflow: hidden;
  z-index: 1000;
  width: 100%;
  height: 100%;

  .quick-link-nav {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    padding: 10px 10px;

    .quick-link-item {
      width: 80px;
      margin-top: 10px;
      text-align: center;
    }

    .quick-box {
      display: block;

      img {
        width: 50px;
        height: 50px;
      }

      span {
        display: block;
        line-height: 20px;
        font-size: 12px;
        color: rgb(102, 102, 102);
      }
    }
  }
}

//  .quick-link-nav {
//     display: flex;
//     flex-wrap: wrap;
//     overflow: hidden;
//     padding: 10px 10px;

//     .quick-link-item {
//       width: 146px;
//       margin-top: 10px;
//       text-align: center;
//     }

//     .quick-box {
//       display: block;

//       img {
//         width: 80px;
//         height: 80px;
//       }

//       span {
//         display: block;
//         line-height: 38px;
//         font-size: 24px;
//         color: rgb(102, 102, 102);
//       }
//     }
//   }




</style>
