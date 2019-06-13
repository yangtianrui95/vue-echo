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
    <div class="recommend">
      <div class="recommend-title">
        <a>相关推荐</a>
      </div>
      <music-list :list="recommendList"></music-list>
    </div>
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

  export default {
    name: 'article',
    data() {
      return {
        recommendList: []
      }
    },

    components: {
      UserInfo,
      ArticleInfo,
      ArticleLyric,
      MusicList
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
      this.getRecommendList();
    },

    mounted() {
      console.log('article mounted');
    },

    methods: {
      ...mapMutations([mutation.SET_AUDIO_DATA]),

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
              this[mutation.SET_AUDIO_DATA](response.data);
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
  }
</script>