import {combineReducers, legacy_createStore, applyMiddleware} from "redux";
import {Dishes} from "./dishes";
import {Comments} from "./comments";
import {Promotions} from "./promotions";
import {Leaders} from "./leaders";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
    return legacy_createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        }),
        applyMiddleware(thunk, logger)
    );
}