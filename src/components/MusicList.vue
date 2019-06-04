<template>
  <ul class="list">
    <li class="list-item" v-for="item in list">
      <router-link class="item-link" :to="{path :'detail', query:{'id': item.sound.id}}">
        <div class="img-container">
          <img :src="item.sound.pic_500" alt="/">
          <div class="icon-hot"></div>
        </div>
        <div class="item-name">{{item.sound.name}}</div>
      </router-link>
      <div class="item-channel">
        <a class="item-channel-value">{{item.sound.channel.name}}</a>
        <div class="item-channel-label">频道</div>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="stylus">
  $fontSize = 16px

  .list {
    background: white
    display flex
  // 放不下的话，向下排列
    flex-wrap wrap
  // 指定主轴，即元素的排列方式
    flex-direction row
    font-size $fontSize

    .list-item {
      margin-bottom 10px
      width: 50%
      text-align center
      padding: 10px
    }

    .item-link {
      overflow: hidden
      display block
      width: 100%
      img {
        width: 100%
      }
    }

    .item-name {
      font-size 0.3rem
      text-overflow ellipsis
      white-space nowrap
      overflow: hidden
      width: 100%
      text-align left
    }

    .item-channel {
      color #7dd97f
      font-size 0.3rem
      text-align left
      
      div{
        color: black
        float: right
      }
    }
  }
</style>

<script>
  export default {
    name: 'MusicList',

    beforeMount: function () {
      console.log('MusicList.vue beforeMount');
      console.log(this.list);
    },


    mounted: function () {
      console.log('MusicList.vue mount')
    },

    props: {
      list: Array
    }
  }
</script>