<template>

    <div>
        <!-- Ошибка -->
        <div v-if="state.error">
            Что-то сломалось:
            {{state.error}}
        </div>

        <!-- Загрузка -->
        <div v-else-if="state.loading">
            <p align="center" style="font-size:10px;margin-top: 5px;color: darkgray">Загружаю...</p>
        </div>

        <!-- Выгрузка пользователя -->
        <div v-else-if="!items.length">
            <p align="center" style="font-size:10px;margin-top: 5px;color: darkgray">Нет событий</p>
        </div>

        <!-- Всё ок -->
        <div v-else v-for="item in sanitizedItems">
            <event :item="item"/>
        </div>
    </div>

</template>

<script>

    import event from '../voteFeed/event/Event.vue';
    import { mapState } from 'vuex';
    export default {
        name: "userFeed",
        props: ['userId'],
        computed: {
            ...mapState('userFeed', {
                state: s => s,
                items: s => s.items,
            }),

            sanitizedItems(){
                let {items} = this;

                return items.map(item=>{
                    let {eventId, feedEventType} = item;
                    if (feedEventType) item.type = feedEventType;
                    // Do the ID swapping
                    if (item.type === "POLL_CREATED"){
                        item.pollId = eventId;
                        item.isPollEvent = true;
                    } else {
                        item.voteId = eventId;
                    }


                    return item;
                });
            }
        },


        created(){
            let {userId} = this;
            if (!userId){
                console.warn('User not passed to props of User Feed');
                return;
            }
            //console.log(user);
            console.log('hi')
            this.$store.dispatch(`userFeed/list`, {customUrl: `/api/rest/getFeedByUserId/${userId}`});
        },

        components: {
            event,
        },

        watch: {
            userId: function(userId){
                if (!userId){
                    console.warn('User not passed to props of User Feed');
                    return;
                }
                //console.log(user);
                this.$store.dispatch(`userFeed/list`, {customUrl: `/api/rest/getFeedByUserId/${userId}`});
            }
        }
    }
</script>

<style scoped>

</style>
