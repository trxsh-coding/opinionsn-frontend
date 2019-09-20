<template>
    <div id="poll-annotation"  class="flex-between">
        
        <div class="type-block mr-6 v-center">
            <lang-string class="mr-2" :title="type_of_poll"/>
        </div>
        
        <div class="subject-block v-center pointer" @click="categoryLink(poll.categories)">
            <lang-string :title="poll.subject_header"/>
        </div>

        <div class="counter-badges text-deselect ml-auto h-18 flex px-5">
    
            <div v-if="poll.type_of_poll === 1 || poll.type_of_poll === 2"
                 class="comments-block flex-align-center mr-7">
                <IconClocks />
                <span class="ml-3">
                    {{poll.votingOver ? lstr('end') : current_time}}
                </span>
            </div>
    
            <div class="explains-block flex-align-center mr-7">
                <IconCheck />
                <span class="ml-3">{{poll.total_amount_of_votes}}</span>
            </div>
            
            <div class="comments-block flex-align-center">
                <IconBaloon />
                <span class="ml-3">{{poll.total_amount_of_comments}}</span>
            </div>

        </div>
    </div>
    
</template>

<script>
    import langString from '../../langString'
    import IconBase from "@/components/icons/IconBase";
    import IconCheck from "@/components/icons/IconCheck";
    import IconBaloon from "@/components/icons/IconBaloon";
    import IconClocks from "@/components/icons/IconClocks";
    import moment from 'moment'
    import {mapState} from "vuex";
    import langMixin from "@/components/mixins/langMixin";

    const pad = (num, len=2, char='0') => {
        let init = `${num}`;
    
        while (init.length < (len*char.length)){
            init = `${char}${init}`
        }
    
        return init;
    };
    
    export default {
        props: {
            poll: {
                type: Object,
                required: true
            }
        },
        name: "pollAnotation",
        components:{IconClocks, IconBaloon, IconCheck, IconBase, langString},
        mixins: [langMixin],
        data() {
            return {
                interval_id: null,
                current_time: null
            }
        },
        computed: {
            ...mapState('lang', {
                _lang: state => state.locale._lang,
            }),
            
            type_of_poll() {
                return (this.poll.type_of_poll === 0) ? 'poll' : 'predict';
            },
    
            relativeEndDate() {
                let {poll, _lang} = this;
                let {end_date} = poll;
                moment.locale(_lang);
                return moment.utc(end_date);
            },
        },
        
        methods: {
            categoryLink(category_id){

                this.$router.push({name:'catalogFeed',params:{id:category_id}})

            },
    
            getTime() {
                let end = this.relativeEndDate;
                let now = moment(new Date());
                let duration = moment.duration(end.diff(now));
        
                if (duration.asDays() > 1) {
                    this.current_time = `${Math.floor(duration.asDays())} ${this.lstr('days')}`;
                } else if (duration > 1 && duration.asHours() < 24) {
                    this.current_time = `${pad(duration.hours())}:${pad(duration.minutes())}:${pad(duration.seconds())}`;
                }
                else {
                    this.current_time = this.lstr('end')
                }
        
                return this.current_time;
            },
        },
        
        mounted() {
            if (!this.poll.votingOver) {
                this.interval_id = setInterval(() => {
                    this.getTime()
                }, 1 * 1000);
            }
        },
    
        beforeDestroy() {
            clearInterval(this.procid);
        },
    }
</script>

<style lang="scss">

    #poll-annotation {
        
        .counter-badges {
            border: 1px solid #1A1E22;
            border-radius: 6px;
            
            * {
                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                font-size: 11px;
                color: #1A1E22;
            }
        }

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
