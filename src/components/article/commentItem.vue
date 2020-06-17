<template>
  <div class="commentitems">
    <div class="commentItem" v-for="(item,index) in commentChild" :key="index">
      <div class="userimg">
        <img :src="item.parent_user_info.user_img" v-if="item.parent_user_info.user_img" />
        <img src="../../assets/default_img.png" v-else />
        <p>
          <span v-if="item.userinfo.name">{{item.userinfo.name}}</span>
          <span v-else>此用户无姓名</span>
          <span>{{item.comment_date}}</span>
        </p>
      </div>
      <div class="commentContent">
        <div v-if="!temp">{{item.comment_content}}<span class="publish" @click="postChild(item.comment_id)">回复</span></div>
        <div v-else>回复<span style="color:blue">{{item.parent_user_info.name}}</span>：{{item.comment_content}}<span class="publish" @click="postChild(item.comment_id)">回复</span></div>
      </div>  <!--二级评论-->

      <commentchildItem :commentChild="item.child" @postChild="postChild" :temp="true" /> 
    </div>
  </div>
</template>
<script>
export default {
  name: "commentchildItem",
  props: ["commentChild",'temp'],
  methods:{
    PostItemComment(id){
      this.$emit('postChild',id)
    },
    postChild(id){
       this.PostItemComment(id)
       this.$emit('PostPublish',id)
    }
  }
};
</script>

<style lang="less">
.commentitems {
  .commentItem {
    display: flex;
    flex-direction: column;
    .userimg {
      display: flex;
      img {
        margin:0 5px 10px 0;
      }
      p {
        font-size: 1.733vw;
        color: #555;
        display: flex;
        justify-content: space-between;
        flex: 1;
        margin-bottom: 0.667vw;
      }
    }
    .commentContent {
      position: relative;
      margin-bottom: 2.778vw;
      .publish {
        position: absolute;
        right: 2.8vw;
        color: red;
      }
    }
  }
  
}
</style>