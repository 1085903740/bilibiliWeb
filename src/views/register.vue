<template>
  <div>
    <loginTop middleTop="注册bilbili"/>
    <loginText label="姓名" style="margin:4.157vw 0;"
               placeholder="请输入姓名"
               rule="^.{6,16}$"
               @inputChange="res => model.name = res" />
    <loginText label="账号"
               placeholder="请输入账号"
               rule="^.{6,16}$"
               @inputChange="res => model.username = res"/>
    <loginText label="密码"
               placeholder="请输入密码"
               type="password"
               rule="^.{6,16}$"
               @inputChange="res => model.password = res" />
    <loginBtn btntext="注册" @registerSubmit="registerSubmit" />
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
        name:"",
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
      if(rulg.test(this.model.name) && rulg.test(this.model.username) && rulg.test(this.model.password)){
        const res= await this.$http.post('/register',this.model)
        this.$msg.fail(res.data.msg);
        console.log(res.data.id)
        localStorage.setItem('id',res.data.id)
        localStorage.setItem('token',res.data.objtoken)
        setTimeout(() => {
          this.$router.push('/userinfo')
        }, 1000);
      }else{
        this.$msg.fail("格式不正确，请重新输入");
      }
    }
  }
  
}
</script>

<style>

</style>