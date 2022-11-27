import { SEARCH_BANGLA, SEARCH_ENGLISH } from "../constant/searchConstant";



export const banglaSearch = () => {
    return {
        type: SEARCH_BANGLA,
    }
}

export const englishSearch = () => {
    return {
        type: SEARCH_ENGLISH,
    }
}