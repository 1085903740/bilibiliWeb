<template>
  <div @click="bannerClick">
    <div class="editbanner">
      <span>{{left}}</span>
      <span><slot name="right"></slot></span>
    </div>
  </div>
</template>

<script>

export default {
  props:['left'],
  methods:{
    bannerClick(){
      this.$emit('bannerClick')
    }
  }
}
</script>

<style>
  .editbanner {
    background-color: white;
    color: #333;
    padding: 4.167vw;
    font-size: 3.889vw;
    border-bottom: 0.278 solid #eee;
    display:flex;
    align-items: center;
    justify-content: space-between;
  }
</style>