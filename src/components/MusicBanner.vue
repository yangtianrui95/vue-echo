<template>
  <div id="banner">
    <!--轮播-->
    <mt-swipe class="swiper" :auto="0">
      <mt-swipe-item v-for="(item, index) in list" class="swiper-item" :key="index">
        <router-link :to="{path: 'article', query:{'id':item.sound.id}}">
          <img :src="item.sound.pic_640" alt="">
        </router-link>

      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>


<style scoped lang="stylus">
  $bannerHeight = toRem(300)

  #banner {
    width: 100%;
    height: $bannerHeight;
  }

  .swiper-item {
    text-align center
  }

  .swiper {
    width: 100%
  }

  .swiper-item img {
    width: 95%
  }


</style>

<script>
  export default {
    name: 'MusicBanner',
    mounted: function () {
      console.log('MusicBanner.vue mount', this.$props);
    },

    props: ['list']
  }

</script>