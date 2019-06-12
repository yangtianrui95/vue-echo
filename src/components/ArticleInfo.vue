<template>
  <div class="article-info-wrapper">
    <div class="play-count">{{audioData.sound.view_count}}播放</div>
    <div class="star-count">{{audioData.sound.like_count}}喜欢</div>
    <div class="set-bells">设为手机铃声</div>
  </div>
</template>


<style scoped lang="stylus">

  .article-info-wrapper {
    $height = toRem(102)
    $fontSize = toRem(24)
    $fontColor = #999

    display flex
    padding: 0 toRem(20)
    flex-direction row
    align-items center
    width: 100%
    height: $height
    font-size $fontSize
    color: $fontColor
    border-bottom: toRem(1) solid #f4f4f4

    .star-count {
      margin-left toRem(20)
    }

    .set-bells {
      color $primaryColor
      margin-left auto
    }
  }

</style>


<script>
  import {mapGetters, mapState, mapMutations} from 'vuex'

  export default {

    name: 'ArticleInfo',

    computed: {
      ...mapGetters(['audioData']),
    }

  }
</script>