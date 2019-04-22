<template>
    <div class="mobile-nav">
        <ul>
            <li class="nav__item" @click="resetFilter('pollFeed')">
                <icon-base
                        class="main-icon"
                        :class="{primary : $route.path==='/pollFeed'} "
                        width="27"
                        height="27"
                        viewBox="0 0 18 22"
                        icon-name="main"><icon-main/>
                </icon-base>
            </li>
            <li class="nav__item" @click="resetFilter('voteFeed')">
                <icon-base
                        :class="{primary : $route.path==='/voteFeed'} "
                        class="main-icon"
                        width="27"
                        height="27"
                        viewBox="0 0 18 22"
                        icon-name="opinion"><icon-opinion/>
                </icon-base>
            </li>
            <li class="nav__item" @click="link('search')">
                <icon-base
                        :class="{search : $route.path==='/search'} "
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        icon-name="search"><icon-search/>
                </icon-base>
            </li>
            <li class="nav__item">
                <notification-feed class="main-icon notification_feed"/>
            </li>
            <li class="nav__item" >
                <avatar class="avatar-25x25" ></avatar>
            </li>
            <li class="nav__item" @click="link('menu')">
                <icon-base
                        width="25"
                        height="22"
                        viewBox="0 0 25 22"
                        icon-name="menu"><icon-menu />
                </icon-base>
            </li>
        </ul>
    </div>
</template>

<script>
    import IconBase from './icons/IconBase'
    import IconMain from './icons/IconMain'
    import IconOpinion from './icons/IconOpinion'
    import IconSearch from './icons/IconSearch'
    import IconBell from './icons/IconBell'
    import IconMenu from './icons/IconMenu'
    import avatar from './user/Event/modules/mainUserAvatar'
    import notificationFeed from './notifications/feed'
    export default {
        name: "mobileNav",
        props:['mobile_hide'],
        data(){
            return {

            }
        },
        computed: {


        },
        methods: {

            resetFilter(name){
                this.$router.push({path:`/${name}`})
                this.$store.commit(`${name}/clearFilter`)
                this.$store.dispatch(`${name}/list`);

            },

            link(pathName){

                this.$router.push({name: pathName})

            },


        },
        components: {

            IconBase,
            IconMain,
            IconOpinion,
            IconSearch,
            IconBell,
            avatar,
            IconMenu,
            notificationFeed

        }
    }
</script>

<style lang="scss">
    .mobile-nav {
        ul {
            margin-top: 0px;
            padding: 10px;
            display: inline-flex;
            list-style: none;
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding-left: 0px;
            align-items: center;

                g {

                    fill: #FFFFFF;

                }

        }

        .main-icon {


            .question {

                fill: #000000 ;
                stroke: none;

            }
            rect {

                stroke: #000000;

            }

            path {

                // stroke: #000000;

            }

        }


        .search {

            path {

                fill: #4B97B4;

            }

        }
        .primary {

            .question {

                fill: #4B97B4 ;
                stroke: none;

            }
            rect {

                stroke: #4B97B4;

            }

            path {

                stroke: #4B97B4;

            }

        }
        .el-badge {

            margin: 0px !important;


            .el-badge__content {

                border-radius: 30px;
                color: #FFF;
                display: inline-block;
                font-size: 8px;
                height: 12px;
                line-height: 12px;
                padding: 0px 4px;
                text-align: center;
                white-space: nowrap;
                border: 1px solid #FFF;

            }

            .el-badge__content {

                position: absolute;
                top: 3px !important;
                right: 7px;
            }

        }


    }
</style>
