<template>
  <div class="comment">
    <p class="comment-title">
      <span>评论</span>
      <span>({{datalength}})</span>
    </p>
    <div class="commentMyinfo">
      <img :src="myuser.user_img" v-if="myuser">
      <img src="../../assets/default_img.png" v-else>
      <input type="text" placeholder="说点什么吧" ref="Postipt" v-model="comcontent">
      <button @click="cmmentPublish">发表</button>
    </div>
  </div>
</template>
<script>
export default {
  props:['datalength'],
  data(){
    return {
      myuser:null,
      comcontent:''
    }
  },  
  methods:{
    async myUserinfo(){
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.myuser = res.data[0]
    },
    cmmentPublish(){
      if(!this.myuser && !localStorage.getItem('token') && !localStorage.getItem('id')){
        this.$msg.fail('请先登录')
        return
      }
      this.$emit('Postcomment',this.comcontent)
      this.comcontent = ''
    },
    focusIpt(){
      this.$refs.Postipt. focus()
    }
  },
  created(){
    if(localStorage.getItem('token')){
      this.myUserinfo()
    }
  }
}
</script>
<style lang="less">
  .comment {
    padding: 4vw 1.333vw 0 1.333vw;
    .comment-title {
      span:nth-child(2) {
        color: #aaa;
        margin-left: 1.333vw;
      }
    }
    .commentMyinfo {
      padding: 1.333vw 0;
      display: flex;
      img {
        width: 7vw;
        height: 7vw;
        border-radius: 50%;
      }  
      input {
        outline:none;
        border: 0;
        border-radius: 4vw;
        background-color: #f4f4f4;
        margin-left: 1.333vw;
        font-size: 1.6vw;
        padding: 0vw 2.667vw 0vw 2vw;
        margin-left: 2vw;
        width: 53.333vw;
      }
      button {
        outline: none;
        border: 0;
        border-radius: 12px;
        background-color: #fb7299;
        color: white;
        font-size: 1.6vw;
        padding: 0 2vw;
      }
    }
  }
</style>