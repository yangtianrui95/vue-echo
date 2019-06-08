<template>
  <div class="music-bar" v-if="audio_data">
    <img :src="audio_data.sound.pic_500" alt="">
    <div class="sound-info">
      <div class="sound-title">{{audio_data.sound.name}}</div>
      <div class="sound-author-name">{{audio_data.sound.user.name}}</div>
    </div>

    <div class="play-panel">
      <span>列表</span>
      <span class="play" @click="onPlayClick">{{play ? '暂停' : '播放' }}</span>
      <span>切换</span>
    </div>
    <audio autoplay :src="audio_data.sound.source" id="audio"></audio>
  </div>
</template>

<style scoped lang="stylus">
  .music-bar {
    background: white
    opacity .9
    width: 768px;
    height: 100px
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
      }
      .play {
        width: 75px
        height: 75px
      }
    }
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
      return {}
    },

    methods: {
      ...mapMutations([
        mutation.SET_AUDIO_ELE
      ]),

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
          window.aa = audio;
          console.log(audio);
          this[mutation.SET_AUDIO_ELE](audio);
        })
      },
    },

    computed: {
      ...mapState({
        audio_data: state => {
          console.log('MusicBar.vue mapState audio_data');
          return state.audio.data;
        },
      })
    },
    watch: {
      audio_data(val) {
        console.log('watch audio_data');
        if (val) {
          this.audioInit();
        }
      }
    }
  }
</script>

