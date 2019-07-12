<template>
    <div class="header">

        <div class="background" :style="{backgroundImage: `url('${form.pictures[0].url}')`}">

            <upload-reusable
                    width="100%"
                    height="100%"
                    @upload="({file, url}) => {
                        updateArrayField(file, 'pictures', 'picture', 0);
                        updateArrayField(url, 'pictures', 'url', 0);
                    }">
                <template #icon>
                    <icon-base
                            class="pointer"
                            v-show="!form.pictures[0].url"
                            width="24"
                            height="21"
                            viewBox="0 0 20 17"
                            icon-name="upload"><icon-upload-photo/>
                    </icon-base>
                </template>
                <template #clearIcon>
                    <icon-base
                            class="pointer"
                            v-show="!!form.pictures[0].url"
                            @click.native="() => {
                                updateArrayField('', 'pictures', 'picture', 0);
                                updateArrayField('', 'pictures', 'url', 0);
                            }"
                            fill="none"
                            width="22"
                            height="22"
                            viewBox="0 0 19 19"
                            icon-name="close"><icon-cross/>
                    </icon-base>
                </template>
            </upload-reusable>

            <picture-reusable
                    class="avatar absolute"
                    size="72"
                    :img="form.pictures[1].url"
                    bg-color="#ADAFB3"
                    rounded
                    without-text>
                <template #innerPicture>
                    <upload-reusable
                            width="100%"
                            height="100%"
                            @upload="({file, url}) => {
                                updateArrayField(file, 'pictures', 'picture', 1);
                                updateArrayField(url, 'pictures', 'url', 1);
                            }">
                        <template #icon>
                            <icon-base
                                    class="pointer"
                                    v-show="!form.pictures[1].url"
                                    width="24"
                                    height="21"
                                    viewBox="0 0 20 17"
                                    icon-name="upload"><icon-upload-photo/>
                            </icon-base>
                        </template>
                        <template #clearIcon>
                            <icon-base
                                    class="pointer"
                                    v-show="!!form.pictures[1].url"
                                    @click.native="() => {
                                        updateArrayField('', 'pictures', 'picture', 1);
                                        updateArrayField('', 'pictures', 'url', 1);
                                    }"
                                    fill="none"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 19 19"
                                    icon-name="close"><icon-cross/>
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
    import IconCross from "../../icons/IconCross";



    export default {
        name: "pageHeader",
        components: {
            UploadReusable,
            PictureReusable,
            IconBase,
            IconUploadPhoto,
            IconCross
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
                background-size: cover;
                background-repeat: no-repeat;

                .avatar {
                    bottom: -24px;
                    left: -10px;
                }
            }

        }
    }


</style>