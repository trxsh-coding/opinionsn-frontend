<template>
  <span class="">
      {{trimmedText}}
         <span>
        <lang-string class='showMore' :title="'more'" @click="io"/>
      </span>
  </span>

</template>

<script>
    import langString from '../langString'
    export default {
        name: "textTrim",
        components: {langString},
        props: {
            text: {
                type:String
            },
            amountOfLetter: {
                type:Number

            },
        },
        data() {
            return {
                showMore: false
            }
        },
        computed: {
            trimmedText() {
             let {text, amountOfLetter} = this;
             if(text.length >= amountOfLetter){
                  return text.substring(0, text.substring(0, amountOfLetter).lastIndexOf(' ')) + '... '
            } else {
                this.showMore = true
                return text
                }
            }
        },
        methods: {
            expandText(){
                this.showMore = true
            }
        }
    }
</script>

<style lang="scss">
    .showMore {

        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        text-decoration-line: underline;
        color: #ADAFB3 !important;
        text-transform: lowercase;

    }
</style>
