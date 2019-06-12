<template>
  <div class="author-header" v-if="audioData && audioData.sound && audioData.sound.user">
    <div class="left-container">
      <img
          :src="audioData.sound.user.avatar_50" alt="">
      <div>{{audioData.sound.user.name}}</div>
    </div>
    <div class="right-container">
      <div class="user-fans-label">粉丝</div>
      <div class="user-fans-value">{{audioData.sound.user.followed_count}}</div>
    </div>
  </div>
</template>

<style scoped lang="stylus">

  .author-header {
    $usernameFontSize = toRem(33)
    $followersFontSize = toRem(25)
    background: white
    height toRem(112)
    display flex
    padding 0 toRem(30)

    .left-container {
      display flex
      flex-direction row
      align-items center

      img {
        width: toRem(73)
        height: toRem(73)
        border-radius 100%
      }

      div {
        margin-left toRem(30)
        white-space nowrap
        font-size $usernameFontSize
        color #555
      }
    }

    .right-container {
      width: 30%
      margin-left auto
      display flex
      flex-direction row
      align-items center
      justify-content center
      font-size $followersFontSize

      .user-fans-label {
        color #555
      }

      .user-fans-value {
        color #00ae05
      }
    }
  }
</style>

<script>
  import {mapGetters, mapState, mapMutations} from 'vuex'

  export default {
    name: 'UserInfo',
    computed: {
      ...mapGetters(['audioData']),
    }
  }
</script>