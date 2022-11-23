import { createStore } from "redux";
import { versionReducer } from "./service/reducer/versionReducer";



export const store = createStore(versionReducer);