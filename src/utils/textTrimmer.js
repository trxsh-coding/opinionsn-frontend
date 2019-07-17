

export const textTrimmer = (text) => {
    if(text.length >= 300){

        return text.substring(0, text.substring(0, 200).lastIndexOf(' ')) + '... '

    } else {
        return text

    }
}
