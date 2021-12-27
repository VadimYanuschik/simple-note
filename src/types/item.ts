export interface ItemState {
    id: number | null;
    name: null | string;
    checked?: false;
}

export enum ItemActionTypes {
    ADD_ITEM = 'ADD_ITEM',
    ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS',
    ADD_ITEM_ERROR = 'ADD_ITEM_ERROR',
    CHECK_ITEM = 'CHECK_ITEM',
    CHECK_ITEM_SUCCESS = 'CHECK_ITEM_SUCCESS',
    CHECK_ITEM_ERROR = 'CHECK_ITEM_ERROR',
    DELETE_ITEM = 'DELETE_ITEM',
    DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS',
    DELETE_ITEM_ERROR = 'DELETE_ITEM_ERROR',
}

export interface AddItemAction {
    type: ItemActionTypes.ADD_ITEM
}

export interface AddItemSuccessAction {
    type: ItemActionTypes.ADD_ITEM_SUCCESS
}

export interface AddItemErrorAction {
    type: ItemActionTypes.ADD_ITEM_ERROR,
    payload: string
}

export interface DeleteItemAction {
    type: ItemActionTypes.DELETE_ITEM
}

export interface DeleteItemSuccessAction {
    type: ItemActionTypes.DELETE_ITEM_SUCCESS
}

export interface DeleteItemErrorAction {
    type: ItemActionTypes.DELETE_ITEM_ERROR,
    payload: string
}

export interface CheckItemAction {
    type: ItemActionTypes.CHECK_ITEM
}

export interface CheckItemSuccessAction {
    type: ItemActionTypes.CHECK_ITEM_SUCCESS
}

export interface CheckItemErrorAction {
    type: ItemActionTypes.CHECK_ITEM_ERROR,
    payload: string
}

export type ItemAction = AddItemAction
| AddItemSuccessAction
| AddItemErrorAction
| DeleteItemAction
| DeleteItemSuccessAction
| DeleteItemErrorAction
| CheckItemAction
| CheckItemSuccessAction
| CheckItemErrorAction