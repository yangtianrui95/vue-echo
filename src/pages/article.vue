<template>
  <div class="article-wrapper" v-if="audioData && audioData.sound">
    <user-info></user-info>
    <div class="play-panel">
      <img :src="audioData.sound.pic_500" alt="">
      <div class="progress-num">
      </div>
      <div class="control-panel">
        <div class="play-status"> {{isPlaying ? '暂停' : '播放'}} </div>
        <div class="sound-info">
          <div>{{audioData.sound.name}}</div>
          <span class="sound-author">{{audioData.sound.user.name}}</span>
          <span>发布在</span>
          <span class="sound-channel">{{audioData.sound.channel.name}}</span>
          <span>频道</span>
        </div>
      </div>
    </div>
    <article-info></article-info>
    <article-lyric></article-lyric>
  </div>
</template>

<style scoped lang="stylus">
  .article-wrapper {
    width: 100%
    background: #f6f6f6
    position relative

    .play-panel {
      $controlHeight = toRem(122)
      position relative
      color white

      img {
        width: 100%
        height: toRem(615)
        margin: 0
      }

      .progress-num {
        position absolute
        width: 100%
        bottom: $controlHeight
        height: toRem(32)
        background: rgba(0, 0, 0, 0.2)
      }

      .control-panel {
        padding: 0 toRem(24)
        display flex
        align-items center
        width: 100%
        position: absolute
        background: rgba(0, 0, 0, 0.5)
        bottom: 0
        height: $controlHeight

        .play-status {
          $fontSize = toRem(20)
          $size = toRem(78)
          width: $size
          height: $size
          line-height $size
          text-align center
          border-radius 100%
          font-size $fontSize
          color: $primaryColor
          border: toRem(2) solid $primaryColor
          margin-right toRem(24)
        }

        .sound-info {
          font-size toRem(29)
          span {
            font-size toRem(24)
            margin: 0 toRem(3)
            &.sound-channel, &.sound-author {
              color $primaryColor
              margin: 0
            }
          }
        }
      }
    }
  }
</style>

<script>
  import {mapGetters, mapState, mapMutations} from 'vuex'
  import {mutation} from '@/store'
  import net from '@/net'
  import UserInfo from "../components/UserInfo.vue";
  import ArticleInfo from "../components/ArticleInfo.vue";
  import ArticleLyric from "../components/ArticleLyric.vue";

  export default {
    name: 'article',
    data() {
      return {}
    },

    components: {
      UserInfo,
      ArticleInfo,
      ArticleLyric
    },

    computed: {
      ...mapGetters(['audioData']),

      id() {
        return this.$route.query.id;
      },

      isPlaying() {
        return false;
      }
    },

    created() {
      console.log('article created', this.$route);
      this.getMusicData(this.id);
    },

    mounted() {
      console.log('article mounted');
    },

    methods: {
      ...mapMutations([mutation.SET_AUDIO_DATA]),
      getMusicData() {
        console.log('getMusicData');
        net.getDetail(this.id)
          .then(response => {
            if (!response.code) {
              console.log(response);
              this[mutation.SET_AUDIO_DATA](response.data);
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    },

    // FIXME keep-alive造成mounted/created不会回调，只能在此处监听，需修复
    watch: {
      // 监听路由变化
//      $route() {
//        console.log('$route change', this.$route);
//        if (this.$route.name === 'article') {
//          console.log('enter article');
//          this.id = this.$route.query.id;
//          this.getMusicData();
//        }
//      }
    }
  }
</script>