<template>
    <div class="select-block">
        <dropdown-list-reusable >
            <template >
                <input type="text" v-model="selected == null ? choiceText : selected" disabled>

            </template>
            <template #icon>


                <icon-base
                        fill="none"
                        width="10"
                        height="6"
                        viewBox="10 0 10 6"
                        icon-name="add"><icon-select/>
                </icon-base>
            </template>
            <template #items>
                <lang-string class="pointer" v-for="option in items" :title="option.name" @click.native="handleSelectOption(arguments[0].target.innerText)"/>
            </template>
         </dropdown-list-reusable>
    </div>
</template>

<script>
    import IconBase from "../icons/IconBase";
    import IconSelect from "../icons/create/IconSelect";
    import langString from "../langString"
    import DropdownListReusable from "./DropdownListReusable";
    import langMixin from "../mixins/langMixin";
    export default {
        name: "reusableSelect",
        mixins:[langMixin],
        components: {DropdownListReusable, IconBase, IconSelect, langString},
        model: {
            event: 'selected'
        },
        props: {
          items: {
              type: Object,
              required: true
          },
          customPlaceholder: {
              type: String,
          }

        },
        data() {
            return {
                selected:null
            }
        },
        computed: {

            choiceText(){

                let {lstr, customPlaceholder} = this;

                if(customPlaceholder == undefined) return this.lstr('Choose');

                else return lstr(`${customPlaceholder}`)


            }

        },
        methods: {

            handleSelectOption(e){
                this.$emit('selected', e)
                this.selected = e;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .select-block {

        input {
            background: #FFFFFF;
            border: none;
            font-family: Roboto;
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            color: #1A1E22;
            &:focus {
                outline: none;
            }
        }
        span {
            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            color: #1A1E22;
            &:hover {
                color: #4B97B4;
            }
        }
    }


</style>
