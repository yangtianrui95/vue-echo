<template>
  <!--使用prop向子组件传递数据-->
  <music-list :list="musicList"></music-list>
</template>


<style lang="stylus" scoped>

</style>

<script>
  import MusicList from '@/components/MusicList.vue'

  export default {
    name: 'index',
    data: function () {
      return {
        musicList: {list: ['111', '222']}
      }
    },
    mount: function () {
      console.log('index.vue mount')
    },
    components: {
      MusicList
    }
  }
</script>
