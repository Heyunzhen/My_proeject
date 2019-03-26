import fly from "flyio/dist/npm/wx"
var Fly=new fly
var openid=""

function requestuid(codes){

  //给所有请求添加自定义header


  Fly.interceptors.request.use((request)=>{
    //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
    return request;
})
        Fly.post('http://123.206.55.50:7001/user/code2session',{  //登录的请求
            code:codes
          }).then((result) => {
             openid=result.data.data.openid
             wx.setStorage({
               key:'openid',
                data:result.data.data.openid
             })
          }).catch((err) => {
              console.log(err)
          });
}


function sign(arr){
  Fly.interceptors.request.use((request)=>{

    request.headers['openid']=openid
    //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
    return request;
    })
        Fly.post('http://123.206.55.50:7001/sign',{
          company:arr.company,
          phone:arr.phone,
          address:arr.address,
          start_time:arr.start_time,
          latitude:arr.latitude,
          longitude:arr.longitude,
          description:arr.description,
          form_id:arr.formid
        }).then((res)=>{
          console.log(res)
        }).catch((err)=>{
          console.log(err)
        })
}


export default {requestuid,sign}
