<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {},

    beforeMount: function () {
    }
  }

</script>

<style lang="stylus">

  * {
    margin: 0;
    padding: 0;
  }

  body {
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
