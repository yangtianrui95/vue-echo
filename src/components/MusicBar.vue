<template>
  <div class="wrapper" v-if="audio_data">
    <div class="music-bar">
      <img :src="audio_data.sound.pic_500" alt="">
      <div class="sound-info">
        <div class="sound-title">{{audio_data.sound.name}}</div>
        <div class="sound-author-name">{{audio_data.sound.user.name}}</div>
      </div>

      <div class="play-panel">
        <span @click="togglePlayList" class="my-icon-menu"></span>
        <span class="play" @click="onPlayClick" :class="isPlaying? 'my-icon-pause':'my-icon-arrow'"></span>
        <span @click="switchAudio" class="my-icon-next"></span>
      </div>
    </div>
    <div class="progress-bar" :style="`width:${audioProgress}`"></div>
    <!--弹出动画-->
    <transition name="slideTop">
      <div class="play-list" v-if="showPlayList">
        <div class="popup-header">
          <span class="clear">清空</span>
          <span class="list-tip">播放列表<span class="list-num">({{totalCount}}首)</span></span>
          <span class="more my-icon-more"></span>
        </div>
        <ul class="popup-list">
          <li v-for="(item, index) in playList" :key="index" @click="playItem(item)">
            <span :class="{active:isSelected(item)}">{{item.sound.name}}</span>
            <span class="delete my-icon-close"></span>
          </li>
        </ul>
      </div>
    </transition>
    <div class="mask" v-if="showPlayList" @click="showPlayList=false"></div>
    <audio autoplay :src="audio_data.sound.source" id="audio"></audio>
  </div>
</template>

<style scoped lang="stylus">
  $musicbarHeight = toRem(100)
  $primaryColor = #6ed56c
  $maskZIndex = 2
  $playListZIndex = 3
  $musicBarZIndex = 4
  $progressZIndex = 5

  // 尽量采取嵌套写法，防止类和外部定义的冲突
  .wrapper {
    .music-bar {
      z-index: $musicBarZIndex
      background: white
      width: toRem(768)
      height: $musicbarHeight
      display flex
      flex-direction row
      align-items center

      img {
        width: toRem(71)
        margin-left toRem(10)
        border: 1px solid #ccc
        box-shadow 0 0 2px #AAA
        height: toRem(71)
      }

      .sound-info {
        font-size 0.30rem
        margin-left toRem(10)
        overflow hidden

        /*设置字体省略*/
        .sound-title, .sound-author-name {
          white-space nowrap
          text-overflow ellipsis
          overflow hidden
        }
      }

      .play-panel {
        display flex
        align-items center
        font-size .55rem
        color: #666

        span {
          $size = toRem(70)
          align-items center
          justify-content center
          float left
          margin toRem(5) toRem(10)
          width: $size
          height: $size
          display flex
          border: 1px solid #aaa
          border-radius 100%
          cursor pointer
        }
        .play {
          width: toRem(75)
          height: toRem(75)
          font-size .7rem
        }
      }
    }
  }

  .slideTop-enter-active, .slideTop-leave-active {
    transition: all .3s;
    bottom: 0
  }

  .slideTop-enter, .slideTop-leave-to {
    opacity 0
  // 存在选择器被覆盖不生效问题
    bottom: 0 !important
    position absolute !important
  }

  .play-list {
    z-index: $playListZIndex
    font-size 0.33rem
    position absolute
    width: 100%
    bottom: $musicbarHeight
    background: white

    .popup-header {
      $marginToBoound = 15px
      text-align center
      margin-top $marginToBoound
      padding-bottom $marginToBoound
      border-bottom toRem(1) solid #f4f4f4
      span {
        color $primaryColor
        .list-num {
          font-size 0.3rem
        }
        &.clear {
          float: left
          margin-left $marginToBoound
        }
        &.more {
          float: right
          font-size 0.4rem
          margin-right $marginToBoound
        }
      }
    }

    .popup-list {
      max-height: 350px
      overflow scroll
    // 移除横向滚动条
      overflow-x hidden
      margin 0
      padding 0

      li {
        padding: 15px
        border-bottom: 1px solid #f4f4f4;
        cursor pointer
        .active {
          color: $primaryColor
        }
        .delete {
          color: #555
          float: right
        }
      }
    }
  }

  .mask {
    opacity 0
    width: 100%
    height: 100%
    position fixed
    top: 0
    left: 0
    z-index $maskZIndex
  }

  .progress-bar {
    position: absolute
    height: toRem(3)
    background: $primaryColor
    bottom: 0
    z-index $progressZIndex
  }
</style>

<script>
  import {mapMutations, mapState, mapGetters} from 'vuex'
  import {mutation} from '@/store'

  export default {
    name: 'MusicBar',

    data() {
      return {
        showPlayList: false
      }
    },

    methods: {
      ...mapMutations([
        mutation.SET_AUDIO_ELE,
        mutation.SET_AUDIO_DATA,
        mutation.SET_AUDIO_TIME,
        mutation.SET_AUDIO_DURATION,
        mutation.SET_PLAY_STATUS,
      ]),

      isSelected(item) {
        return item === this.audio_data;
      },

      togglePlayList() {
        this.showPlayList = !this.showPlayList;
      },

      onPlayClick() {
        console.log('onPlayClick', this.isPlaying);
        // vue中父向子传递的数据是单向数据流，子组件中需要避免修改props中的值
        // 使用emit发送事件，让父组件更新值
        //this.$emit('playStatusChange', !this.play);
        // 直接使用vuex中的状态，便于向其他组件传递
        this[mutation.SET_PLAY_STATUS](!this.isPlaying);
      },

      audioInit() {
        this.$nextTick(() => {
          console.log('audioInit ---> $nextTick', this.$el);
          const audio = this.$el.querySelector('#audio');
          audio.oncanplay = () => {
            console.log('audio element oncanplay', audio.duration);
            this[mutation.SET_AUDIO_DURATION](audio.duration);
          };
          audio.onplay = () => {
            console.log('audio element onplay');
          };
          audio.onpause = () => {
            if (this.play) {
              this.$emit('playStatusChange', false);
            }
            console.log('audio element onpause');
          };
          audio.onended = () => {
            console.log('audio element onended');
            // TODO 继续播放下一首
          };
          audio.ontimeupdate = () => {
            console.log('audio element ontimeupdate');
            this[mutation.SET_AUDIO_TIME](audio.currentTime);
          };
          console.log(audio);
          this[mutation.SET_AUDIO_ELE](audio);
        })
      },

      playItem(item) {
        console.log('playItem ', item);
        this[mutation.SET_AUDIO_DATA](item);
      },

      switchAudio() {
        if (!this.playList) {
          return;
        }
        // 暂时不支持循环播放
        let index = this.playList.indexOf(this.audio_data);
        if (index < this.playList.length - 1) {
          let nextPlay = this.playList[++index];
          this[mutation.SET_AUDIO_DATA](nextPlay);
        } else {
          console.log("can't switch, current index is "
            + index + " length is "
            + this.playList.length);
        }
      }
    },

    computed: {
      ...mapState({
        audio_data: state => {
          console.log('MusicBar.vue mapState audio_data');
          return state.audio.data;
        },
        audio_ele: state => state.audio.ele,
      }),

      ...mapState(['playList', 'isPlaying']),

      ...mapGetters(['audioProgress']),

      totalCount() {
        return this.playList.length;
      }
    },
    watch: {
      audio_data(val) {
        console.log('watch audio_data');
        if (val) {
          this.audioInit();
        }
      },
      isPlaying(val) {
        console.log('watch play ', val);
        if (!this.audio_ele) {
          return;
        }
        if (!val) {
          this.audio_ele.pause();
        } else {
          this.audio_ele.play();
        }
      }
    }
  }
</script>

