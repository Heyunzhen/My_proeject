<template>
  <div>
    <li class="lis">
     <p class="adressname">北京</p>
     <input class="name" v-model="loacation" @input="search" type="text">
    </li>

      <ul v-if="flag==true">
            <li class="liser" v-for="(item,index) in searchdata" :key="index" @click="tips(index)">{{item.title}}</li>
      </ul>

    </div>
</template>

<script>
var flyio=require('flyio/dist/npm/wx')
var Flyio=new flyio
import store from "../../Mystore/store.js"
export default {
    data:{
      loacation:"",
      searchdata:[],
      flag:false
    },
    methods:{
      search(){
        Flyio.get('https://apis.map.qq.com/ws/place/v1/suggestion?'+"keyword="+this.loacation+"&region=北京&key=VUJBZ-6RXWJ-QBHFH-KVQDL-BDSNJ-LFBJG").then((res)=>{
          this.searchdata=res.data.data
          if(this.searchdata==undefined){
            this.flag=false
          }else{
            this.flag=true
          }
        }).catch((err)=>{
          console.log(err)
        })
      },
      tips(index){
        store.commit({type:"loacation",payload:this.searchdata[index]})
        wx.navigateTo({url:"/pages/addpage/main"})
      }
    }
}
</script>

<style>
  .lis{
        display:flex;
        height:45px;
        align-items:center;
        margin-bottom:3px;
        border-bottom:2px solid #f5f5f5;
      }
      .adressname{
          font-size:17px;
          color:gray;
          padding-left:15px;
      }
      .name{
        flex:1;
        font-size:17px;
        padding-left:20px;
        text-overflow:ellipsis;
        overflow: hidden;
        white-space:nowrap;
        color:black;
      }
      .hide{
        display:none;
      }
      .show{
        display:block;
      }
      .liser{
        width:100%;
        height:40px;
        display:flex;
        align-items:center;
        padding-left:15px;
        padding-right:5px;
        border-bottom:2px solid #f5f5f5;
        box-sizing:border-box;
      }
</style>
