<template>
    <div class="user-statistic pt-51" :class="{'bg-white': !mobile}">
       <div class="header-block pl-60 mb-15">
           <picture-reusable
                   class="pointer"
                   :size="72"
                   :img="publicPath + user.path_to_avatar"
                   text-layout="right"
                   rounded>
               <template #title>
                  <span class="avatar-username pl-15">
                       {{user.username}}
                  </span>
               </template>
           </picture-reusable>
       </div>

        <category-select @on-select="setCategoryId" :current="categoryId"  class="pl-60 pr-4"/>
        <div class="select-block pl-69 mt-12">
            <dropdown-list-reusable with-arrow class="mr-22" listClass="w-max">
                <template>
                    <lang-string :title="periods[periodId].value" />
                </template>


                <template #items>
                    <li class="pointer" v-for="({value}, index) in periods" @click="setRange(index)" :key="index">
                        <lang-string :title="value" />
                    </li>
                </template>
            </dropdown-list-reusable>
            <dropdown-list-reusable with-arrow listClass="w-max">
                <template>
                    <lang-string :title="types[typeId].value" />
                </template>


                <template #items>
                    <li class="pointer" v-for="({value}, index) in types" @click="setType(index)" >
                        <lang-string  :title="value" />
                    </li>
                </template>
            </dropdown-list-reusable>
        </div>
        <div class="statistic-section">
            <apexchart  type="bar" :options="chartOptions" :series="series" />
        </div>
    </div>

</template>

<script>
    import VueApexCharts from 'vue-apexcharts'
    import langString from "../langString";
    import PictureReusable from "../reusableСomponents/PictureReusable";
    import {mapState} from 'vuex'
    import CategorySelect from "../reusableСomponents/categorySelect";
    import DropdownListReusable from "../reusableСomponents/DropdownListReusable";
    import axios from 'axios'
    export default {
        name: "statisticInstance",
        components: {DropdownListReusable, CategorySelect, PictureReusable, langString, apexchart: VueApexCharts},
        data() {
            return {
                publicPath: process.env.VUE_APP_MAIN_API,
                mobile: this.$root.mobile,
                periods: [
                    {
                        value:'week'
                    },
                    {
                        value:'mounth'
                    },
                    {
                        value:'3 mounth'
                    },
                ],
                types: [
                    {
                        value:'poll'
                    },
                    {
                        value:'prediction'
                    },
                ],
                periodId: 0,
                categoryId:1,
                typeId:0,
                statistic: [],

                chartOptions: {
                    chart: {
                        toolbar: {
                            show: false,
                            tools: {
                                download: false
                            }
                        },
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '15%',
                            endingShape: 'rounded'
                        },
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        show: true,
                        width: 5,
                        colors: ['transparent']
                    },

                    xaxis: {
                        categories: [],
                    },
                    yaxis: {
                        min:0,
                        max:10,
                        decimalsInFloat: 1,
                        floating: false,
                    },
                    fill: {
                        opacity: 1

                    },

                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return "$ " + val + " thousands"
                            }
                        }
                    }
                }
            }
        },
        watch: {

            cXaxis(current, newOne) {
                this.chartOptions = {
                    ...this.chartOptions,
                    xaxis: current
                };
            },
            typeId(current, newOne){
               if(current !== newOne) this.getUserStatistic()
            },
            periodId(current, newOne){
                console.log(current)
                if(current !== newOne) this.getUserStatistic()
            },
            categoryId(current, newOne){
                console.log(current)
                if(current !== newOne) this.getUserStatistic()
            }

        },
        computed: {
            ...mapState('globalStore', {
                users: ({users}) =>users,
            }),
            user_id(){
              return this.$route.params.id
            },
            user(){
                let {users, user_id} = this;
                return users[user_id];
            },
            series(){
                let { pillarsPollDTO = {} } = this.statistic;
                let {types, typeId} = this;
                let series = [
                    {
                        data:null,
                        name:null
                    }
                ];
                if(typeId === 1) {

                    let correctAnswers = Object.values(pillarsPollDTO).map(({totalAmountCorrectAnswers}) => totalAmountCorrectAnswers);
                    let inCorrectAnswers = Object.values(pillarsPollDTO).map(({totalAmountIncorrectAnswers}) => totalAmountIncorrectAnswers);

                    series[0] = {
                        data: correctAnswers,
                        name: 'correct answers'
                    };
                    series[1] = {
                        data: inCorrectAnswers,
                        name: 'incorrect answers'
                    };

                } else {
                    let pollAnsweredAmount = Object.values(pillarsPollDTO).map(({totalAmountVoted}) => totalAmountVoted);
                    series[0] = {
                        data: pollAnsweredAmount,
                        name: 'Voted'
                    };

                }

                return series;


            },
            chartOptinos(){



            },
            cXaxis(){

                return {
                    categories: this.rangeInstance.reverse(),
                }

            },


            rangeInstance(){
                let { pillarsPollDTO = {} } = this.statistic;
                return  Object.values(pillarsPollDTO).map(({day}) => day.toString());

            },
        },
        methods: {
            setRange(index){
                this.periodId = index;
            },
            setType(index){
                this.typeId = index;
            },
            setCategoryId({id}) {
                this.categoryId = id;
            },
            getUserStatistic(){
                let {typeId, categoryId, periodId, types, user_id} = this;
                axios.get(`${process.env.VUE_APP_MAIN_API}/rest/v1/user/statistic/detail/${types[typeId].value}/${user_id}`,{
                    params: {
                        category: categoryId,
                        period: periodId
                    }
                })
                    .then(response => {
                        if (response.status === 200) {
                            this.statistic = response.data;

                        }
                    })
            }
        },
        mounted(){
            this.getUserStatistic()
        }

    }
</script>

<style lang="scss">
    .user-statistic {
        border-radius: 6px;

        .avatar-username {

            font-family: Roboto;
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            color: #1A1E22;
        }
    }
</style>