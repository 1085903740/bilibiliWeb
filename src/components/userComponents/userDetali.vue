<template>
  <div class="userDetail">
    <div>
      <div class="user_img">
        <img :src="model.user_img" alt="model.user_img" v-if="model.user_img">
        <img src="../../assets/default_img.png" alt v-else/>
      </div>
      <div class="user_edit">
        <div>
          <p>
            <span>0</span>
            <span class="user-text">粉丝</span>
          </p>
          <p>
            <span>54</span>
            <span class="user-text">关注</span>
          </p>
          <p>
            <span>0</span>
            <span class="user-text">获赞</span>
          </p>
        </div>
        <div @click="$router.push('/edit')">
          <div class="user-editbtn" >编辑资料</div>
        </div>
      </div>
    </div>
    <div>
      <h4>{{model.username}}</h4>
      <p v-if="model.user_desc">{{model.user_desc}}</p>
      <p v-else>这个人很懒，什么都没有写</p>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    model:Object
  }
};
</script>

<style scoped lang="less">
.userDetail {
  background: white;
  padding: 0 12px;
  > div:nth-child(1) {
    display: flex;
    .user_img {
      margin-right: 20px;
      img {
        height: 85px;
        width: 85px;
        border-radius: 50%;
      }
    }
    .user_edit {
      flex: 1;
      div:nth-child(1) {
        margin-top: 10px;
        display: flex;
        p {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          flex: 1;
          font-size: 13px;
          .user-text {
            color: #aaa;
          }
        }
        p:nth-child(1),
        p:nth-child(2) {
          border-right: 1px solid #ccc;
        }
      }
      div:nth-child(2) {
        padding: 2px 10px;
        .user-editbtn {
          border: 1px solid #fb7a9f;
          border-radius: 3px;
          color: #aaa;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  >div:nth-child(2) { 
    h4 {
      margin: 0;
    }
    p {
      font-size:16px;
      color: #b8b8b8;
      margin-top: 5px;
      padding-bottom: 10px;
    }
    div {
      margin: 5px 0;
      span {
        margin-left: 10px;
        font-size: 20px;
        color: #a2a2a2;
      }
    }
  }
}
</style>