import {legacy_createStore} from "redux";
import {Reducer, initialState} from "./reducer";

export const ConfigureStore = () => {
    const store = legacy_createStore(Reducer, initialState);

    return store;
}