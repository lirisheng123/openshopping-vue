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
      let param={
       	"cityName": "东莞市",
        "detailAddress": "广东省东莞市松山湖管委会大学路1号东莞理工学院",
        "provinceName": "广东省",
        "regionName": "松山湖管委会",
        "userId": 4,
        "userName": data.name,
        "userPhone": data.name

      }
      console.log("data:"+JSON.stringify(data))
      // create(data).then(response=>{
      //   this.$toast('保存成功');
      //   this.$router.go(-1);
      // })
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
            "areaCode": "712899",
            "addressDetail": data.detailAddress,
            "isDefault": flag
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
