<template>
    <div class="statistic-wrapper mb-10" :class="{padding : !hide}">
        <div class="statistic-header  flex-between " :class="{unpadding : !hide}">

            <div class="header-text">
                <lang-string class="lowercase" :title="'statistics'" /> <lang-string class="details" :title="'more_details'" />
            </div>
            <div class="dropdown flex-align-center pointer" @click="hide = !hide">
                <icon-base
                        v-if="!hide"
                        class="dropdown-icon"
                        fill="none"
                        width="8"
                        height="5"
                        viewBox="0 0 8 5"
                        icon-name="dropdown"><icon-dropdown/>
                </icon-base>
                <icon-base
                        v-if="hide"
                        class="dropdown-icon"
                        fill="none"
                        width="8"
                        height="5"
                        viewBox="0 0 8 5"
                        icon-name="dropdown"><icon-dropdown-top/>
                </icon-base>
            </div>

        </div>
        <div class="user-statistic border-t" v-if="hide">
            <div v-for="(item, key, index) in items" :key="key" v-if="index <= limit" class="progress-chart flex-column">
                <div class="header-text">
<!--                    <lang-string class="header-span" :title="key"/>-->
					<span class="header-span">{{ cropString(lstr(key)) }}</span>
                </div>
                <div class="progress-border" :class="{full: item[0] == 100}">
                    <el-progress class="circle-chart"  type="circle" :class="{empty : item[2] == 0}" color="#4B97B4" :percentage="item[0]"  width="60" :stroke-width="3"></el-progress>
                    <div class="border-right">

                    </div>
                </div>

                <div class="border-bottom" > </div>
                <div class="text-block">
                    <span class="black" :class="{empty : item[2] == 0}">{{item[1]}}</span> <span class="grey"> из {{item[2]}}</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    import axios from 'axios'
    import IconDropdown from './../../../icons/IconDropdown'
    import IconDropdownTop from './../../../icons/IconDropdownTop'
    import langString from '../../../langString'
    import IconBase from '../../../icons/IconBase'
	import { localString } from "../../../../utils/localString"
	import {mapState} from "vuex";
    export default {
        name: "userStatistic",
        props:['id', 'limit'],
        data(){
            return {
                items:[],
                names:[],
                hide:true,
                black:'blue',
                white:'red'
            }
        },
        computed:{

			...mapState('lang',{
				lang : state => state.locale
			}),

            loop:function () {

                console.log(this.items)

            },

			lstr(){
				return (str)=>localString(this.lang, str);
			},

            // empty:function () {
            //
            //     let empty
            //
            //     for (let item in this.items) {
            //
            //
            //         if (item['2'] == 0) {
            //
            //             empty = false
            //
            //
            //         } else {
            //
            //             empty = true
            //
            //         }
            //         console.log(empty)
            //
            //         return empty
            //
            //     }
            //
            // }



        },

        methods: {

        	cropString(string) {
        		return (string.length > 10) ? string.slice(0, 10).trim() + '...' : string;
			}

        },

        components: {

            IconDropdown,
            IconBase,
            IconDropdownTop,
            langString

        },

        mounted(){

            axios.get(`/api/rest/getStatisticsOnCategories/${this.id}`)
                .then((response) => {
                    if (response.status === 200) {
                        this.$store.commit('globalStore/updateStores', response.data, {root: true});
                        console.log((response.data))
                        this.items = response.data


                    }

                })



        }


    }
</script>

<style lang="scss">
    .unpadding {

        padding-bottom: 0px !important;

    }
    .padding {

        padding: 0px 9px 9px 9px !important;

    }
    .statistic-wrapper {
        background: #fff;
        border-radius: 12px;
        padding: 0px 9px 15px 9px;

        .dropdown  {

            path {

                fill: none !important;

            }

        }
        .empty {

           opacity: 0.5 !important;
            color: #E4E7E9 !important;

        }


        .statistic-header {
            padding-bottom: 9px;
            padding-top: 9px;
           .details {
               font-family: Roboto;
               font-style: normal;
               font-weight: 300;
               font-size: 11px;
               line-height: 11px;
               color: #828D92;
               padding-left: 6px;
           }
           span {
               padding-left: 3px;
               font-family: Roboto;
               font-style: normal;
               font-weight: 500;
               font-size: 14px;
               color: #152D3A;

           }



        }
        .user-statistic {
            display: flex;
            justify-content: space-between;
            padding-top: 9px;
            .progress-chart:last-of-type {

                .progress-border {

                    border:none;

                }

            }

            .full {

                .el-progress__text {

                    padding-left:0 !important;

                }

            }



            .progress-chart {


                .border-bottom {
                    border-color: #D0D5D9;
                    border-width: 0.5px;
                    border-style: solid;
                    width: 14%;
					margin: 11px 0 6px;

                }

                .progress-border {

                    border-right-color: #D0D5D9;
                    border-right-width: 0.5px;
                    border-right-style: solid;

                }

                .progress-border:last-of-type {

                    border-right-color: #FFFFFF !important;

                }

                .border-right {



                }

                .header-text {
					margin-bottom: 11px;
                    .header-span {
                        font-family: Roboto;
                        font-style: normal;
                        font-weight: normal;
                        font-size: 13px;
                        text-align: center;
                        letter-spacing: -0.1px;
                        color: #152D3A;

                    }
                }

                .black {

                    font-family: Roboto;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 17px;
                    font-size: 15px;
                    text-align: center;
                    letter-spacing: -0.3px;

                    color: #152D3A;



                }

                .grey {

                    font-family: Roboto;
                    font-style: normal;
                    font-weight: 300;
                    line-height: 11px;
                    font-size: 12px;
                    text-align: center;
                    letter-spacing: -0.2px;

                    color: #69777F;



                }

                align-items: center;


                .circle-chart {
					/*margin-top: 11px;*/
					/*margin-bottom: 12px;*/

                    .el-progress__text {

                        font-family: Roboto;
                        font-style: normal;
                        font-weight: 500;
                        font-size: 15px !important;
                        line-height: 21px;
                        text-align: center;
                        letter-spacing: -0.9px;
                        color: #4B97B4;
                        padding-bottom: 1px;
                        padding-left: 3px;


                    }

                }



            }
        }
    }


</style>
