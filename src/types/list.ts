export interface ListState {
    lists: any[];
    loading: boolean;
    error: string | null;
    status?: string | null;
    currentList?: any[] | null;
}

export interface ListItemProperties {
    id: string;
    name: string;
    checked: boolean;
}

export interface ListItemPropertiesNew {
    name: string;
    checked: boolean;
}

export interface ListItemsProperties extends Array<ListItemProperties>{}

export interface ListProperties {
    id: string;
    name: string;
    items: ListItemsProperties | null | undefined;
}

export enum ListActionTypes {
    FETCH_LISTS = 'FETCH_LISTS',
    FETCH_LISTS_SUCCESS = 'FETCH_LISTS_SUCCESS',
    FETCH_LISTS_ERROR = 'FETCH_LISTS_ERROR',
    FETCH_LIST = 'FETCH_LIST',
    FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS',
    FETCH_LIST_ERROR = 'FETCH_LIST_ERROR',
    ADD_LIST = 'ADD_LIST',
    ADD_LIST_SUCCESS = 'ADD_LIST_SUCCESS',
    ADD_LISTS_ERROR = 'ADD_LISTS_ERROR',
    REMOVE_LIST = 'REMOVE_LIST',
    REMOVE_LIST_SUCCESS = 'REMOVE_LIST_SUCCESS',
    REMOVE_LIST_ERROR = 'REMOVE_LIST_ERROR'
}

export interface FetchListsAction {
    type: ListActionTypes.FETCH_LISTS
}

export interface  FetchListsSuccessAction {
    type: ListActionTypes.FETCH_LISTS_SUCCESS,
    payload: any[]
}

export interface  FetchListsErrorAction {
    type: ListActionTypes.FETCH_LISTS_ERROR,
    payload: string
}

export interface FetchListAction {
    type: ListActionTypes.FETCH_LIST
}

export interface  FetchListSuccessAction {
    type: ListActionTypes.FETCH_LIST_SUCCESS,
    payload: any[]
}

export interface  FetchListErrorAction {
    type: ListActionTypes.FETCH_LIST_ERROR,
    payload: string
}

export interface AddListAction {
    type: ListActionTypes.ADD_LIST,
    payload: object
}

export interface AddListSuccessAction {
    type: ListActionTypes.ADD_LIST_SUCCESS
}

export interface AddListErrorAction {
    type: ListActionTypes.ADD_LISTS_ERROR,
    payload: string
}

export interface RemoveListAction {
    type: ListActionTypes.REMOVE_LIST
}

export interface RemoveListSuccessAction {
    type: ListActionTypes.REMOVE_LIST_SUCCESS,
    payload: string
}

export interface RemoveListErrorAction {
    type: ListActionTypes.REMOVE_LIST_ERROR,
    payload: string
}

export type ListAction = FetchListsAction
| FetchListsSuccessAction
| FetchListsErrorAction
| FetchListAction
| FetchListSuccessAction
| FetchListErrorAction
| AddListAction
| AddListSuccessAction
| AddListErrorAction
| RemoveListAction
| RemoveListSuccessAction
| RemoveListErrorAction