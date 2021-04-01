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
            pageData,
            banners:null,
            quicknavlist:null,
            customs:null,
            goodslist:null
        }
    },
    created(){
        console.log("enter created:")
        this.page = this.pageData
        console.log("pageData:"+JSON.stringify( this.page))
        // GetPage().then(response=>{
        //     this.page=response;
        // });
    },
    methods:{
        settopheight:function(value){
            this.topheight=value;
        },
        getBanner:function(){

          this.banners=[
              {src:"http://mall-photo.oss-cn-beijing.aliyuncs.com/GmtmhX_1617116211525.jpg",desc:"格力减价大放送"},
              {src:"http://mall-photo.oss-cn-beijing.aliyuncs.com/GmtmhX_1617116211525.jpg",desc:"米家双十一"},
              {src:"http://mall-photo.oss-cn-beijing.aliyuncs.com/GmtmhX_1617116211525.jpg",desc:"美的"},
              {src:"http://mall-photo.oss-cn-beijing.aliyuncs.com/GmtmhX_1617116211525.jpg",desc:"不知道"}
              ]
           
        },
        getCategoryIcon(){
           
           fetchListWithChildren().then(response => {
          let list = response.data;
          for (let i = 0; i < list.length; i++) {
            
            this.QuickLinkNav.push({label: list[i].categoryName, value: list[i].categoryId, icon:list[i].categoryPic});

          }

        });
          
        },
        getRecommed(){
          this.goodslist=[
              {id:"3",src:"http://mall-photo.oss-cn-beijing.aliyuncs.com/dianfangguo1.jpg",title:"电饭锅",price:"12.5"},
              {id:"3",src:"http://mall-photo.oss-cn-beijing.aliyuncs.com/dianfangguo1.jpg",title:"电饭锅",price:"12.5"},
              {id:"3",src:"http://mall-photo.oss-cn-beijing.aliyuncs.com/dianfangguo1.jpg",title:"电饭锅",price:"12.5"},
              {id:"3",src:"http://mall-photo.oss-cn-beijing.aliyuncs.com/dianfangguo1.jpg",title:"电饭锅",price:"12.5"},
              {id:"3",src:"http://mall-photo.oss-cn-beijing.aliyuncs.com/dianfangguo1.jpg",title:"电饭锅",price:"12.5"},
              {id:"3",src:"http://mall-photo.oss-cn-beijing.aliyuncs.com/dianfangguo1.jpg",title:"电饭锅",price:"12.5"}
          ]
        }
    }
};
</script>
