<template>
  <div class="article-lyric">
    <div class="sound-info" v-if="audioData.sound.song_info">
      <p v-if="audioData.sound.song_info.album_name">
        {{audioData.sound.song_info.album_name.type}}:{{audioData.sound.song_info.album_name.name}}
      </p>
      <p v-if="audioData.sound.song_info.author">
        {{audioData.sound.song_info.author.type}}:{{audioData.sound.song_info.author.name}}
      </p>
      <p v-if="audioData.sound.song_info.name">
        {{audioData.sound.song_info.name.type}}:{{audioData.sound.song_info.name.name}}
      </p>
    </div>
    <div class="article-content" v-if="audioData.sound.lyrics" v-html="audioData.sound.lyrics"></div>
    <div class="no-lyric" v-else>没有相关歌词:(</div>
  </div>
</template>

<style scoped lang="stylus">
  .article-lyric {
    background: white
    $fontSize = toRem(29)
    font-size $fontSize
    padding: toRem(20)

    .sound-info {
      p {
        margin: toRem(29) 0
      }
    }

    .article-content {
      white-space pre-wrap
      line-height 1.6em
      padding-bottom toRem(60)
    }
  }
</style>

<script>
  import {mapGetters, mapState, mapMutations} from 'vuex'

  export default {
    name: 'ArticleLyric',
    computed: {
      ...mapGetters(['audioData']),
    }
  }
</script>
