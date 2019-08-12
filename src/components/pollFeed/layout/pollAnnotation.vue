<template>
    <div id="poll-annotation"  class="flex-between">
        <div class="annotation-section flex">
            <div class="type-block mr-6 v-center">
                <lang-string class="mr-2" :title="type_of_poll"/>
            </div>
            <div class="subject-block v-center pointer" @click="categoryLink(poll.categories)">
                <lang-string :title="poll.subject_header"/>
            </div>
        </div>
        <bookmark :poll="poll"/>

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
            type_of_poll() {
                return (this.poll.type_of_poll === 0) ? 'poll' : 'predict';
            }
        },
        methods: {
            categoryLink(category_id){

                this.$router.push({name:'catalogFeed',params:{id:category_id}})

            },
        }
    }
</script>

<style lang="scss">

    #poll-annotation {

        .type-block {
            background-color: #4B97B4;
            border-radius: 0 15px 15px 0;
            width: 54px;
            max-width: 54px;
        }

        .subject-block {
            background-color: #BCBEC3;
            border-radius: 15px;
            padding: 0 9px;
        }
        
        .type-block,
        .subject-block {
            font-family: Roboto, sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 10px;
            font-variant: small-caps;
            text-align: center;
            color: #FEFEFE;
            text-transform: uppercase;
            height: 18px;
    
            // FOR Safari ≥ 9
            @supports (-webkit-appearance:none) {
                font-variant: normal;
            }
        }

    }

</style>
