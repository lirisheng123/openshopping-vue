<template>
<div class="home">
    <BannerSwiper :data="banners" />
    <QuickLinkNav :data="quicknavlist" />
    <!-- <CustomColumn :data="customs" /> -->

    <div class="guess-like-wrap">
      <p class="guess-title">
        <span class="guess-layout">猜你喜欢</span>
      </p>
      <GoodList :data="goodslist" />
    </div>
    <!-- <Footer :data="navs" /> -->
  </div>
</template>
<script>
import "../../assets/style/index.css";
import GoodList from './components/GoodList.vue';
import BannerSwiper from './components/BannerSwiper.vue';
import QuickLinkNav from './components/QuickLinkNav.vue';
import CustomColumn from './components/CustomColumn.vue';
 import {fetchListWithChildren} from '@/api/productCate'
export default {
    name:"home",
    components:{
       GoodList,
       BannerSwiper,
       QuickLinkNav,
       CustomColumn
      
    },
    data(){  
        return{
            topheight:0,
            page:{},
            pageData:"",
            banners:[],
            quicknavlist:[],
            customs:null,
            goodslist:[]
        }
    },
    created(){
        // console.log("enter created:")
        // this.page = this.pageData
        // console.log("pageData:"+JSON.stringify( this.page))
        // GetPage().then(response=>{
        //     this.page=response;
        // });
        this.getBanner();
        this.getCategoryIcon();
        this.getRecommed();
    },
    methods:{
        // settopheight:function(value){
        //     this.topheight=value;
        // },
        getBanner:function(){
          this.banners=[
              {src:"http://mall-photo.oss-cn-beijing.aliyuncs.com/GmtmhX_1617116211525.jpg",desc:"格力减价大放送"},
              {src:"http://mall-photo.oss-cn-beijing.aliyuncs.com/GmtmhX_1617116211525.jpg",desc:"米家双十一"}
            ]
           
        },
        getCategoryIcon(){
           
           fetchListWithChildren().then(response => {
          let list = response.data;
          for (let i = 0; i < list.length; i++) {
            
            this.quicknavlist.push({label: list[i].categoryName, value: list[i].categoryId, icon:list[i].categoryPic});
          }

          //添加优惠卷和秒杀活动的icon
         
          this.quicknavlist.push({label: "优惠卷", value: -1, icon:"http://mall-photo.oss-cn-beijing.aliyuncs.com/%E4%BC%98%E6%83%A0%E5%8D%B7.png",url:"/home/coupon"});
           this.quicknavlist.push({label: "秒杀活动", value: -2, icon:"http://mall-photo.oss-cn-beijing.aliyuncs.com/%E6%B4%BB%E5%8A%A8.png",url:"/home/second"});
          });
          
          
          
        },
        getRecommed(){
          this.goodslist=[
              {id:1,src:"http://mall-photo.oss-cn-beijing.aliyuncs.com/dianfangguo1.jpg",title:"电饭锅",price:"12.5"},
              {id:2,src:"http://mall-photo.oss-cn-beijing.aliyuncs.com/dianfangguo1.jpg",title:"电饭锅",price:"12.5"},
              {id:3,src:"http://mall-photo.oss-cn-beijing.aliyuncs.com/dianfangguo1.jpg",title:"电饭锅",price:"12.5"},
              {id:4,src:"http://mall-photo.oss-cn-beijing.aliyuncs.com/dianfangguo1.jpg",title:"电饭锅",price:"12.5"},
              {id:5,src:"http://mall-photo.oss-cn-beijing.aliyuncs.com/dianfangguo1.jpg",title:"电饭锅",price:"12.5"},
              {id:6,src:"http://mall-photo.oss-cn-beijing.aliyuncs.com/dianfangguo1.jpg",title:"电饭锅",price:"12.5"}
          ]
        }
    }
};
</script>
<style  lang="less" scoped>
.guess-title {
       font-size: 15px;
    }
</style>
