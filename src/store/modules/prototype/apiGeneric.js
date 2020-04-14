import {api, apiData} from "../../../utils/api";

export default class apiGeneric  {

    static async apiRequest(requestParams){
        const {DATA, PARAMS, METHOD = 'get', URL, commit} = requestParams;

        return !PARAMS ? apiData({URL:URL, METHOD:METHOD, DATA:DATA}) : api({URL:URL, METHOD:METHOD, PARAMS:PARAMS});
    }



}
