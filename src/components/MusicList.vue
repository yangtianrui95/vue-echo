<template>
  <div>{{list}}</div>
</template>


<script>
  export default {
    name: 'MusicList',

    beforeMount: function () {
      console.log('MusicList.vue beforeMount')
      console.log(this.list);
    },


    mount: function () {
      console.log('MusicList.vue mount')
    },

    props: {
      list: Object
    }
  }
</script>