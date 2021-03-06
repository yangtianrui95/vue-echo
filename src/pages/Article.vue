<template>
  <div class="container">
    <div class="article-wrapper" v-if="!loading && audioData && audioData.sound">
      <user-info></user-info>
      <div class="play-panel">
        <img :src="audioData.sound.pic_500" alt="">
        <div class="progress-num">
          <span>{{audio.currentTime | sec2his}} / {{audio.duration | sec2his}}</span>
          <div class="progress" :style="{width: audioProgress}"></div>
        </div>
        <div class="control-panel">
          <div class="play-status" :class="isPlaying ? 'my-icon-pause' : 'my-icon-arrow'"></div>
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
      <div class="recommend">
        <div class="recommend-title">
          <a>相关推荐</a>
        </div>
        <music-list :list="recommendList"></music-list>
      </div>
    </div>
    <loading-bar v-if="loading"></loading-bar>
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

        span {
          left toRem(5)
          font-size 0.32rem
          position: absolute
        }

        .progress {
          background: rgba(110, 213, 108, 0.2)
          height: 100%
          border-right toRem(10) solid $primaryColor
        }
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
          $fontSize = .6rem
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

    .recommend {
      width: 100%
      margin-top toRem(20)
      background: white
      height: 100px

      .recommend-title {
        font-size toRem(29)
        text-align center
        padding: toRem(30) 0
        color $primaryColor

        a {
          border-bottom toRem(1) solid $primaryColor
          padding: 0 toRem(10)
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
  import MusicList from "../components/MusicList.vue";
  import LoadingBar from "../components/LoadingBar.vue";

  export default {
    name: 'article',
    data() {
      return {
        recommendList: [],
        loading: true
      }
    },

    components: {
      UserInfo,
      ArticleInfo,
      ArticleLyric,
      MusicList,
      LoadingBar
    },

    computed: {
      ...mapGetters(['audioData']),
      ...mapGetters(['audioProgress']),
      ...mapState(['isPlaying', 'audio']),

      id() {
        return this.$route.query.id;
      },
    },

    created() {
      console.log('article created', this.$route);
      this.initial();
    },

    mounted() {
      console.log('article mounted');
    },

    methods: {
      ...mapMutations([mutation.SET_AUDIO_DATA]),

      initial() {
        this.loading = true;
        this.getMusicData(this.id);
        this.getRecommendList();
      },

      getRecommendList() {
        net.getOther()
          .then(response => {
            console.log(response);
            if (!response.code) {
              this.recommendList = response.data;
            }
          })
      },

      getMusicData() {
        console.log('getMusicData');
        net.getDetail(this.id)
          .then(response => {
            if (!response.code) {
              console.log(response);
              this[mutation.SET_AUDIO_DATA]({
                data: response.data,
                needPlay: true
              });
            }
            this.loading = false;
          })
          .catch(err => {
            console.error(err);
          });
      }
    },

    watch: {
      $route(to, from) {
        console.log('$route change', arguments);
        if (this.$route.name !== 'article'
          || to.query.id === from.query.id) {
          return;
        }
        this.initial();
      }
    }
  }
</script>