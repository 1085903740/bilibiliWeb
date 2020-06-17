<template>
  <div class="navbar" >
     <div class="nav-logo" @click="pathjump('/home')">
       <img src="../../assets/logo.png" alt="">
     </div>
     <div class="nav-search">
       <p>
         请输入内容
        <van-icon class="ipt-icon" name="search"/>
       </p>
     </div>
     <div class="nav-down">
       <img :src="imgUrl" alt="model.user_img" class="touxiang" v-if="imgUrl" @click="pathjump('/edit')">
       <img src="../../assets/default_img.png" alt="" class="touxiang" @click="pathjump('/login')" v-else >
       <p class="btn-down">下载App</p>
     </div>
     
  </div>
</template>

<script>
export default {
 
    data(){
      return {
        imgUrl:""
      }
    },
  async mounted() {
    if(localStorage.getItem('token')){
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.imgUrl = res.data[0].user_img
    }
  },
  methods:{
    pathjump(path){
      if(this.$route.path != path){
        this.$router.push(path)
      }
    }
  }
}
</script>

<style>
  .navbar {
     height: 12.5vw;
     background-color: white;
     display: flex;
  }
  .nav-logo {
    width: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nav-logo img {
    width: 80%; 
  }
  .nav-search {
    flex:1;
    display: flex;
    align-items: center;
  }
  .nav-search p {
    background: #f4f4f4;
    position: relative;
    padding: 12px 0;
    width: 90%;
    border-radius: 10px;
    color: #aaa;
    font-size: 12px;
    line-height: 6px;
    padding-left: 30px;
  }
  .nav-search .ipt-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translate(0,-50%);
    color: #aaa;
  }
  .nav-down {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nav-down .touxiang {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
   .nav-down .btn-down{
     font-size: 13px;
     background: #fb7299;
     color: white;
     border-radius: 3px;
     padding: 5px 10px;
     margin: 0 8px;
  }
  
</style>