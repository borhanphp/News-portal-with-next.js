import BanglaView from "../../components/AllViews/BanglaView";
import { SEARCH_BANGLA, SEARCH_ENGLISH } from "../constant/searchConstant";


// const initialCounter = {count : <Plus/>};



export const versionReducer = (state = "bangla", action) => {
    switch (action.type) {
        case SEARCH_BANGLA:
            return (
                "bangla"
                )
        case SEARCH_ENGLISH:
            return (
                "english"
            )

        default:
            return state;

    }
}