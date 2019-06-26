<template>
    <div id="poll-annotation"  class="flex-between">
        <div class="annotation-section flex">
            <div class="type-block mr-6 v-center">
                <lang-string :title="type_of_poll"/>
            </div>
            <div class="subject-block v-center">
                <lang-string :title="poll.subject_header"/>
            </div>
        </div>
        <bookmark  :poll="poll"/>

    </div>
</template>

<script>
    import langString from '../../langString'
    import bookmark from '../../icons/bookmark'
    export default {
        props:['poll'],
        name: "pollAnotation",
        components:{langString, bookmark},
        computed: {
            type_of_poll(){
                if (this.poll.type_of_poll == 0){
                    return 'poll'
                } else {
                    return 'prediction'
                }
            }
        }
    }
</script>

<style lang="scss">

    #poll-annotation {

        .type-block {
            background-color: #4B97B4;
            border-radius: 0px 15px 15px 0px;
            padding: 1px 11px;
        }

        .subject-block {
            background-color: #BCBEC3;
            border-radius: 15px;
            padding: 1px 9px;
        }
        .type-block, .subject-block {
            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            text-align: center;
            color: #FEFEFE;
            text-transform: uppercase;
            height: fit-content;
        }

    }

</style>
