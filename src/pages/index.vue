<template>
  <div>
    <!--使用prop向子组件传递数据-->
    <music-banner :list="musicBanner"></music-banner>
    <div class="recommend-title">echo每日推荐</div>
    <div class="wrapper">
      <div class="playAll" @click="playAll">一键播放</div>
    </div>
    <music-list :list="musicList"></music-list>
    <!--通过添加一个wrapper，让music-bar能够在列表位置-->
    <div class="music-bar-wrapper">
      <music-bar class="music-bar" :play="playing" @playStatusChange="onPlayStatusChange"></music-bar>
    </div>
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
    padding: 5px 30px
    border-radius 30px
    background: #6ed56c
    top: 50px
  }

  .music-bar-wrapper {
    .music-bar {
      position: fixed
      bottom: 0
    }
  }


</style>

<script>
  import MusicList from '@/components/MusicList.vue'
  import MusicBar from '@/components/MusicBar.vue'
  import MusicBanner from '@/components/MusicBanner.vue'
  import net from '@/net'
  import {mutation} from '@/store'
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: 'index',
    data: function () {
      return {
        musicList: [],
        musicBanner: [],
        playing: false
      }
    },

    computed: {
      ...mapState({
        audio_data: state => state.audio.data
      })
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

      onPlayStatusChange(val) {
        this.playing = val;
      },

      playAll: function () {
        console.log('playAll');
        this[mutation.SET_PLAY_LIST](this.musicList);
        this.playing = true;
      },

      getBannerData: function () {
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

      getListData: function () {
        net.getList(1).then(response => {
          console.log(response);
          if (response.code) {
            return;
          }
          this.musicList = response.data;
        }).catch(err => {
          console.error(err);
        })
      }
    },

    components: {
      MusicList, MusicBanner, MusicBar
    }
  }
</script>
