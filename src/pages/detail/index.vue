<template>

           <ul class="olus">
          <li class="lose">
              <p class="map">面试地点:{{Listdata.company}}</p>
              <p class="map">联系电话:{{Listdata.phone}}</p>
              <p class="status">
                  <span class="start_time">{{Listdata.start_time}}</span>
                  <span class="size" >{{Listdata.status==1?'已放弃':Listdata.status==0?'已打卡':Listdata.status==-1?'未开始':""}}</span>
              </p>
          </li>
        </ul>


</template>

<script>
import fly from "flyio/dist/npm/wx"
var Fly=new fly
var openid=wx.getStorageSync('openid')
export default {
      data:{
          Listdata:[]
      },
      onLoad(options){
        var ids=options.id//详情页数据
        Fly.interceptors.request.use((request)=>{
     request.headers['openid']=openid
    //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
     return request;
      })
        Fly.get('http://123.206.55.50:7001/sign/'+ids).then((res)=>{
                this.Listdata=res.data.data
        }).catch((err)=>{
          console.log(err)
        })
      }
}
</script>

<style lang="scss">
    page{
        width:100%;
        height:100%;
        display: block;
    }
      .uls{
    width:100%;
    height:45px;
    display: block;
    display:flex;
    justify-content:space-around;
  }
  .olus{
    padding:5px;
    padding-left:20px;
    margin-top:10px;
    width:100%;
    display:block;
    box-shadow:5px #f5f5f5;
    box-sizing:border-box;
  }
  .map{
    font-size:16px;
    margin-bottom:10px;
  }
  .lis{
    height:45px;
    line-height:45px;
    text-align:center;
    font-size:15px;
  }
  .active{
    color:blue;
    border-bottom:1px solid blue;
  }
  .status{
    display: block;
    width:100%;
    display:flex;
    justify-content:space-between;
  }
  .size{
    padding-right:30rpx;
    font-size:16px;
  }
  .lose{
    margin-bottom:15px;
    padding-bottom:10px;
    border-bottom:1px solid #ccc;
  }
</style>
