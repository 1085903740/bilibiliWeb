<template>
  <div class="btnparent">
    <div class="loginbtn" @click="registerClick">{{btntext}}</div>
  </div>
</template>

<script>
export default {
  props:['btntext'],
  methods:{
    registerClick(){
      this.$emit('registerSubmit');
    }
  }
}

</script>

<style>
  .btnparent {
    padding: 15px 10px;
  }
  .loginbtn {
    height: 12.5vw;
    background-color: #ff9db5;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.444vw;
    border-radius: 6.25vw;
  }
</style>