<template>
   <!-- <div class="block">
      <el-carousel height="150px">
      <el-carousel-item v-for="(item,index) in data" :key="index"> 
        <router-link to="">
           <img :src="item.src" :alt="item.desc" />
        </router-link> 
         <h3 class="small">{{ item }}</h3>
       </el-carousel-item>
       </el-carousel>
    </div> -->
     <swiper :options="swiperOption" ref="bannerSwiper" class="banner-swiper">
    <!-- slides -->
    <swiper-slide v-for="item in data" :key="item.id || item.activityId">
      <router-link
        :to="
          item.isActivity
            ? '/detail/' + item.id
            : '/activity/' + item.activityId
        "
      >
        <img :src="item.src" :alt="item.desc" />
      </router-link>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
     <!-- <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
  </swiper>
</template>

<script >
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
    name:"bannerSwiper",
    components: {  
      swiper,  
      swiperSlide  
    }, 
    props: {
        data:{
        type: Array,
        default: () => []
        }
    },
    data(){  
        return{
            // topheight:0,
            // page:{},
            // banners:null,
            // quicknavlist:null,
            // customs:null,
            // goodslist:null,
            swiperOption: {  
              // notNextTick: true,
              //循环
              loop:true,
              //设定初始化时slide的索引
              // initialSlide:0,
              //自动播放
              autoplay:true,
              // autoplay: {
              //     delay: 3000,
              //     stopOnLastSlide: false,
              //     disableOnInteraction: true,
              // },
              // 设置轮播
              // effect : 'flip',
              //滑动速度
              speed:800,
              //滑动方向
              direction : 'horizontal',
             // 小手掌抓取滑动
              grabCursor : true,
              //滑动之后回调函数
              // on: {
              //     slideChangeTransitionEnd: function(){
              //       // console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
              //     },
              // },
              //左右点击
              navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
              },
              //分页器设置         
              pagination: {
                  el: '.swiper-pagination',
                  clickable :true
              }
             
            },
            // swiperSlides: [1, 2, 3, 4]
           
        }
       
    },
    created(){
     
        
    },
    computed: {  
      swiper() {  
        return this.$refs.banner-swiper.swiper;  
      }  
    }, 
    mounted () {  
      //可以使用swiper这个对象去使用swiper官网中的那些方法  
      console.log('this is current swiper instance object', this.swiper);
        // this.swiper.slideTo(0, 0, false);
    },
    methods:{
        settopheight:function(value){
            this.topheight=value;
        }
    }
};

</script>

<style lang="less">
  
  .banner-swiper {
  height: 264px;
  background: #f5f5f5;

  .swiper-slide img {
    width: 100%;
    height: 264px;
  }
}
</style>
