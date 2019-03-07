<template lang="html">
  <div id="login">
      <transition name="fade">
        <router-view/>
      </transition>
  </div>
</template>

<script>
import Sign from './Sign.vue'
import Registration from './Registration.vue'


export default {
  data() {
    return {

    }
  },
  components: {
    Sign,
    Registration

  }
}
</script>

<style scoped lang="scss">
body {
  margin: 0;

}

#login {
  background: #ffffff !important;
  width: 100%;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  .slide-enter, {
  opacity: 0;

  }
  .slide-leave-active, .slide-enter {
    opacity: 0;
    transform: translateX(100%);
  }
}

</style>
