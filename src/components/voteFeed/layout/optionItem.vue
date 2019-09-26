<template>
    <div class="option__item " :style="wrapperStyle">
        <span>{{option.description}}</span>
    </div>
</template>

<script>
    export default {
        name: "optionsScrollBlock",
        props: {
            option: {
              type: Object,
              required: true,
            },
            width: {
                type: Number
            },
            height: {
                type: Number
            },
            borRad: {
                type: [String, Number],
                default: function () {
                    return 'auto';
                }
            },
            bows: {
                type: Object
            },
            chosenOption: {
               type: Boolean
            },
            voted: {
                type: Boolean
            },
            selected: {
              type: Boolean
            },
            size: {
                type: Number
            }
        },
        computed: {
            wrapperStyle(){
                let {height, width, borRad, size, selected} = this;
                borRad = (borRad.slice(-1) === '%') ? borRad : borRad + 'px';
                let selectedOption = selected ? {backgroundColor: '#4B97B4', color:'#ffffff' } : {backgroundColor: '#ffffff', color:'#1A1E22', border: '0.5px solid #BCBEC3' };
                return {
                    // flexBasis: `${size || width}px`,
                    height: `${size || height}px`,
                    borderRadius: `${borRad}`,
                    ...selectedOption
                };
            },

        }
    }
</script>

<style lang="scss">
    .option__item {

        padding: 6px 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        flex-shrink: 0;
        flex-grow: 0;
        max-width: 180px;
        flex-basis: auto;

		overflow: hidden;

        span {
            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 13px;
            line-height: 16px;

			height: auto;
			max-height: 100%;
			overflow: hidden;

        }

        &:last-child {
            margin-right: 9px !important;
        }
    }
</style>
