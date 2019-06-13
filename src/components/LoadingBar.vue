<template>
  <div class="loading-wrapper">
    <div class="container">
      <div class="content"></div>
    </div>
  </div>
</template>


<style scoped lang="stylus">
  .loading-wrapper {
    background: white
    display flex
    align-items center
    justify-content center
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%

    .container {
      display flex
      align-items center
      justify-content center
      background: #999
      opacity .5
      width: toRem(100)
      height: toRem(100)
      border-radius toRem(10)

      div {
        $size = toRem(40)
        border-radius 100%
        width: $size
        height: $size
        border: toRem(5) solid #efefef
        border-bottom-color transparent
        animation 1s loading infinite linear
      }
    }
  }

  @keyframes loading {
    from {
      transform rotate(0)
    }
    to {
      transform rotate(360deg)
    }
  }
</style>

<script>
  export default {
    name: 'LoadingBar'
  }
</script>