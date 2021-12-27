import {combineReducers} from "redux";
import {listReducer} from "./listReducer";


export const rootReducer = combineReducers({
        list: listReducer
    }
);

export type RootState = ReturnType<typeof rootReducer>