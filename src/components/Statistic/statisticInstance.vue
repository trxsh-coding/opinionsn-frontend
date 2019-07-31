<template>
    <div class="user-statistic pt-51">
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
            <dropdown-list-reusable class="mr-22" listClass="w-max">
                <template>
                    <lang-string :title="ranges[rangeId].value" />
                </template>


                <template #items>
                    <li v-for="({value}, index) in ranges" @click="setRange(index)">
                        <lang-string :title="value" />
                    </li>
                </template>
            </dropdown-list-reusable>
            <dropdown-list-reusable listClass="w-max">
                <template>
                    <lang-string :title="types[typeId].value" />
                </template>


                <template #items>
                    <li v-for="({value}, index) in types" @click="setType(index)">
                        <lang-string :title="value" />
                    </li>
                </template>
            </dropdown-list-reusable>
        </div>


    </div>
</template>

<script>
    import langString from "../langString";
    import PictureReusable from "../reusableСomponents/PictureReusable";
    import {mapState} from 'vuex'
    import CategorySelect from "../reusableСomponents/categorySelect";
    import DropdownListReusable from "../reusableСomponents/DropdownListReusable";

    export default {
        name: "statisticInstance",
        components: {DropdownListReusable, CategorySelect, PictureReusable, langString},
        data() {
            return {
                publicPath: process.env.VUE_APP_MAIN_API,
                ranges:[
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
                types:[
                    {
                        value:'poll'
                    },
                    {
                        value:'prediction'
                    },
                ],
                rangeId: 0,
                categoryId:0,
                typeId:0,

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
            }
        },
        methods: {
            setRange(index){
                this.rangeId = index;
            },
            setType(index){
                this.typeId = index;
            },
            setCategoryId({id}) {
                this.categoryId = id;
            }
        }

    }
</script>

<style lang="scss">
    .user-statistic {

        .avatar-username {

            font-family: Roboto;
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            color: #1A1E22;
        }
    }
</style>