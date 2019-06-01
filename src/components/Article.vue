<template>
  <div>Article</div>
</template>


<style>

</style>


<script>
  import net from '../net'

  export default {
    name: 'Article',
    beforeMount: function () {
      net.getBanner().then(res => {
        console.log(res);
      });
      net.getList(1).then(res => {
        console.log(res);
      })
    }
  }
</script>