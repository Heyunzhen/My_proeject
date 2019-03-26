<template>


      <ul class="uls">

        <li class="lis" v-for="(item,index) in data" :key="index">
          <h6 class="ASize">{{item[0]}}</h6>
          {{item.Name}}
        </li>
      </ul>


</template>

<script>
var arr=[]
export default {
      data:{
        data:[]
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
      }
}
</script>

<style>
  .uls{
    width:100%;
    height:100%;
    display:block;
  }
  .ASize{
    color:red;
    font-weight:800;
  }

</style>
