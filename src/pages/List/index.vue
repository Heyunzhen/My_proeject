<!--  -->
<template>
  <div class="listPage">
        <ul class="uls">
          <li  v-for="(item,index) in List"  @click="addClass(index)" :class="index==ind?'lis active':'lis'" :key="index">{{item}}</li>
        </ul>

        <ul v-if="Listdata.length>0" class="olus">
          <li class="lose" v-for="(val,ind) in Listdata" :key="ind" :data-id="val.id" @click="detail">
              <p class="map">面试地点:{{val.company}}</p>
              <p class="map">联系电话:{{val.phone}}</p>
              <p class="status">
                  <span class="start_time">{{val.start_time}}</span>
                  <span class="size" >{{val.status==1?'已放弃':val.status==0?'已打卡':val.status==-1?'未开始':""}}</span>
              </p>
          </li>
        </ul>
  </div>
</template>

<script>
import fly from "flyio/dist/npm/wx"
var Fly=new fly
var openid=wx.getStorageSync('openid')
export default {
    data:{
        List:['全部','已打卡','未开始','已放弃'],
        ind:0,
        Listdata:[],
        status:0
    },
    methods:{
      addClass(inde){
          this.ind=inde
          if(inde==1){
              this.status=0
            }
          if(inde==2){
          this.status=-1
        }
          if(inde==3){
           this.status=1
          }
                Fly.interceptors.request.use((request)=>{
                  request.headers['openid']=openid
                //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
                return request;
                  })
                Fly.get('http://123.206.55.50:7001/sign?status='+this.status).then((res)=>{
                  this.Listdata=res.data.data
                }).catch((err)=>{
                  console.log(err)
                })
                if(inde==0){
                  Fly.interceptors.request.use((request)=>{
                  request.headers['openid']=openid
                //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
                return request;
                  })
                Fly.get('http://123.206.55.50:7001/sign').then((res)=>{
                  this.Listdata=res.data.data
                }).catch((err)=>{
                  console.log(err)
                })
                }
      },
      detail(e){
        wx.navigateTo({
          url:"/pages/detail/main?id="+e.currentTarget.dataset.id
        })
      }
    },
    onLoad(){
    var openid=wx.getStorageSync('openid')
    Fly.interceptors.request.use((request)=>{
     request.headers['openid']=openid
    //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
     return request;
      })
        Fly.get('http://123.206.55.50:7001/sign').then((res)=>{
          this.Listdata=res.data.data
        }).catch((err)=>{
          console.log(err)
        })
    }
}

</script>
<style lang='scss' >
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
