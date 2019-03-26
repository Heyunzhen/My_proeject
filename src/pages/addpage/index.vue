<template>
  <div class="wrap">
        <p class="info">面试信息</p>
        <form  @submit="formSubmit" report-submit='true'>
              <div class="form">
              <ul class="uls">
                <li class="lis">
                  <p class="adressname">公司名称</p>
                  <input class="name" v-model="name" type="text">
                </li>
                 <li class="lis">
                  <p class="adressname">公司电话</p>
                  <input class="name" v-model="phone" type="text">
                </li>
                 <li class="lis">
                  <p class="adressname">面试时间</p>
                  <picker class="name" mode="date" @change="bindPickerChange" :value="date" >
                    <view class="picker">
                      当前选择：{{time}}
                    </view>
                  </picker>
                </li>
                 <li class="lis">
                  <p class="adressname">面试地址</p>
                  <input class="name" :value="didian.title" disabled @click="search" type="text">
                </li>
              </ul>
        </div>

        <p class="info">备注信息</p>

        <textarea type="text" v-model="description"  placeholder="备注信息(可选，100个字以内)" maxlength="100"/>

        <button class="btnadd" form-type="submit">确认添加</button>
        </form>
  </div>
</template>

<script>
import action from "../../api/request.js"
const moment = require('moment');
import store from "../../Mystore/store.js"
var now_date1=""
var arr={}//用于存放表单信息
export default {
    computed:{
      didian(){
        return store.state.didian
      }
    },
    mounted(){
      const time=new Date()
      const now_date=time.getTime()
      function formatDate(now) {
          var year=now.getFullYear();
          var month=now.getMonth()+1;
          var date=now.getDate();
          now_date1=year+"-"+month+"-"+date
      }
        var d=new Date(now_date);
        formatDate(d);
        this.time=now_date1
    },
    data:{
      name:"",//公司名字
      time:"",//面试时间
      phone:"",//公司电话,
      "description":""//添加面试者的具体备注
    },
    methods: {
      bindPickerChange(e){
          this.time=e.mp.detail.value
      },
      formSubmit(e){
        //添加至仓库的表单信息
          this.id=e.target.formId
          var rexp=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
          var timese = this.time;
          var timestamp = parseInt(new Date(timese).getTime()/1000);    // 当前时间戳
          arr.company=this.name//面试的公司名字
          arr.phone=this.phone//面试的公司电话
          arr.start_time=timestamp//转给后端的开始时间时间戳
          if(this.didian!=""&&this.company!=""&&rexp.test(this.phone)==true){
              arr.address=this.didian.address//经过处理后需要传给后端的地址字符串
              arr.latitude=this.didian.location.lat//获取到的地址纬度
              arr.longitude=this.didian.location.lng//获取到的地址经度
              arr.description=this.description//用户添加的备注
              arr.formid=this.id
              store.commit({type:"nameupdate",payload:arr})
              action.sign(arr)//传递给api方法的数据对象
              wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(()=>{
              wx.navigateTo({
                url:"/pages/List/main"
              },2500)
            })
          }else{
              wx.showModal({
                  title: '提示',
                  content: '缺少没有项或是您的格式有误',
                  success(res) {
                    if (res.confirm) {
                      console.log('确定')
                    } else if (res.cancel) {
                      console.log('取消')
                    }
                  }
                })
          }
    },
      search(){
        wx.navigateTo({url:"/pages/search/main"})
      }
    }
}
</script>

<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
      .wrap{
        width:100%;
        height:100%;
        display:block;
        }
      .info{
        padding-left:6px;
        font-size:17px;
        padding:10px;
        color:black;
      }
      .form{
        width:100%;
        background-color:white;
      }
      .uls{
        width:100%;
        display:block;
        padding-left:10px;
        font-size:17px;
        box-sizing:border-box;
      }
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
      textarea{
        font-size: 30rpx;
        // background: #eee;
        color: #333;
        width: 690rpx;
        height: 200rpx;
        margin: 30rpx;
        box-sizing: border-box;
        padding: 10rpx;
        border: 1rpx solid #c0c0c0;
        border-radius: 5rpx;
      }
      .btnadd{
        width:80%;
        background-color:blue;
        color:white;
        margin:0 auto;
        margin-top:20px;
      }
      .picker{
        font-size:17px;
      }
</style>
