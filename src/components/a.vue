<template>
  <div class="abc">這是一個組建</div>
</template>

<script>
export default {
  props:{
      list:{
        type:null,
        default:""
      }
  },
  onLoad(){
      console.log(this.list)
  }
}
</script>

<style>
  .abc{
    display:block;
    width:100%;
    height:45px;
    background-color:red;
  }
</style>
