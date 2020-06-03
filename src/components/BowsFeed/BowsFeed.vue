<template>
    <div class="bows-feed">
        <bow-annotation section-name="others" :data="list" :pollId="id"  :voted="voted" v-if="list.length"/>
        <div class=" flex-align-center" v-if="loading && !is_finished">
            <Loader class="mx-auto " />
        </div>
    </div>
</template>

<script>
    import BowAnnotation from "./layout/BowAnnotation";
    import {mapState} from "vuex";
    import Loader from "../reusableСomponents/Loader";
    export default {
        name: "BowsFeed",
        components: {Loader, BowAnnotation},
        props: {
          id: {
              type:Number,
              required:true
          },
          voted: Boolean
        },
        computed:{
            ...mapState("globalStore", {
                bows: ({ bows }) => bows
            }),
            ...mapState("BowStore", {
                items: ({ items }) => items,
                loading: ({ loading }) => loading,
                is_finished: ({ is_finished }) => is_finished,
                pollId: ({ pollId }) => pollId,

            }),
            list(){
               let {items, bows} = this;
               return  items.map( el => {
                   return bows[el.id]
               })
            }
        },
        mounted() {

            if(!this.loading && !this.is_finished){
                this.$store.dispatch('BowStore/list',{customUrl: `${process.env.VUE_APP_MAIN_API}/rest/v2/poll/${this.id}/bows/0`})
            }


        }
    }
</script>

<style lang="scss">

</style>
