<template>
    <div class="mypage">


      <div class="top_user">

       <dl class="dls">
         <dt>
           <image class="avitar" src="/static/images/wodedangxuan (1).png" alt="" />
         </dt>
         <dd class="phone_number">{{phone}}</dd>
       </dl>

      </div>

      <div class="a">
        <ul>
          <li class="ls" @click="no">
            <div class="list_one">
              <image class="list_img" src="/static/images/qianbao.png" alt="" />
              <p class="sizea">我的面试</p>
            </div>
            <image class="list_img" src="/static/images/arrow-right-copy-copy-copy.png" alt="" />
          </li>
          <li class="ls">
            <div class="list_one">
              <image class="list_img" src="/static/images/qiaquan.png" alt="" />
              <p class="sizea">我的卡券</p>
            </div>
            <image class="list_img" src="/static/images/arrow-right-copy-copy-copy.png" alt="" />
          </li>
          <li class="ls" @click="a">
            <div class="list_one">
              <image class="list_img" src="/static/images/hangcheng.png" alt="" />
              <p class="sizea">我的行程</p>
            </div>
            <image class="list_img" src="/static/images/arrow-right-copy-copy-copy.png" alt="" />
          </li>
        </ul>
      </div>



      <view v-if="falg==true" class="dialog">

      <div class="zhezhao">

        <button class="phone" open-type="getPhoneNumber" @getphonenumber="getphonenumber">绑定手机号来获取更优质的服务</button>

      </div>

    </view>
    </div>
</template>

<script>
import action from "../../api/request.js"
import store from "../../Mystore/store.js"
export default {
  computed: {
    phone(){
      return store.state.phone
    }
  },
  data:{
    falg:false
  },
  onLoad(){

    var that=this
    wx.getStorage({ //遮罩的显示与隐藏
      "key":"phone",
      success(res){
          store.commit({type:"phone",payload:res.data})
          that.falg=false
      },
      fail(err){
        that.falg=true
      }
    })
  },
    methods:{
          getphonenumber(e){
          var encry=e.target.encryptedData
          var iv=e.target.iv
          action.phoneNumber(iv,encry)
          this.falg=false
        },
        no(){
          wx.navigateTo({url:"/pages/List/main"})
        }
    }
}
</script>

<style>
.mypage{
  width:100%;
  height:100%;
  display:flex;
  flex-direction:column;
}
.ls{
  padding:15px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:6px;
}
.sizea{
  padding-left:12px;
  font-size:15px;
}
.a{
  flex:1;
  background-color:white;
  padding-top:20px;
}
.avitar{
  width:45px;
  height:45px;
  display: block;
  margin:0 auto;
  padding:10px;
  background-color:orangered;
  border-radius:50%;
}
.list_img{
  width:45rpx;
  height:45rpx;
  display:flex;
}
.list_one{
  display:flex;
}
.top_user{
  width:100%;
  height:200px;
 	background-color:#f5f5f5;
  display:flex;
  justify-content:center;
  align-items: center;
}
.dls{
    margin-top:45px;
}
.phone_number{
  padding-top:10px;
  font-size:15px;
}
.dialog{
  width:100%;
  height:100%;
  background-color:rgba(0, 0, 0, .5);
  position:absolute;
  left:0;
  top:0;
  z-index:999;
}

.phone{
  position: absolute;
  left:50%;
  top:50%;
  background-color:orange;
  width:80%;
  transform:translate(-50%,-50%);
  font-size:15px;
}

</style>
