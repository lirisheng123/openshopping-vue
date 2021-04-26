<template>
    <div>
     <headerNav title="修改地址"/>
      <van-address-edit
      :area-list="areaList"
      :showDelete="showDelete"
      show-set-default
      @save="onSave"
      @delete="onDelete"
      :addressInfo="info"
      />
    </div>
</template>

<script>
import areaList from '../../../data/area';
import { GetAddressById,SaveAddress,DelAddress } from "../../../api/user.js";

import { select ,update,create,deleteAdress} from "@/api/userAdress";

import { AddressEdit } from 'vant';
export default {
    components:{
        [AddressEdit.name]:AddressEdit,
    },
    data() {
    return {
      areaList,
      showDelete:false,
      info:{},
    }
  },

  methods: {
    onSave(data) {
      console.log("data:"+JSON.stringify(data))
      let userId=this.$store.getters.userId;
      let defautFlag= data.isDefault?1:0
      let param={
        "addressId":data.id,
       	"cityName": data.city,
        "detailAddress": data.addressDetail,
        "provinceName": data.province,
        "regionName": data.county,
        "userId": userId,
        "userName": data.name,
        "userPhone": data.tel,
        "defaultFlag":defautFlag,
        "areaCode":data.areaCode
         
      }
      var id=this.$route.query.id;
      if(id>0){
        //编辑
        update(data.id,param).then(resp=>{
          
           this.$toast('保存成功');
           this.$router.go(-1);
        })
      }
      else{
        //添加
        
        create(param).then(response=>{
        this.$toast('保存成功');
        this.$router.go(-1);
        })
      }
    
    },
    onDelete(data) {
      deleteAdress(data.id).then(response=>{
        this.$toast('删除成功');
        this.$router.go(-1);
      })
    },
  },
  created:function(){
    var id=this.$route.query.id;
    if(id>0){
      this.showDelete=true;
      select(id).then(response=>{
        // console.log(response.data);
        let data=response.data;
        let flag=false;
        if(data.defaultFlag==1){
          flag=true
        }
        this.info={
            "id": data.addressId,
            "name": data.userName,
            "tel": data.userPhone,
            "areaCode": data.areaCode,
            "addressDetail": data.detailAddress,
            "isDefault": flag,
            "city": data.cityName,
            "province": data.provinceName,
            "county": data.regionName
           
        }
    
      })
    }
  }

}
</script>

<style>
.van-picker__toolbar{
  font-size: 16px;
}
</style>
