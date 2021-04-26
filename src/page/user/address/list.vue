<template>
<div>

    <headerNav title="我的地址"/>
    <van-address-list
  v-model="chosenAddressId"
  :class="isSelect?'':'hideselect'"
  :list="list"
  @add="onAdd"
  @edit="onEdit"
  @select="onSelect"
/>
</div>
</template>

<script>

import { GetAddressList } from "../../../api/user.js";
import { AddressList } from 'vant';

import { fetchList ,deleteAdress,selectedConfired} from "@/api/userAdress";
import eventBus from '@/utils/eventbus.js';


export default {
    components:{
        [AddressList.name]:AddressList,
    },
    data() {
        return {
        chosenAddressId: '1',
        isSelect:false,
        list: [],
        }
    },

    methods: {
        onAdd() {
            this.$router.push('/user/address/edit')
        },

        onEdit(item, index) {
            this.$router.push('/user/address/edit?id='+item.id);
        },
        onSelect(item,index){
            if(!this.isSelect){
                return;
            }
            // this.$emit('selectAddress',item);
             eventBus.$emit('selectAddress',item);
            this.$router.go(-1);
        }
    },
    created:function(){

        this.chosenAddressId=this.$route.query.id;
        this.isSelect=this.$route.query.id>0;
        // if(this.$route.query.id==2){
        //     this.isSelect=true;
        // }
        let userId =this.$store.getters.userId
        fetchList(userId).then(response=>{
            let data=response.data;
            for(let i=0;i<data.length;i++){
                let value={
                    "id": data[i].addressId,
                    "name": data[i].userName,
                    "tel": data[i].userPhone,
                    "address": data[i].detailAddress
                    // "addressDetail": data[i].detailAddress,
                    // "city": data[i].cityName,
                    // "province": data[i].provinceName,
                    // "county": data[i].regionName,
                    // "isDefault": data[i].defaultFlag,

                }
                this.list.push(value)
                // if(data[i].defaultFlag==1){
                //     this.chosenAddressId=data[i].addressId;
                //     this.isSelect=true; 
                // }
            }
            
        })

    }

}
</script>

<style lang="less">
.hideselect{
    .van-radio__input{
        display: none;
    }
}
</style>
