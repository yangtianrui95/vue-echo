<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!--通过添加一个wrapper，让music-bar能够在列表位置-->
    <div class="music-bar-wrapper">
      <music-bar class="container"></music-bar>
    </div>
  </div>
</template>

<script>
  import MusicBar from '@/components/MusicBar.vue'

  export default {
    name: 'app',
    components: {
      MusicBar
    },

    beforeMount: function () {
    }
  }

</script>

<style lang="stylus">
  .music-bar-wrapper {
    .container {
      position: fixed
      bottom: 0
    }
  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    // 去掉手指按下去的蓝色遮罩
    -webkit-tap-highlight-color rgba(0, 0, 0, 0)
    background: #f4f5f6
  }

  #app {
    background: white
    position relative
  }

  @media screen and (min-width: 768px) {
    html {
      width: 768px;
      margin: 0 auto;
    }
  }

  li, ul, ol {
    list-style none
  }

  *, *:before, *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  a {
    color inherit
    text-decoration none
  }
</style>
