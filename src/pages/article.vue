<template>
  <div class="article-wrapper">
    <user-info></user-info>
    <div class="play-panel"></div>
    <div class="sound-info"></div>
    <div class="sound-lyrics"></div>
  </div>
</template>

<style scoped lang="stylus">

</style>

<script>
  import {mapGetters, mapState, mapMutations} from 'vuex'
  import {mutation} from '@/store'
  import net from '@/net'
  import UserInfo from "../components/UserInfo.vue";

  export default {
    name: 'article',
    data() {
      return {}
    },

    components: {
      UserInfo
    },

    computed: {
      ...mapGetters(['audioData']),

      id() {
        return this.$route.query.id;
      }
    },

    created() {
      console.log('article created', this.$route);
      this.getMusicData(this.id);
    },

    mounted() {
      console.log('article mounted');
    },

    methods: {
      ...mapMutations([mutation.SET_AUDIO_DATA]),
      getMusicData() {
        console.log('getMusicData');
        net.getDetail(this.id)
          .then(response => {
            if (!response.code) {
              console.log(response);
              this[mutation.SET_AUDIO_DATA](response.data);
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    },

    // FIXME keep-alive造成mounted/created不会回调，只能在此处监听，需修复
    watch: {
      // 监听路由变化
//      $route() {
//        console.log('$route change', this.$route);
//        if (this.$route.name === 'article') {
//          console.log('enter article');
//          this.id = this.$route.query.id;
//          this.getMusicData();
//        }
//      }
    }
  }
</script>