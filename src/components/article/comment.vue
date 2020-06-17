<template>
  <div class="commentParent">
    <div v-for="(item,index) in commentList" :key="index">

      <div class="commentItem">
        <div class="userimg">
          <img :src="item.userinfo.user_img" v-if="item.userinfo.user_img" />
          <img src="../../assets/default_img.png" v-else>
        </div>
        <div class="commentContent">
          <p>
            <span>{{item.userinfo.name}}</span>
            <span>{{item.comment_date}}</span>
          </p>
          <div>{{item.comment_content}}<span class="publish" @click="publishClick(item.comment_id)">回复</span></div>
        </div>
      </div> <!-- 一级评论 -->

       <div style="padding-left:5vw"><commentItem @PostPublish="publishClick" :commentChild="item.child"/> </div> <!--二级及n级评论 -->

    </div>
  </div>
</template>

<script>
import commentItem from './commentItem.vue'
export default {
  data(){
    return {
      commentList:null
    }
  },
  components:{
    commentItem
  },
  methods: {
    async commentData() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      this.$emit('lengthselect',res.data.length)
      this.commentList = this.changeCommentData(res.data)
    },
    changeCommentData(data){
      function fn(temp){
        let arr1 = []
        for(let i=0;i<data.length;i++){
          if(data[i].parent_id == temp){
            arr1.push(data[i])
            data[i].child = fn(data[i].comment_id)
          }
        }
        return arr1
      }
      return fn(null)
    },
    publishClick(id){
       this.$emit('publishClick',id)
      
    }
  },
  created() {
    this.commentData();
  }
};
</script>

<style lang="less">
.commentParent {
  padding: 1.333vw 1.333vw;
   >div {
     border-bottom: 0.133vw solid #e7e7e7;
     margin-bottom: 1.333vw;
  }
  .commentItem {
    display: flex;
    padding: 2.778vw 0;
    .userimg {
      margin-right: 2.778vw;
      
      img {
        width: 9.722vw;
        height: 9.722vw;
        border-radius: 50%;
      }
    }
  }
  .commentContent {
    position: relative;
    flex: 1;
    p {
      font-size: 3.611vw;
      color: #555;
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.289vw;
    }
    div {
      font-size: 3.611vw;
    }
    .publish {
      position: absolute;
      right: 0;
      color: red;
    }
  }
}
</style>