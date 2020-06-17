<template>
  <div class="home">
    <navbar/>
    <div class="categorytab"> 
      <div class="category-ico" @click="$router.push('/editcategory')"><van-icon name="setting-o" /></div>
      <van-tabs v-model="active" swipeable sticky>
        <van-tab v-for="(item,index) in category" :title="item.title" :key="index">
          <van-list v-model="item.loading" :immediate-check="false" 
                    :finished="item.finished" finished-text="没有更多了" @load="onLoad">
            <div class="detailoarent">   
              <cover v-for="(categoryitem,categoryindex) in item.list" 
                      :key="categoryindex"
                      :detailitem="categoryitem"
                      class="detailitem"/>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import navbar from '../components/common/navbar.vue'
import cover from './cover.vue'
export default {
  data(){
    return {
      active:0,
      category:[]
    }
  },
  components:{
    navbar,
    cover
  },
  methods:{
    async selectCategory(){
      if(localStorage.getItem('newCat')){
        return 
      } 
      const res = await this.$http.get('/category')
      this.changeCategory(res.data) 
      this.selectArticle()
    }, //获取导航数据，并调用changeCategory方法增加属性

    changeCategory(data){
      const category1 = data.map((item,index) => {
        item.list = []
        item.finished = false
        item.loading = false
        item.page = 0
        item.pagesize = 10
        return item
      })
      this.category = category1
      
    },//给导航数组的每个对象增加属性
    categoryItem(){
      const categoryitem = this.category[this.active]
      return categoryitem
    }, //实时获取用户聚焦的版块

    async selectArticle() {
      const categoryitem = this.categoryItem()

      const res = await this.$http.get('/detail/'+ categoryitem._id,{
        params:{
          page:categoryitem.page,
          pagesize:categoryitem.pagesize
        }
      })
       categoryitem.list.push(...res.data)
       categoryitem.loading = false
       if(res.data.length < categoryitem.pagesize){
         categoryitem.finished = true
       }
      },
      // console.log(res.data)
      // console.log(categoryitem)
    //调用categoryitem方法,调用对应的文章内容

    onLoad(){
      const categoryitem = this.categoryItem()
      setTimeout(() => {
        categoryitem.page += 1
        this.selectArticle()
      },1000)
    }
  },
  watch:{
    active(){
      this.selectArticle()
    }
  },
  created(){
    this.selectCategory()
  },
  activated(){
    if(localStorage.getItem('newCat')){
      let newCat = JSON.parse(localStorage.getItem('newCat'))
      this.changeCategory(newCat)
      this.selectArticle()
    }
  }
}
</script>

<style lang="less">
  .home {
    background-color: white;
  }
  .categorytab {
    position: relative;
    .category-ico {
      position: absolute;
      z-index: 5;
      right: 0;
      top: 4vw;
      padding: 0 1.333vw 0 4vw
    }
  }
  .detailoarent {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .detailitem {
      width: 45%;
      margin: 0.667vw 0;
    }
  }
</style>