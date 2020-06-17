<template>
  <div class="editViews" v-if="model">
    <div style="margin-bottom:10px"><navbar/></div>
    <div class="uploadfile">
      <van-uploader :after-read="afterRead" preview-size="100vw" class="uploadimg"/>
      <edit-banner left="头像" slot="right">
        <img :src="model.user_img" slot="right" v-if="model.user_img">
        <img src="../assets/default_img.png" slot="right" v-else>
      </edit-banner>
    </div>
    <edit-banner left="昵称" @bannerClick="show = true">
      <a href="javascript:;" slot="right">{{model.name}}</a>
    </edit-banner>
    <edit-banner left="账号" slot="right">
      <a href="javascript:;" slot="right">{{model.username}}</a>
    </edit-banner>
    <edit-banner left="性别" slot="right" @bannerClick="gendershow = true">
      <a href="javascript:;" slot="right">{{model.gender == 1?'男':'女'}}</a>
    </edit-banner>
    <edit-banner left="个性签名" slot="right" @bannerClick="textshow = true">
      <a href="javascript:;" slot="right">{{model.user_desc}}</a>
    </edit-banner>
    
    <div class="editback" @click="$router.push('userinfo')">返回个人中心</div>
    <van-dialog v-model="show"
                title="昵称"
                @confirm="confirmClick"
                @cnacel="content = ''"
                show-cancel-button> 
      <van-field v-model="content" autofocus />
    </van-dialog>

    <van-dialog v-model="textshow"
                title="个性签名"
                @confirm="textareaClick"
                @cnacel="content = ''"
                show-cancel-button> 
      <van-field v-model="content" type="textarea" autofocus />
    </van-dialog>
    <van-action-sheet v-model="gendershow" cancel-text="取消" :actions="actions" @select="onSelect" />
    
  </div>
</template>

<script>

import navbar from '../components/common/navbar.vue'
import editBanner from '../components/common/editBanner.vue'
export default {
  data(){
    return {
      model:{},
      show:false,
      textshow:false,
      gendershow:false,
      content:"",
      actions:[
        {name:"男",val:1},
        {name:"女",val:0}
      ]
      
    }
  },
  components:{
    navbar,
    editBanner
  },
  methods:{
    async selectUser(){
       const res = await this.$http.get('/user/' + localStorage.getItem('id')) 
       this.model = res.data[0] 
    },
    async afterRead(file){
      const formdata = new FormData()
      formdata.append('file',file.file)
      const res = await this.$http.post('upload',formdata)
      console.log(res);
      this.model.user_img = res.data.url
      this.userUpdate();
    },
    async userUpdate() {
      const res = await this.$http.post('/update/' + localStorage.getItem('id'),this.model)
    },
    confirmClick(){
      this.model.name = this.content
      this.userUpdate()
      this.content = ""
    },
    textareaClick(){
      this.model.user_desc = this.content
      this.userUpdate()
      this.content = ""
    },
    onSelect(data){
      this.model.gender = data.val
      this.userUpdate()
      this.gendershow = false
    }
  },
  created(){
    this.selectUser()
  }
}
</script>

<style scoped lang="less">
  .editViews a{
    color: #333;
  }
  .editViews img {
    height: 46px;
    width: 46px;
    border-radius: 50%;
  }
  .uploadfile{
    position: relative;
    overflow: hidden;
    .uploadimg{
      opacity: 0;
      position: absolute;
    }
  }
  .editback {
    background: white;
    display: flex;
    justify-content: center;
    align-items: center; 
    color: #999;
    font-size: 4vw;
    margin-top: 5.556vw;
    padding: 4.167vw 0;
  }
</style>