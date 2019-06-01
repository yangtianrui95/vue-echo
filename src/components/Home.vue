<template>
  <div>
    <div>Hello-KeepAlive</div>
    <input type="text">
  </div>
</template>


<style>

</style>


<script>
  export default {
    name: 'Hello',

    beforeRouteLeave: function (to, from, next) {
      console.log('before route leave', to);
      to.meta.keepAlive = true;
      next();
    }
  }
</script>