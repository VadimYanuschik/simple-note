import {Dispatch} from "redux";
import {ItemAction, ItemActionTypes} from '../../types/item'
import {addDoc, collection, deleteDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase.config";

export const CheckItem = (id: string, status: boolean) => {
    return async(dispatch: Dispatch<ItemAction>) => {
        try {
            dispatch({type: ItemActionTypes.CHECK_ITEM})

            const ItemRef = doc(db, "items", id);
            await updateDoc(ItemRef, {
                checked: status
            });
            dispatch({type: ItemActionTypes.CHECK_ITEM_SUCCESS})
        } catch (e) {
            dispatch({type: ItemActionTypes.CHECK_ITEM_ERROR, payload: 'Произошла ошибка при изменении Элемента'})
        }
    }
}

export const AddItem = (id: string, name: string) => {
    return async(dispatch: Dispatch<ItemAction>) => {
        try {
            dispatch({type: ItemActionTypes.ADD_ITEM})
            const ListRef = doc(db, "lists", id);
            await addDoc(collection(db, "items"), {
                name: name,
                listID: ListRef,
                date: Date.now()
            });
            dispatch({type: ItemActionTypes.ADD_ITEM_SUCCESS})
        } catch (e) {
            dispatch({type: ItemActionTypes.ADD_ITEM_ERROR, payload: 'Произошла ошибка при добавлении Элемента'})
        }
    }
}

export const DeleteItem = (itemID: string) => {
    return async(dispatch: Dispatch<ItemAction>) => {
        try {
            dispatch({type: ItemActionTypes.DELETE_ITEM})
            await deleteDoc(doc(db, "items", itemID));
            dispatch({type: ItemActionTypes.DELETE_ITEM_SUCCESS})
        } catch (e) {
            dispatch({type: ItemActionTypes.DELETE_ITEM_ERROR, payload: 'Произошла ошибка при удалении Элемента'})
        }
    }
}

