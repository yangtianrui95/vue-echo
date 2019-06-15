<template>
  <div v-infinite-scroll="onLoadMore">
    <div class="container" v-if="!loading">
      <!--使用prop向子组件传递数据-->
      <music-banner :list="musicBanner"></music-banner>
      <div class="recommend-title">echo每日推荐</div>
      <div class="wrapper">
        <div class="playAll" @click="playAll">
          <i class="my-icon-arrow"></i>
          一键播放
        </div>
      </div>
      <music-list :list="musicList"></music-list>
      <nomore-content v-if="loadEnd"></nomore-content>
    </div>
    <loading-bar v-if="loading"></loading-bar>
  </div>
</template>


<style lang="stylus" scoped>

  $fontSize = 0.32rem

  .recommend-title {
    width: 3.2rem
    height: 0.7rem
    font-size $fontSize
    text-align center
    margin: 10px auto
    color: #639e5e
    border-radius 0.35rem
    background: #d6ffd6
    line-height 0.7rem
  }

  .wrapper {
    position: relative
  }

  .playAll {
    font-size $fontSize
    position: absolute
    left 0
    color: white
    padding: toRem(5) toRem(25)
    border-radius toRem(25)
    background: #6ed56c
    top: toRem(50)

    i {
      background: white
      color $primaryColor
      border-radius 100%
    }
  }
</style>

<script>
  import MusicList from '@/components/MusicList.vue'
  import MusicBanner from '@/components/MusicBanner.vue'
  import LoadingBar from '@/components/LoadingBar.vue'
  import NomoreContent from '@/components/NomoreContent.vue'
  import net from '@/net'
  import {mutation} from '@/store'
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: 'index',
    data() {
      return {
        musicList: [],
        musicBanner: [],
        playing: false,
        loading: true,
        currentPage: 0,
        loadMoreOnGoing: false,
        loadEnd: false,
      }
    },

    computed: {
      ...mapState({
        audio_data: state => state.audio.data
      }),

      ...mapState(['isPlaying']),
    },

    created() {
      console.log('index.vue created this => ', this);
    },

    mounted() {
      console.log('index.vue mount');
      this.getBannerData();
      this.getListData();
    },

    // 监听变量变化
    watch: {
      audio_data() {
        console.log('watch audio_data');
      },
    },

    methods: {
      ...mapMutations([
        mutation.SET_PLAY_LIST,
        mutation.SET_AUDIO_DATA
      ]),

      onLoadMore() {
        if (this.loading || this.loadMoreOnGoing || this.loadEnd) {
          console.log('ignore onloadmore');
          return;
        }
        console.log('onloadmore ', this.currentPage);
        this.loadMoreOnGoing = true;
        net.getList(this.currentPage + 1)
          .then(response => {
            if (!response || !response.data || !response.data.length) {
              this.loadEnd = true;
              this.loadMoreOnGoing = false;
              return;
            }
            console.log('#####loadmore currentPage' + (this.currentPage + 1) + '#####', response);
            this.currentPage++;
            this.loadMoreOnGoing = false;
            response.data.forEach(item => this.musicList.push(item));
          })
          .catch(err => {
            console.log('#####loadmoreError#####', err);
            this.loadEnd = true;
            this.loadMoreOnGoing = false;
          })
      },

      onPlayStatusChange(val) {
        this.playing = val;
      },

      playAll() {
        console.log('playAll');
        this[mutation.SET_PLAY_LIST]({
          list: this.musicList,
          needPlay: true
        });
      },

      getBannerData() {
        net.getBanner().then(response => {
          console.log(response);
          if (response.code) {
            return;
          }
          console.log('setBanner props');
          this.musicBanner = response.data;
        }).catch(err => {
          console.error(err);
        })
      },

      getListData() {
        this.loading = true;
        net.getList(this.currentPage + 1).then(response => {
          console.log(response);
          if (response.code) {
            return;
          }
          this.musicList = response.data;
          this.loading = false;
          this.currentPage++;
          this[mutation.SET_PLAY_LIST] ({
            list: this.musicList,
            needPlay: false
          });
        }).catch(err => {
          console.error(err);
        })
      }
    },

    components: {
      MusicList, MusicBanner, LoadingBar, NomoreContent
    }
  }
</script>
