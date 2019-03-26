<template>


      <ul class="uls">
        <scroll-view class="scroll" scroll-y="true" scroll-with-animation :scroll-into-view="toView" >
            <li class="lis" v-for="(item,index) in  data" :data-ind="item[0]" :key="index">
          <h6 :id="item[0]"   class="ASize">{{item[0]}}</h6>
           <div class="imgulr">
              <image class="logo"  :src="item.CoverPhoto"/>
              <p class="name">{{item.Name}}</p>
           </div>
        </li>
        </scroll-view>

          <div class="divs">
          <p v-for="(items,index) in num" :key="index" @click="to(index)">{{items}}</p>
        </div>

      </ul>

</template>

<script>
var arr=[]
export default {
      data:{
        data:[],
        toView:"A",
        num:['A','B','C','D','E','F','G','H','I','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
      },
      onLoad(){
        var that=this
        wx.request({
          url:"http://baojia.chelun.com/v2-car-getMasterBrandList.html",
          success:function(result){
            var Listdata=result.data.data
            Listdata.forEach((item,index)=>{
              if(arr.indexOf(item.Spelling.split('')[0])==-1){
                arr.push(item.Spelling.split('')[0])
              }
                arr.forEach((val,ind)=>{
                    if(val==item.Spelling.split('')[0]){
                        arr.push(item)
                  }
                })
            })
                that.data=arr
                console.log(that.data)
            }
        })
      },
      methods:{
        to(index){
            this.toView=this.num[index]
        }
      }
}
</script>

<style>
  ::-webkit-scrollbar{
  width:0;
  }
  .uls{
    width:100%;
    height:100%;
    display:block;
  }
  .divs{
    position: fixed;
    top:15px;
    right:15px;
    font-size:15px;
  }
  .ASize{
    width:100%;
    height:35px;
    overflow: hidden;
    color:red;
    font-weight:800;
  }
  .imgulr{
    width:100%;
    display:flex;
    align-items:center;
  }
  .logo{
    width:35px;
    height:35px;
    display:block;
  }
  .lis{
    width:100%;
    align-items:center;
  }
  .scroll{
    height:100%;
  }
</style>
