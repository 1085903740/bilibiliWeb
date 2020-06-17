<template>
  <div id="app">
    <keep-alive>
     <router-view v-if="$route.meta.keepalive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepalive" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-size: 1.867vw;
  box-sizing: border-box;
  background: #f4f4f4;
}
p {
  margin: 0;
  padding: 0; 
}
</style>
