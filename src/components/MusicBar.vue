<template>
  <div class="music-bar" v-if="audio_data">
    <img :src="audio_data.sound.pic_500" alt="">
    <div class="sound-info">
      <div class="sound-title">{{audio_data.sound.name}}</div>
      <div class="sound-author-name">{{audio_data.sound.user.name}}</div>
    </div>

    <div class="play-panel">
      <span @click="togglePlayList">列表</span>
      <span class="play" @click="onPlayClick">{{play ? '暂停' : '播放' }}</span>
      <span>切换</span>
    </div>

    <!--弹出动画-->
    <transition name="slideTop">
      <div class="play-list" v-if="showPlayList">
        <div class="popup-header">
          <span class="clear">清空</span>
          <span class="list-tip">播放列表<span class="list-num">({{totalCount}}首)</span></span>
          <!--TODO 替换icon-->
          <span class="more">更多</span>
        </div>
        <ul class="popup-list">
          <li v-for="item in playList" @click="playItem(item)">
            <span :class="{active:isSelected(item)}">{{item.sound.name}}</span>
            <!--TODO 替换icon-->
            <span class="delete">x</span>
          </li>
        </ul>
      </div>
    </transition>

    <audio autoplay :src="audio_data.sound.source" id="audio"></audio>
  </div>
</template>

<style scoped lang="stylus">
  $musicbarHeight = 100px
  $primaryColor = #6ed56c
  .music-bar {
    background: white
    width: toRem(768)
    height: $musicbarHeight
    display flex
    flex-direction row
    align-items center

    img {
      width: 71px;
      margin-left 10px
      border: 1px solid #ccc
      box-shadow 0 0 2px #AAA
      height: 71px;
    }

    .sound-info {
      font-size 0.30rem
      margin-left 10px
      /*todo 为何必须设置overflow */
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
      font-size 0.32rem

      span {
        $size = 70px
        align-items center
        justify-content center
        float left
        margin 5px 10px
        width: $size
        height: $size
        display flex
        border: 1px solid #aaa
        border-radius 100%
        cursor pointer
      }
      .play {
        width: 75px
        height: 75px
      }
    }

    .play-list {
      font-size 0.33rem
      position absolute
      width: 100%
      bottom: $musicbarHeight
      background: white

      .popup-header {
        $marginToBoound = 15px
        text-align center
        margin-top $marginToBoound
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
          .active{
            color: $primaryColor
          }
          .delete {
            float: right
          }
        }
      }
    }
  }

  .slideTop-enter-active, .slideTop-leave-active {
    transition: all .5s;
    bottom: 0
  }

  .slideTop-enter, .slideTop-leave-to {
    opacity 0
  // 存在选择器被覆盖不生效问题
    bottom: 0 !important
    position absolute !important
  }
</style>

<script>
  import {mapMutations, mapState} from 'vuex'
  import {mutation} from '@/store'

  export default {
    name: 'MusicBar',

    props: {
      play: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        showPlayList: true
      }
    },

    methods: {
      ...mapMutations([
        mutation.SET_AUDIO_ELE,
        mutation.SET_AUDIO_DATA
      ]),

      isSelected(item) {
        return item === this.audio_data;
      },

      togglePlayList() {
        this.showPlayList = !this.showPlayList;
      },

      onPlayClick() {
        console.log('onPlayClick', this.play);
        // vue中父向子传递的数据是单向数据流，子组件中需要避免修改props中的值
        // 使用emit发送事件，让父组件更新值
        this.$emit('playStatusChange', !this.play);
      },

      audioInit() {
        this.$nextTick(() => {
          console.log('audioInit ---> $nextTick', this.$el);
          const audio = this.$el.querySelector('#audio');
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
            console.log('audio element ontimeupdate')
          };
          console.log(audio);
          this[mutation.SET_AUDIO_ELE](audio);
        })
      },

      playItem(item) {
        console.log('playItem ', item);
        this[mutation.SET_AUDIO_DATA](item);
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

      ...mapState(['playList']),

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
      play(val) {
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

