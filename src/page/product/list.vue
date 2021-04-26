<template>
    <div class="product-list">
        <!-- <searchtop @change"GetProducts"= /> -->
       <van-search
        v-model="keyword"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>      
  
        <div class="filterbar">
            <ul :class="filtersort?'show':''">
                <li :class="filterindex==0?'selected':''" v-on:click="onFilterBar(0)"><span>{{filterindex==3?'价格最低':(filterindex==4?'价格最高':'综合')}}</span><van-icon name="arrow" class="down" /></li>
                <li :class="filterindex==2?'selected':''" v-on:click="onFilterBar(2)"><span>销量</span></li>
                <li :class="filterindex==1?'selected':''" v-on:click="onFilterBar(1)"><span>上新</span></li>
                <li :class="filterindex==5?'selected':''" v-on:click="onFilterBar(5)"><span>筛选</span></li>
            </ul>
            <div :class="'item_options '+(filtersort?'show':'')">
                <ul>
                    <!-- <li :class="filterindex==10?'selected':''" v-on:click="onFilterBar(10)">综合</li> -->
                    <li :class="filterindex==3?'selected':''"  v-on:click="onFilterBar(3)">价格最低</li>
                    <li :class="filterindex==4?'selected':''" v-on:click="onFilterBar(4)">价格最高</li>
                </ul>
            </div>
            <van-popup v-model="filtershow" position="right" class="filterlayer" >
                <div class="filterInner" style="overflow-y: scroll;max-height: 100%;">
                  <ul  v-for="(item,index) in filterList" :key="index">
                        <li>
                           <van-cell :title="item.title" is-link  />
                        </li>
                        <div style="clear: both;"></div>
                        <div class="tags_selection" >
                         
                            <!-- <el-checkbox-group v-model="item.checkerValue">                           
                               <el-checkbox-button   v-for=" (item1,index1) in options" :label="item1.value" :key="index1">{{item1.text}}</el-checkbox-button>
                            </el-checkbox-group> -->
                               <el-checkbox-group v-model="item.checkerValue">
                                   <el-checkbox-button v-for=" (item1,index1) in item.options" :label="item1.value" :key="index1">{{item1.text}}</el-checkbox-button>
                                  </el-checkbox-group>
                           <div style="clear: both;"></div>
                        </div>
                  </ul>
                    <!-- <ul>
                        <li>
                            <van-cell title="清洁类型" is-link arrow-direction="down" />
                        </li>
                        <div style="clear: both;"></div>
                        <div class="tags_selection">
                            <div class="option">
                                <a href="javascript:void 0;">牙龈护理111</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">抛光</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">清洁</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">正畸专用</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">敏感</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">亮白</a>
                            </div>
                            <div style="clear: both;"></div>
                        </div>
                    </ul> -->
                    <!-- <ul>
                        <li>
                            <van-cell title="清洁类型" is-link arrow-direction="down" />
                        </li>
                        <div style="clear: both;"></div>
                        <div class="tags_selection">
                            <div class="option">
                                <a href="javascript:void 0;">牙龈护理111</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">抛光</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">清洁</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">正畸专用</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">敏感</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">亮白</a>
                            </div>
                            <div style="clear: both;"></div>
                        </div>
                    </ul>
                    <ul>
                        <li>
                            <van-cell title="清洁类型" is-link arrow-direction="down" />
                        </li>
                        <div style="clear: both;"></div>
                        <div class="tags_selection">
                            <div class="option">
                                <a href="javascript:void 0;">牙龈护理111</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">抛光</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">清洁</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">正畸专用</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">敏感</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">亮白</a>
                            </div>
                            <div style="clear: both;"></div>
                        </div>
                    </ul>
                    <ul>
                        <li>
                            <van-cell title="清洁类型" is-link arrow-direction="down" />
                        </li>
                        <div style="clear: both;"></div>
                        <div class="tags_selection">
                            <div class="option">
                                <a href="javascript:void 0;">牙龈护理111</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">抛光</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">清洁</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">正畸专用</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">敏感</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">亮白</a>
                            </div>
                            <div style="clear: both;"></div>
                        </div>
                    </ul>
                    <ul>
                        <li>
                            <van-cell title="清洁类型" is-link arrow-direction="down" />
                        </li>
                        <div style="clear: both;"></div>
                        <div class="tags_selection">
                            <div class="option">
                                <a href="javascript:void 0;">牙龈护理111</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">抛光</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">清洁</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">正畸专用</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">敏感</a>
                            </div>
                            <div class="option ">
                                <a href="javascript:void 0;">亮白</a>
                            </div>
                            <div style="clear: both;"></div>
                        </div>
                    </ul> -->
                   <!-- <cube-checker
                     v-model="checkerValue"
                      :options="options" /> -->
                       <!-- <el-checkbox-group v-model="checkerValue">
                        <el-checkbox-button v-for=" (item,index) in options" :label="item.value" :key="index">{{item.text}}</el-checkbox-button>
                      </el-checkbox-group> -->
                     
                    <div style="clear: both;"></div>
                    <!-- <van-button size="large"  style="height: 40px;margin-bottom: 15px;line-height: 40px;">清楚选项</van-button> -->
                    <div style="height:50px;"></div>
                </div>
                <div class="filterlayer_bottom_buttons">
                    <span class="filterlayer_bottom_button cancel">取消</span>
                    <span @click="confirmSelect" class="filterlayer_bottom_button confirm">确认</span>
                </div>
            </van-popup>
        </div>
          <van-list
                            v-model="loading"
                            :finished="finished"
                            :offset="offset"
                            finished-text="没有更多了"
                            @load="onLoad"
                            >
            <div v-for="(product,i) in products" :key="i">
              <div  @click="showProduct(product)">
                  <product-card :product='product' />
              </div>
            </div>
          </van-list>
        <!-- <div v-for="(product,i) in products" :key="i">
           <div  @click="showProduct(product)">
              <product-card :product='product' />
           </div>
        </div> -->
    </div>
</template>

<script>
import searchtop from "../../components/search/searchtop";
// import { cubeChecker } from "cube-ui";
import {fetchList } from "@/api/product";
import { Search } from "vant";
import { fetchBrandListByCateId,fetchParamsByCateId } from "@/api/productCate";
import { fetchProductList ,aggregationByKeyword} from "@/api/search";

// import{Checker} from 'Cube'
let defaultQuerysData={   
          "brandId": null,
          "keyword": null,
          "pageNum": 1,
          "pageSize": 20,
          "productCategoryId": null,
          "productParams":null,
          "sort": 3
}
export default {
  // components: {
  //   searchtop
  // },
   components:{
        [Search.name]:Search,
        // cubeChecker
    },
  data() {
    return {
      value: "",
      filterindex: 2,
      filtersort: false,
      filtershow: false,
      value:"",
      products:[],
      checkerValue: [],
      options: [
        {
          value: 1,
          text: 'red'
        },
        {
          value: 2,
          text: 'yellow'
        },
        {
          value: 3,
          text: 'blue'
        },
        {
          value: 4,
          text: 'green'
        }
      ],
      list:[{
        title:"品牌",
        options: [
        {
          value: 1,
          text: 'red'
        },
        {
          value: 2,
          text: 'yellow'
        },
        {
          value: 3,
          text: 'blue'
        },
        {
          value: 4,
          text: 'green'
        },
        {
          value: 5,
          text: 'green'
        }
      ]
      }],
      
      filterList:[],
      keyword:null,
      offset:10,
      finished:false,
      loading:false,
      page:0
     
            // products:[
            //     {
            //         id:1,
            //         imageURL:'https://pop.nosdn.127.net/19e33c9b-6c22-4a4b-96da-1cb7afb32712',
            //         title:'BEYOND博洋家纺 床上套件 秋冬保暖纯棉床单被套 双人被罩 磨毛全棉印花床品四件套',
            //         price:'13.00',
            //     },
            //     {
            //         id:1,
            //         imageURL:'https://pop.nosdn.127.net/19e33c9b-6c22-4a4b-96da-1cb7afb32712',
            //         title:'BEYOND博洋家纺 床上套件 秋冬保暖纯棉床单被套 双人被罩 磨毛全棉印花床品四件套',
            //         price:'499.00',
            //         tags:['满199减100','2件起购'],
            //     },
            //     {
            //         id:1,
            //         imageURL:'https://pop.nosdn.127.net/19e33c9b-6c22-4a4b-96da-1cb7afb32712',
            //         title:'BEYOND博洋家纺 床上套件 秋冬保暖纯棉床单被套 双人被罩 磨毛全棉印花床品四件套',
            //         price:'499.00',
            //         tags:['新品'],
            //         imageTag:'仅剩1件',
            //     },
            //     {
            //         id:1,
            //         imageURL:'https://pop.nosdn.127.net/19e33c9b-6c22-4a4b-96da-1cb7afb32712',
            //         title:'BEYOND博洋家纺 床上套件 秋冬保暖纯棉床单被套 双人被罩 磨毛全棉印花床品四件套',
            //         price:'499.00',
            //         tags:['赠'],
            //         imageTag:'预约',
            //     },
            //     {
            //         id:1,
            //         imageURL:'https://pop.nosdn.127.net/19e33c9b-6c22-4a4b-96da-1cb7afb32712',
            //         title:'BEYOND博洋家纺 床上套件 秋冬保暖纯棉床单被套 双人被罩 磨毛全棉印花床品四件套',
            //         price:'15.00',
            //     },
            //     {
            //         id:1,
            //         imageURL:'https://pop.nosdn.127.net/19e33c9b-6c22-4a4b-96da-1cb7afb32712',
            //         title:'BEYOND博洋家纺 床上套件 秋冬保暖纯棉床单被套 双人被罩 磨毛全棉印花床品四件套',
            //         price:'125.50',
            //     },
            // ]
    };
  },
  created() {
      console.log("进入search")
      console.log("keyword:",this.$route.query.keyword)
      console.log("categoryId:",this.$route.query.categoryId)
      console.log("filterindex:",this.filterindex)
       this.keyword=this.$route.query.keyword=="null"?null:this.$route.query.keyword
      // this.getSearchProductList();
     
      // this.getAllRoleList();
    },
  methods: {
    onFilterBar(value) {
      if (value == 0) {
        this.filtersort = !this.filtersort;
      } else if (value == 5) {
        this.filtershow = !this.filtershow;
      } else {
        this.filtersort = false;
        this.filterindex = value;
        if(this.filterindex==1||this.filterindex==2||
           this.filterindex==3||this.filterindex==4)  {
              this.page=0;
             this.finished=false
             this.getSearchProductList()
        }
      }
    },
    showProduct(product){ 
      console.log("enter to the product detail")
        this.$router.push('/product/'+product.id);
    },
    getSearchProductList(){
     
      let params={   
          
          "pageNum": this.page,
          "pageSize": 10,
          "sort": this.filterindex
      }

      if(this.keyword!=null){
           params.keyword=this.keyword
      }else{
          params.productCategoryId=[]
           params.productCategoryId.push(parseInt(this.$route.query.categoryId) )
      }
      // if(this.$route.query.categoryId!='null'){
      //      params.productCategoryId=[]
      //      params.productCategoryId.push(parseInt(this.$route.query.categoryId) )
      // }
    
      if(this.filterList!=null&&this.filterList.length>0){
             this.chageFilterListToData(params)
      }
      // let keyword=""
      // if(this.$route.query.keyword=='null'){
      //   keyword=null
      // }else{
      //   keyword=this.$route.query.keyword
      // }

      // let params={
      //   goodsName:keyword,
      //   goodsCategoryId:this.$route.query.categoryId,
      //   pageNum:1,
      //   pageSize:100,
      //   goodsId:null,
      //   goodsSellStatus:null
      // }
       console.log("params:"+JSON.stringify(params) )
       if(this.page==0){
            this.products=[]
       }
       fetchProductList(params).then(response => {
            console.log("resp:"+JSON.stringify(response) )
             let list=response.data.list;
             for(let i=0;i< list.length;i++){
               let product={
                 id: list[i].goodsId,
                 imageURL: list[i].goodsCoverImg,
                 title: list[i].goodsName,
                 price: list[i].sellingPrice
               }
               this.products.push(product)
             }
               console.log("total;"+ response.data.totalPage)
             this.loading=false
            if( response.data.totalPage-1<=this.page){
                  this.finished = true;
            }
            if(this.page==0){
                this.getFilterList()
            }
            this.page=this.page + 1;

           
       })

    },
    onSearch() {
      this.page=1;
      this.finished=false
      this.getSearchProductList();
      //  let params={
      //   goodsName:this.value,
      //   goodsCategoryId:null,
      //   pageNum:1,
      //   pageSize:100,
      //   goodsId:null,
      //   goodsSellStatus:null
      // }
      //  console.log("params:"+JSON.stringify(params) )
      //  this.products=[]
      //  fetchList(params).then(response => {
      //       console.log("resp:"+JSON.stringify(response) )
      //        let list=response.data.list;
      //        for(let i=0;i< list.length;i++){
      //          let product={
      //            id: list[i].goodsId,
      //            imageURL: list[i].goodsCoverImg,
      //           // imageURL:'https://pop.nosdn.127.net/19e33c9b-6c22-4a4b-96da-1cb7afb32712',
      //            title: list[i].goodsName,
      //            price: list[i].sellingPrice
      //          }
      //          this.products.push(product)
      //        }
      //  })

    },
    getBrandList(){
       
       fetchBrandListByCateId(this.$route.query.categoryId).then(resp=>{
            let data = resp.data;
            console.log("brand:"+JSON.stringify(data))
            let value=[]
            if(data==null){
              return 
            }
            for(let i=0;i<data.length;i++){
                
                let value1 = {
                 "value": data[i].grandId,
                 "text": data[i].grandName,
                }
               
                value.push(value1)
              
            }
            this.filterList.push({title:"品牌",options:value,checkerValue:[]})
            console.log("filterListbrand:"+JSON.stringify(this.filterList))

           
       })
    },
    getParamList(){
         fetchParamsByCateId(this.$route.query.categoryId).then(resp=>{
            let data = resp.data;
             console.log("Params:"+JSON.stringify(data))
            if(data==null){
              return 
            }
            for(let i=0;i<data.length;i++){
                
                let value={
                  title:data[i].categoryParamName,
                  checkerValue:[]
                }
                let value2  =data[i].categoryParamValue.split(",")
                let value3=[]
                for(let j=0;j<value2.length;j++){
                    let value4={
                      "value": value2[j],
                      "text": value2[j]
                    }
                    value3.push(value4)
                }
                value.options=value3;
                this.filterList.push(value)
            }
            console.log("filterListParam:"+JSON.stringify(this.filterList))
            
       })
    },
    confirmSelect(){
      
      //  console.log("checkerValue:"+JSON.stringify(this.checkerValue))
      this.page=0;
      this.finished=false
      this.getSearchProductList()
      this.filtershow=false
    },
    getFilterList(){
      //判断来源,是分类还是keyword
      this.filterList=[]
      if(this.keyword!=null) {
        let params={
          keyword:this.keyword
        }
        aggregationByKeyword(params).then(resp=>{
             console.log("aggregations:"+JSON.stringify(resp.data))
             if(resp.data !=null){
                if(resp.data.productGrands!=null&&resp.data.productGrands.length>0){
                   let value={
                     title:"品牌",
                     options:[],
                    checkerValue:[]
                   }
                   value.options=resp.data.productGrands.map(item=>{
                     return {
                       text:  item.grandName,
                       value: item.grandId
                     }
                   })
                  this.filterList.push(value) 
                }
                if(resp.data.productCategorys!=null&&resp.data.productCategorys.length>0){
                     let value={
                     title:"分类",
                     options:[],
                     checkerValue:[]
                   }
                   value.options=resp.data.productCategorys.map(item=>{
                     return {
                       text:  item.categoryName,
                       value: item.goodsCategoryId
                     }
                   })
                   this.filterList.push(value) 
                }
                if(resp.data.productParams!=null&&resp.data.productParams.length>0){
                   
                   resp.data.productParams.forEach(item=>{
                      let value={
                        title:item.goodsParamName,
                        options:[],
                         checkerValue:[]
                      }
                     value.options=item.goodsParamValue.map(item1=>{
                       return {
                         text:item1,
                        value: item1
                       }
                     })
                      this.filterList.push(value) 
                    
                   })
                  
                }
             }

             console.log("filterList:"+JSON.stringify(this.filterList))
          })
      }else{
       
      //  let vm =this
      //   let P1 = new Promise(function (resolve, reject) {
      //         vm.getBrandList(function () {
      //               resolve()
      //         })
      //   })
      //   let P2 = new Promise(function (resolve, reject) {
      //      vm.getParamList(function () {
      //       resolve()
      //     })
      //   })
        
      //   Promise.all([P1, P2]).then(function (results) {
      //      console.log("filterList:"+JSON.stringify(this.filterList))
      //     // ["p1 data", ""p2 data""]
      //   })

         this.getBrandList()
         this.getParamList()   
        //  console.log("filterList:"+JSON.stringify(this.filterList))
      }

      
    },
    chageFilterListToData(queryData){
      
      this.filterList.forEach(item=>{
        
        if(item.checkerValue!=null&&item.checkerValue.length>0){
              if(item.title=="品牌"){
                // queryData.brandId=[]
                 queryData.brandId= item.checkerValue;
              //  queryData.brandId= item.checkerValue.map(item1=>{
              //     return  item1
              //   })
                // queryData.brandId=queryData.brandId.concat(value)

              }else if(item.title=="分类"){
                // queryData.productCategoryId=[]
                 queryData.productCategoryId= item.checkerValue
                // queryData.productCategoryId= item.checkerValue.map(item1=>{
                //   return  item1
                // })
                // queryData.productCategoryId=queryData.productCategoryId.concat(value)
                
              }else{
                //参数
                if(queryData.productParams==undefined){
                    queryData.productParams=[]
                }
                // queryData.productParams=[]
                let value={
                   "goodsParamName":  item.title,
                   "goodsParamValue":item.checkerValue
                }
                queryData.productParams.push(value)
                // let value1 = item.checkerValue.map(item1=>{
                //   return  {      
                //       "goodsParamValue": item1
                //   }
                // })


                // queryData.productParams=queryData.productParams.concat(value)
              }
        }
        
      })
    },
    onLoad() {
            
            // this.loading=true
            // GetCoupon({page:this.page}).then(response=>{
            //     response.List.forEach(item => {
            //         item.show=false;
            //         this.list.push(item);
            //     });
            //     this.loading = false;
            //     if(response.TotalPage<=this.page){
            //         this.finished = true;
            //     }
            
            // })
            // this.loading=true
            // this.loading=true
            //  let timer = setTimeout(() => {	// 定时器仅针对本地数据渲染动画效果,项目中axios请求不需要定时器
            //    this.page=this.page + 1;
            //   this.getSearchProductList();				// 调用上面方法,请求数据
            //   this.finished && clearTimeout(timer);//清除计时器
            // }, 100);

           this.getSearchProductList();
         
      },
   

  }
};
</script>

<style lang="less">

.value-class {
  flex: none !important;
}
.product-list{
    .additional .price{
        position: absolute;
        bottom: 6px;
        height: 34px;
    }
}
.filterbar {
  font-size: 14px;
  position: relative;
  ul {
    width: 100%;
    height: 40px;
  }
  li {
    color: #999;
    width: 25%;
    float: left;
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    i {
      font-size: 12px;
      margin-left: 2px;
    }
    .down {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }
  .selected {
    color: #e93b3d;
  }
  .show {
    .down {
      -webkit-transform: rotate(-90deg);
      transform: rotate(-90deg);
    }
  }
  .item_options {
    width: 100%;
    position: absolute;
    top: 41px;
    background: #fff;
    display: none;
    z-index: 1;
    li {
      width: 100%;
      text-align: left;
      padding-left: 10px;
    }
  }

  .item_options.show {
    display: block;
  }
  .filterlayer {
    width: 85%;
    height: 100%;
    background-color: #f7f7f7;
    &_bottom {
      &_buttons {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        z-index: 10;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;

        .cancel {
          color: #333;
          background-color: #fff;
          box-shadow: 0 -1px 2px 0 rgba(0, 0, 0, 0.07);
        }
        .confirm {
          color: #fff;
          background-color: #e93b3d;
        }
      }
      &_button {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        font-size: 16px;
        height: 49px;
        line-height: 49px;
        text-align: center;
      }
    }
    ul {
      height: auto;
      background: #fff;
      margin-bottom: 15px;
    }
    li {
      width: 100%;
      text-align: left;
        height: auto;
        line-height: initial;
      .van-cell{
        font-size: 16px;
      }
      .big {
        height: 25px;
        max-width: 250px;
        overflow: hidden;
        font-size: 16px;
        color: #333;
        text-overflow: ellipsis;
        margin-left: 10px;
      }
    }
    .filterInner{
        overflow-y: scroll;
        max-height: 100%;
        .van-button{
            height: 40px;
            margin-bottom: 15px;
            line-height: 40px;
        }
    }
    .tags_selection {
      font-size: 14px;
      text-align: center;
      background-color: #fff;
      position: relative;
      margin: 0;
      padding: 10px 0 0 10px;
      .option {
        box-sizing: border-box;
        float: left;
        width: 33.33%;
        padding-right: 10px;
        height: 30px;
        line-height: 30px;
        margin-bottom: 10px;
        a {
          position: relative;
          display: block;
          padding: 0 5px;
          color: #666;
          background-color: #f7f7f7;
          border-radius: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
            height: 30px;
        }
      }
    }
  }
}
</style>
