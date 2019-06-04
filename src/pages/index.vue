<template>
  <div>
    <!--使用prop向子组件传递数据-->
    <music-banner :list="musicBanner"></music-banner>
    <div class="recommend-title">echo每日推荐</div>
    <div class="wrapper">
      <div class="playAll">一键播放</div>
    </div>
    <music-list :list="musicList"></music-list>
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

</style>

<script>
  import MusicList from '@/components/MusicList.vue'
  import MusicBanner from '@/components/MusicBanner.vue'
  import net from '@/net'

  export default {
    name: 'index',
    data: function () {
      return {
        musicList: [],
        musicBanner: []
      }
    },

    mounted: function () {
      console.log('index.vue mount');
      this.getBannerData();
      this.getListData();
    },

    methods: {
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
      MusicList, MusicBanner
    }
  }
</script>
