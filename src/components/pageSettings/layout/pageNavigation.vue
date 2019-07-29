<template>
    <div class="navigation flex-between flex-align-center">
        <lang-string
                @click.native="setInitForm"
                class="cancel-btn pointer"
                :title="'cancel'" />
        <lang-string
                class="title"
                :title="'edit_profile'" />
        <lang-string
                @click.native="sendForm"
                class="submit-btn pointer"
                :title="'done'" />
    </div>
</template>

<script>
    import langString from "../../langString";
    import {mapState} from "vuex";

    export default {
        name: "pageNavigation",
        components: {
            langString
        },

        computed: {
            ...mapState('globalStore', {
                mainUser: s => s.mainUser
            })
        },

        methods: {

            setInitForm() {
                this.$store.commit('formManagment/SET_INITIAL_FORM', {form: 'edit_form', value: {...this.mainUser}});
            },

            sendForm() {
                console.log(this.mainUser);
            }

        },
    }
</script>

<style lang="scss">

    .navigation {

        .cancel-btn {
            font-weight: normal;
            font-size: 13px;
            color: #BCBEC3;
        }

        .title {
            font-weight: bold;
            font-size: 17px;
            color: #4B97B4;
        }

        .submit-btn {
            font-weight: normal;
            font-size: 13px;
            color: #1A1E22;
        }

    }

</style>