import axios from 'axios'
const {VUE_APP_MAIN_API} = process.env;

export async function enchancedAxios(params) {
    return axios({
        ...params,
        url: `${VUE_APP_MAIN_API + params.url}`
    })
}

export const api = async ({METHOD, URL, PARAMS = {}, otherConfig = {}}) => {

    return axios({
        method: METHOD,
        url: `${VUE_APP_MAIN_API + URL}`, //
        params: PARAMS,
        ...otherConfig
    })

};

export const apiData = async ({METHOD, URL, DATA, HEADERS = {}, otherConfig = {} }) => (
    axios({
        method: METHOD,
        url: `${VUE_APP_MAIN_API + URL}`, //
        data: DATA,
        headers: HEADERS,
        ...otherConfig
    })
)

