 function convertSize(string, size) {
    let sizePicture = string.replace("s/", `s/${size}`)
    return sizePicture

}

export const imageUtil = (string, size='')=>{
    return convertSize(string, size)
}
