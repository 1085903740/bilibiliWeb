<template>
  <div>
    <navbar/>
    <img src="../assets/bannerTop_new.png" class="backimg">
    <div>
      <userDetail :model="model"/>
      <userArticle/>
    </div>
  </div>
</template>


<script>
import navbar from '../components/common/navbar.vue'
import userDetail from '../components/userComponents/userDetali.vue'
import userArticle from '../components/userComponents/userArticle.vue'
export default {
  data(){
    return {
      model:{}
    }
  },
  components:{
    navbar,
    userDetail,
    userArticle
  },
  methods:{
    async userinfoData(){
       const res = await this.$http.get('/user/' + localStorage.getItem('id')) 
       this.model = res.data[0] 
    }
  },
  created(){
    this.userinfoData()
  }
}
</script>

<style>
  .backimg {
    width: 100%;
    height: 100px;
  }
</style>