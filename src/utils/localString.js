import {mapState} from 'vuex';


function  transformedKey(key){
    let noUnderscoreString = key.replace(new RegExp('_', 'g'), ' ');
    return noUnderscoreString.charAt(0).toUpperCase() + noUnderscoreString.slice(1);
}


export const localString = (lang={}, key='')=>{
    let translated = lang[key];
    return translated || transformedKey(key);
}


export const ezLocalString = (key)=>{

}
