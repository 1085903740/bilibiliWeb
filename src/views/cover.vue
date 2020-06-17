<template>
  <div @click="pathpush">
    <div class="detailItem">
      <div class="imgparent">
        <img :src="detailitem.img" alt="" style="width:100%;height:100%">
        <div class="bottom">
          <div class="playbox">
            <div class="icon-play2"></div>
            <span class="video">400</span>
          </div>
          <div class="filebox">
            <div class="icon-file-text"></div> 
            <span class="comnent">{{!detailitem.commentlen?66:detailitem.commentlen}}</span>
          </div>
        </div>
      </div>
      <p>{{detailitem.name}}</p>
    </div>
  </div>
</template>

<script>

export default {
  props:['detailitem'],
  methods:{
    pathpush(){
      if(this.$route.path != `/article/${this.detailitem.id}`){
        this.$router.push(`/article/${this.detailitem.id}`)
      }
    }
  }
}
</script>

<style lang="less">
  .detailItem {
    p{
      font-size: 1.6vw;
    }
    .imgparent {
      position: relative; 
      .bottom {
        position: absolute;
        bottom: 10px;
        margin-bottom: 0px;
        padding: 0px;
        background:linear-gradient(0deg,rgba(0,0,0,.85),transparent);
        color: white;
        width: 100%;
        display: flex;
        justify-content: space-between;
        .playbox {
          font-size: 1.6vw;
          display: flex;
          align-items: center;
        }
        .filebox {
          font-size: 1.6vw;
          display: flex;
          align-content: center;
        }
      }
    }

  }
  

</style>