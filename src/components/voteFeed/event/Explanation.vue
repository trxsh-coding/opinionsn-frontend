<template>
    <div class="explanation">
        <div class="replied">
            <icon-base
                    class="replied"
                    fill="none"
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    icon-name="replied"><icon-replied />
            </icon-base>
        </div>
        <span class="explainText wb">{{ vote.explain_description ? vote.explain_description : '' }}</span>
    </div>
</template>

<script>
import IconReplied from './../../icons/IconReplied.vue'
import IconBase from '../../icons/IconBase.vue'

    export default {
        name: "Explanation",
        props: ['vote'],
        components: {
              IconBase,
              IconReplied
        },
    }
</script>

<style lang="scss">
    .explanation {
      display: flex;
      margin-right: 20px;
      position: relative;
      padding: 0px 0px 9px 20px;
      align-items: center;
        .time {
        position: absolute;
        font-family: Roboto;
        font-style: normal;
        font-weight: 300;
        line-height: 12px;
        font-size: 12px;
        text-align: right;
        letter-spacing: -0.2px;
        color: #828D92;
        right: 5px;
        top: -28px;
      }

    }
    .explainText {
        font-size: 13px;
        letter-spacing: -0.1px;
        color: #152D3A;
        padding-left: 9px;
    }

</style>
