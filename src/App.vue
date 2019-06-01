<template>
  <div id="app">
    <router-link to="/home">TO HOME</router-link>
    <router-link to="/article">TO ARTICLE</router-link>
    <router-link to="/">TO ROOT</router-link>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue'
  import Toast from 'mint-ui/lib/toast'
  import Indicator from 'mint-ui/lib/indicator'

  export default {
    name: 'app',
    components: {
      HelloWorld
    },

    beforeMount: function () {
    }
  }

</script>

<style lang="stylus">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .msg
    $bg = red;
    height: 200px;
    background: $bg;

  a
    display block
    text-decoration none
    color: inherit

</style>
