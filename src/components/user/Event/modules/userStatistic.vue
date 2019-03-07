<template>
    <div class="statistic-wrapper mb-10">
        <div class="statistic-header  flex-between " :class="{padding : hide}">

            <span class="uppercase">статистика</span>
            <div class="dropdown" @click="hide = !hide">
                <icon-base
                        v-if="!hide"
                        class="dropdown-icon"
                        fill="none"
                        width="14"
                        height="17"
                        viewBox="0 0 13 5"
                        icon-name="dropdown"><icon-dropdown/>
                </icon-base>
                <icon-base
                        v-if="hide"
                        class="dropdown-icon"
                        fill="none"
                        width="14"
                        height="17"
                        viewBox="0 0 13 5"
                        icon-name="dropdown"><icon-dropdown-top/>
                </icon-base>
            </div>

        </div>
        <div class="user-statistic border-t" v-if="hide">
            <div v-for="(item, key, index) in items" :key="key" v-if="index <= limit" class="progress-chart flex-column">
                <span class="header-span">{{key}}</span>
                <el-progress class="circle-chart"  type="circle" :class="{empty : item[2] == 0}" color="#4B97B4" :percentage="item[0]"  width="60" :stroke-width="3"></el-progress>
                <div class="border-bottom">

                </div>
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

    import IconBase from '../../../icons/IconBase'
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

            loop:function () {

                console.log(this.items)

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

        },

        components: {

            IconDropdown,
            IconBase,
            IconDropdownTop

        },

        mounted(){

            axios.get(`api/rest/getStatisticsOnCategories/${this.id}`)
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

    .statistic-wrapper {
        background: #fff;
        border-radius: 12px;
        padding: 10px 15px 10px 16px;

        .empty {

           opacity: 0.5 !important;
            color: #E4E7E9 !important;

        }

        .padding {

            padding-bottom: 13px;

        }
        .statistic-header {

           span {

               font-family: Roboto;
               font-style: normal;
               font-weight: 500;
               line-height: 18px;
               font-size: 14px;
               font-variant: small-caps;
               color: #152D3A;

           }



        }
        .user-statistic {
            display: flex;
            justify-content: space-between;
            padding-top: 13px;
            .progress-chart:last-of-type {

                .circle-chart {

                    border:none;

                }

            }

            .progress-chart {


                .border-bottom {
                    border-color: #D0D5D9;
                    border-width: 0.5px;
                    border-style: solid;
                    width: 13%;
                    margin-bottom: 4px;

                }

                .header-span {
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    line-height: 16px;
                    font-size: 13px;
                    text-align: center;
                    letter-spacing: -0.1px;
                    color: #152D3A;



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

                    color: #D0D5D9;



                }

                align-items: center;


                .circle-chart {
                    padding: 0 30px;
                    border-right-color: #D0D5D9;
                    border-right-width: 0.5px;
                    border-right-style: solid;
                    padding-top: 13px;
                    padding-bottom: 11px;
                    .el-progress__text {
                        font-family: Roboto;
                        font-style: normal;
                        font-weight: normal;
                        line-height: 21px;
                        font-size: 18px !important;
                        text-align: center;
                        letter-spacing: -0.5px;
                        color: #4B97B4;
                    }

                }



            }
        }
    }


</style>
