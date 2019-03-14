<template lang="html">
  <div id="login">
      <div class="login-section">
          <div class="logo-block">
              <div class="logo">
                  <icon-base
                          fill="none"
                          class="icon"
                          width="90"
                          height="90"
                          viewBox="0 0 25 24"
                          icon-name="logo"><icon-logo />
                  </icon-base>
              </div>

              <icon-base
                      fill="none"
                      class="icon-text"
                      width="90"
                      height="21"
                      viewBox="0 0 65 15"
                      icon-name="text-logo"><icon-text-logo />
              </icon-base>


          </div>
          <div class="buttons-block flex-column-center">

              <el-button class="primary-btn" @click="routeFn('sign')">
                  <lang-string class="lowercase" :title="'sign'" />
              </el-button>

              <el-button class="primary-btn" @click="routeFn('registration')">
                  <lang-string class="lowercase" :title="'registration'" />
              </el-button>

          </div>
      </div>
  </div>
</template>

<script>
import langMixin from '../mixins/langMixin'
import Sign from './Sign.vue'
import Registration from './Registration.vue'
import IconBase from '../icons/IconBase'
import IconLogo from '../icons/IconLogo'
import IconTextLogo from '../icons/IconTextLogo'
import langString from '../langString'
import {mapState} from 'vuex'
export default {
mixins:[langMixin],
    data() {
    return {

    }
  },
  methods: {

      routeFn(pathName){

          this.$router.push({name: pathName})

      },

  },
  components: {
    Sign,
    Registration,
    IconBase,
    IconLogo,
    IconTextLogo,
    langString

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

    .login-section {
        height: 50%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        .icon-text {

            margin-top: 18.31px;

        }
        .buttons-block {
            margin-top: 60px;
            text-align: center;
            .el-button {
                margin: 0px;
                margin-bottom: 9px;
            }

            .el-button:hover {

                background: #4B97B4;
                color: #FFFFFF;
            }
        }

    }

}

</style>
