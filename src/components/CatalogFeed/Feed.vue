<template lang="html">

    <div id="catalog-feed" class="flex-column" :class="{'pt-58': mobile}">
        
        <div class="pr-20" :class="{'pl-51': !mobile, 'pl-21': mobile}" v-show="items.length">
            <event v-for="item in items" class="mb-6" :item="item"/>
        </div>
        
        <Loader class="mx-auto my-10" v-show="loading" />

    </div>

</template>



<script>
    import { mapState } from 'vuex';
    import event from './Event/Event'
    import langMixin from '../mixins/langMixin'
    import langString from '../langString'
    import IconBase from '../icons/IconBase'
    import IconBack from '../icons/IconBack'
    import Loader from "@/components/reusableСomponents/Loader";
    export default {
        mixins:[langMixin],
        data(){
            return {
                id: this.$route.params.id,
                publicPath: process.env.VUE_APP_MAIN_API

            }
        },
        computed: {
            ...mapState('catalogList', {
                state: s => s,
                items: s => s.items,
                loading: s => s.loading
            }),
    
            mobile() {
                return this.$root.mobile;
            },
            
            // ...mapState('globalStore', {
            //     polls: ({polls}) =>polls,
            //     users: ({users}) =>users,
            //     categories: ({categories}) => categories,
            // }),
            //
            // poll() { return this.polls[this.id] },
            //
            // category() { return this.categories[this.id] }

        },
        methods: {

            backLink() { this.$router.push({path: '/catalogList'}) }

        },

        mounted() {
            this.$store.dispatch(`catalogList/list`, {customUrl: `${process.env.VUE_APP_MAIN_API}/rest/v1/categories/${this.id}`})
        },
    
        components: {
            Loader,
            event,
            langString,
            IconBase,
            IconBack
        }
    }
</script>

<style lang="scss">

    .catalog__name {
        font-family: Roboto, sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 22px;
        line-height: 18px;
        text-align: center;
        color: #152D3A;
        font-variant-caps: all-small-caps;
    }
    
    .icon-back {
        float: left;
        
        g {
            fill:none;
        }

    }

        .category-mobile {
            margin-top: 6px;
            text-align: center;
        }


</style>
