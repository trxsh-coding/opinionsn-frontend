<template>
    <div class="option__item" >
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
            }
        },
        computed: {
            wrapperStyle(){
                let {height, width} = this;
                borRad = (borRad.slice(-1) === '%') ? borRad : borRad + 'px';
                if (rounded) borRad = "50%";

                return {
                    width: `${size || width}px`,
                    height: `${size || height}px`,
                    borderRadius: `${borRad}`,
                };
            },

        }
    }
</script>

<style lang="scss">

</style>
