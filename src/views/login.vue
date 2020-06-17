<template>
  <div>
    <loginTop middleTop="登录bilbili" rightTop="注册"/>
    <loginText label="账号"
               placeholder="请输入账号"
               rule="^.{6,16}$"
               @inputChange="res => model.username = res"
               style="margin:4.167vw 0"/>
    <loginText label="密码"
               placeholder="请输入密码"
               type="password"
               rule="^.{6,16}$"
               @inputChange="res => model.password = res"/>
    <loginBtn btntext="登录" @registerSubmit="registerSubmit"/>
  </div>
</template>

<script>
import loginTop from '../components/common/loginTop.vue'
import loginText from '../components/common/loginText.vue'
import loginBtn from '../components/common/loginBtn.vue'
export default {
  data(){
    return {
      model:{
        username:"",
        password:""
      }
    }
  },
  components:{
    loginTop,
    loginText,
    loginBtn
  },
  methods:{
    async registerSubmit(){
      let rulg = /^.{6,16}$/
      if(rulg.test(this.model.username) && rulg.test(this.model.password)){
        const res= await this.$http.post('/login',this.model)
        this.$msg.fail(res.data.msg);
        if(res.data.code == 301 || res.data.code == 302){
          return
        }
        localStorage.setItem('id',res.data.id);
        localStorage.setItem('token',res.data.token);
        setTimeout(() => {
          this.$router.push('/userinfo');
        })

      }else{
        this.$msg.fail("格式不正确，请重新输入");
      }
    }
  }
  
}
</script>

<style>

</style>