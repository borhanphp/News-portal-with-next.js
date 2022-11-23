import BanglaView from "../../components/AllViews/BanglaView";
import { BANGLA_VERSION, ENGLISH_VERSION } from "../constant/versionConstant";


// const initialCounter = {count : <Plus/>};



export const versionReducer = (state = "bangla", action) => {
    switch (action.type) {
        case BANGLA_VERSION:
            return (
                "bangla"
                )
        case ENGLISH_VERSION:
            return (
                "english"
            )

        default:
            return state;

    }
}