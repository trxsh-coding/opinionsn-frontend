<template>
    <div class="header">

        <div class="background">

            <upload-reusable
                    class="mt-12"
                    width="100%"
                    height="100%"
                    :value="form.pictures[0]"
                    @upload="({file, url}) => {
                        updateArrayField(file, 'pictures', 'picture', 0);
                        updateArrayField(file, 'pictures', 'url', 0);
                    }">
                <template #icon>
                    <icon-base
                            width="24"
                            height="21"
                            viewBox="0 0 20 17"
                            icon-name="add"><icon-upload-photo/>
                    </icon-base>
                </template>
            </upload-reusable>

            <picture-reusable
                    class="avatar absolute"
                    size="72"
                    rounded
                    without-text>
                <template #innerPicture>
                    <upload-reusable
                            class="mt-12 b-3"
                            width="100%"
                            height="100%"
                            :value="form.pictures[1]"
                            @upload="({file, url}) => {
                                updateArrayField(file, 'pictures', 'picture', 1);
                                updateArrayField(file, 'pictures', 'url', 1);
                            }">
                        <template #icon>
                            <icon-base
                                    width="24"
                                    height="21"
                                    viewBox="0 0 20 17"
                                    icon-name="add"><icon-upload-photo/>
                            </icon-base>
                        </template>
                    </upload-reusable>
                </template>
            </picture-reusable>
        </div>

    </div>
</template>

<script>
    import PictureReusable from "../../reusableСomponents/PictureReusable";
    import UploadReusable from "../../reusableСomponents/UploadReusable";
    import {mapState} from "vuex";

    import IconBase from "../../icons/IconBase";
    import IconUploadPhoto from "../../icons/create/IconUploadPhoto";



    export default {
        name: "pageHeader",
        components: {
            UploadReusable,
            PictureReusable,
            IconBase,
            IconUploadPhoto
        },
        computed: {
            ...mapState('creationManagement', {

                form: s => s.edit_form,

            }),
        },
        methods: {
            updateField(value, keyName){

                console.log(target.value, keyName);
                this.$store.commit('creationManagement/UPDATE_FIELD', {value, keyName, form: 'edit_form' })

            },
            updateArrayField(value, arrayName, keyName, index){

                console.log(value);

                this.$store.commit('creationManagement/UPDATE_ARRAY_FIELD', {value, arrayName, keyName, index, form: 'edit_form' })

            },
        },
    }
</script>

<style lang="scss">

    .settings-page {

        .header {
            height: 156px;

            svg {
                * {
                    fill: #fff;
                }
            }

            .background {
                position: relative;
                height: 132px;
                background-color: #ADAFB3;
                background-size: contain;
                background-repeat: no-repeat;

                .avatar {
                    bottom: -24px;
                    left: -10px;
                }
            }

        }
    }


</style>