<template>
  <div class="container">
    <span>没有更多了:(</span>
  </div>
</template>

<script>
  export default {
    name: "NomoreContent"
  }
</script>

<style scoped lang="stylus">
  .container {
    $height = toRem(100)
    width: 100%
    height $height
    background: white
    text-align center
    line-height $height

    span {
      font-size toRem(30)
      color #676767
    }
  }
</style>