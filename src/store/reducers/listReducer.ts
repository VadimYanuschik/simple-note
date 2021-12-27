import {ListAction, ListActionTypes, ListState} from "../../types/list";

const initialState : ListState = {
    lists: [],
    loading: false,
    error: null,
    status: null,
    currentList: null
}

export const listReducer = (state = initialState, action : ListAction) : ListState => {
    switch (action.type) {
        case ListActionTypes.FETCH_LISTS:
            return {...state, loading: true, error: null}
        case ListActionTypes.FETCH_LISTS_SUCCESS:
            return {...state, lists: action.payload, loading: false, error: null}
        case ListActionTypes.FETCH_LISTS_ERROR:
            return {...state, loading: false, error: "Ошибка загрузки списков"}
        case ListActionTypes.FETCH_LIST:
            return {...state, currentList: null, loading: true, error: null}
        case ListActionTypes.FETCH_LIST_SUCCESS:
            return {...state, currentList: action.payload, loading: false, error: null}
        case ListActionTypes.FETCH_LIST_ERROR:
            return {...state, loading: false, error: "Ошибка загрузки списков"}
        case ListActionTypes.ADD_LIST:
            return {...state, lists:[...state.lists, action.payload], loading: true, error: null}
        case ListActionTypes.ADD_LIST_SUCCESS:
            return {...state, loading: false, error: null, status: "Новый список создан"}
        case ListActionTypes.ADD_LISTS_ERROR:
            return {...state, loading: false, error: "Ошибка добавления нового списка"}
        case ListActionTypes.REMOVE_LIST:
            return {...state, loading: true, error: null}
        case ListActionTypes.REMOVE_LIST_SUCCESS:
            return {lists: [...removeListByID(action.payload, state.lists)], status: "Удален список", loading: false, error: null}
        case ListActionTypes.REMOVE_LIST_ERROR:
            return {...state, loading: false, error: "Ошибка удаления слиска"}
        default:
            return state;
    }
}

const removeListByID = (id : string, lists: any[]) : any[] => {
    return lists.filter(list => list.id !== id);
}