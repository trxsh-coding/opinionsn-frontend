<template>
    <span>
        <span v-if="!textIsHidden">
            <span>
                {{trimmedText}}
                <lang-string
                        v-if="!showMore"
                        class='showMore pointer'
                        :title="'more'"
                        @click.native="expandText"
                />
            </span>
        </span>
        <span v-if="textIsHidden">
            <span>
                {{text}}
            </span>
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
                showMore: false,
                textIsHidden:false
            }
        },
        computed: {
            trimmedText() {
             let {text, amountOfLetter} = this;
             if(text.length > amountOfLetter){
                  return text.substring(0, text.substring(0, amountOfLetter).lastIndexOf(' ')) + '... '
            } else {
                this.showMore = true
                return text
                }
            }
        },
        methods: {
            expandText(){
                this.textIsHidden = true
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
