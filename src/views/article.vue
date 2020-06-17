<template>
  <div v-if="model">
    <navbar/>
    <div class="detailinfo">
      <div class="video">
        <video :src="model.content" controls></video>
      </div>
      <div class="detailinfotext">
        <div>
          <span>{{model.category.title}}</span>
          <span>{{model.name}}</span>
        </div>
        <div>
          <span>{{model.userinfo.name}}</span>
          <span>124.4万次观看</span>
          <span>4920弹幕</span>
          <span>{{model.date}}</span>
        </div>
        <div>
          <p @click="collectionClick" :class="{activeColor:collectionActive}">
            <span class="icon-star-full"></span>
            <span>收藏</span>
          </p>
          <p @click="subscriptClick" :class="{activeColor:subscriptActive}">
            <span class="icon-box-add"></span>
            <span>关注</span>
          </p>
          <p>
            <span class="icon-redo2"></span>
            <span>分享</span>
          </p>
        </div>
      </div>
      <div class="detailoarent">
        <cover class="detailitem" v-for="(item,index) in commendList" :key="index" :detailitem="item" /> 
      </div>
      <commentTitle :datalength="lens" @Postcomment="PostSuccess" ref="commentIpt"/>
      <comment @lengthselect="len => lens=len" ref="commentPublish" @publishClick="PostChildClick"/>
    </div>
 
  </div>
</template>

<script>
import navbar from '../components/common/navbar.vue'
import cover from './cover.vue'
import commentTitle from '../components/article/commentTitle.vue'
import comment from '../components/article/comment.vue'
export default {
  data(){
    return {
      model:null,
      commendList:null,
      myuser:null,
      lens:null,
      Postcom:{
        comment_content:'',
        comment_date:'',
        parent_id:null,
        article_id:null
      },
      collectionActive:null,
      subscriptActive:null
    }
  },
  components:{
    navbar,
    cover,
    commentTitle,
    comment
  },
  methods:{
      async articleitemDate(){
        const res = await this.$http.get('/article/' + this.$route.params.id)
        this.model = res.data[0]
        if(this.model){
          this.subscriptInit()
        }
      },
      async commentData(){
        const res = await this.$http.get('/commend')
        this.commendList = res.data 
      },
      async PostSuccess(res){
        const date = new Date()
        let m = date.getMonth()+1
        let d = date.getDate()
        if(m<10){
          m = '0' + m
        }
        if(d<10){
          d = '0' + d
        }
        let str = `${m}-${d}`
        this.Postcom.comment_date = str
        this.Postcom.comment_content = res 
        this.Postcom.article_id = this.$route.params.id
        const resutl = await this.$http.post('/comment_post/' + localStorage.getItem('id'),this.Postcom)
        if(resutl.status == 200){
          this.$msg.fail('发表成功')
         }
        this.$refs.commentPublish.commentData()
      },
      PostChildClick(id){
        this.Postcom.parent_id = id
        this.$refs.commentIpt.focusIpt()
      },
      async collectionClick(){
        if(localStorage.getItem('token')){
          const res = await this.$http.post('/collection/' + localStorage.getItem('id'),{
            article_id:this.$route.params.id})
            
          if(res.data.msg == '收藏成功'){
            this.collectionActive = true
          }else {
            this.collectionActive = false
          }
          this.$msg.fail(res.data.msg)
        }
      },
      async subscriptClick(){
        if(localStorage.getItem('token')){
          const res = await this.$http.post('/sub_scription/' + localStorage.getItem('id'),{
            sub_id:this.model.userid})
            
          if(res.data.msg == '关注成功'){
            this.subscriptActive = true
          }else {
            this.subscriptActive = false
          }
          this.$msg.fail(res.data.msg)
        }
      },
      async collectionInit(){
        if(localStorage.getItem('token')){
          const res = await this.$http.get('/collection/' + localStorage.getItem('id'),{
            params:{
              article_id:this.$route.params.id
            }
          })
          this.collectionActive = res.data.success
        }
      },
      async subscriptInit(){
        if(localStorage.getItem('token')){
          const res = await this.$http.get('/sub_scription/' + localStorage.getItem('id'),{
            params:{
              sub_id:this.model.userid
            }
          })
          this.subscriptActive = res.data.success
        }
      }
  },
  created(){
    this.articleitemDate()
    this.commentData() 
    this.collectionInit()
    
  },
  watch:{
    $route(){
      this.articleitemDate()
      this.commentData() 
      this.collectionInit()
    }
  }
}
</script>

<style lang="less">
  .detailinfo {
    background-color: white;
    .detailinfotext{
      padding: 4.169vw;
      div:nth-child(1){
        span:nth-child(1){
          padding: 1.333vw 1.333vw;
          color: #fb7299;
          background-color: #f4f4f4;
          border-radius: 1.333vw;
        }
      }
      div:nth-child(2){
        padding: 3.777vw 2.778vw;
        span {
          color: #aaa;
          font-size: 1.6vw;
        }
        span:nth-child(1){
          color: black;
          font-size: 0.533vw;
          padding-right: 1.333vw;
        }
      }
      div:nth-child(3) {
        padding: 0 1.333vw;
        display: flex;
        align-items: center;
        p {
          margin-right: 2vw;
          color: #757575;
        }
        span:nth-child(1) {
          font-size: 2.8vw;
          padding-right: 0.4vw;
        }
        span:nth-child(2) {
          font-size: 1.733vw;
        }
        .activeColor {
          color: #fb054a;
        }
      }
    }
    .video {
      width: 100%;
      video {
        width: 100%;
      }
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