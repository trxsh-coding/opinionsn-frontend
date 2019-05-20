import {imageUtil} from '../../utils/imagesString'

export default {

    computed: {

        imageUtil(){

            return (str, size)=>imageUtil(str, size);

        }
    }

}
