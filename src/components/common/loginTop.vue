<template>
  <div>
    <div class="loginTop">
      <div></div>
      <div>{{middleTop}}</div>
      <div @click="$router.push('/register')">{{rightTop}}</div>
    </div>
  </div>
  
</template>

<script>

export default {
  props:['middleTop','rightTop']
}
</script>

<style>
  .loginTop {
    height: 45px;
    background-color: white;
    display: flex;
  }
  .loginTop div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.133vw;
  }
</style>