<template>
  <div class="music-bar" v-if="audio_data">
  </div>
</template>

<style scoped>
  .music-bar {
    background: red;
    width: 768px;
    height: 50px;
  }
</style>

<script>
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: 'MusicBar',

    created() {
      console.log('MusicBar.vue created');
    },

    data() {
      return {}
    },

    computed: {
      ...mapState({
        audio_data: state => {
          console.log('MusicBar.vue mapState audio_data');
          return state.audio.data;
        }
      })
    },
    watch: {
      audio_data(val) {
        console.log('watch audio_data');
      }
    }
  }
</script>

