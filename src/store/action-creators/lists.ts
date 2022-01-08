import {Dispatch} from "redux";
import {ListAction, ListActionTypes} from '../../types/list'
import {collection, getDocs, where, doc, addDoc, orderBy, deleteDoc, query} from 'firebase/firestore'
import {db} from "../../firebase/firebase.config";

export const fetchLists = (uid: string) => {
    return async (dispatch: Dispatch<ListAction>) => {
        try {
            const ListsRef = await collection(db, 'lists')
            const UserRef = doc(db, "users", uid);

            const q = query(ListsRef, where('userID', '==', UserRef), orderBy('date', 'desc'))
            const response = await getDocs(q);
            dispatch({type: ListActionTypes.FETCH_LISTS})
            let lists = response.docs.map((doc) => ({id: doc.id, ...doc.data()}))
            dispatch({type: ListActionTypes.FETCH_LISTS_SUCCESS, payload: lists})
        } catch (e) {
            console.log(e)
        }
    }
}

export const fetchList = (id: string) => {
    return async (dispatch: Dispatch<ListAction>) => {
        try {
            dispatch({type: ListActionTypes.FETCH_LIST})
            // have id : Lists => items of lists by ID.
            const ListRef = doc(db, "lists", id);
            const ItemsRef = await collection(db, 'items')
            const q = query(ItemsRef, where("listID", "==", ListRef), orderBy('date', 'desc'));
            const response = await getDocs(q)
            const items = response.docs.map((doc) => ({id: doc.id, ...doc.data()}))
            // @ts-ignore
            dispatch({type: ListActionTypes.FETCH_LIST_SUCCESS, payload: items})
        } catch (e) {
            console.log(e)
        }
    }
}

export const addList = (list: string, uid: string) => {
    return async(dispatch: Dispatch<ListAction>) => {
        try {
            dispatch({type: ListActionTypes.ADD_LIST, payload: {name: list}})
            const UserRef = doc(db, "users", uid);
            await addDoc(collection(db, "lists"), {
                name: list,
                date: Date.now(),
                userID: UserRef
            });
            dispatch({type: ListActionTypes.ADD_LIST_SUCCESS})
        } catch (e) {
            dispatch({type: ListActionTypes.FETCH_LISTS_ERROR, payload: 'Произошла ошибка при добавлении списка'})
        }
    }
}

export const removeList = (id: string) => {
    return async(dispatch: Dispatch<ListAction>) => {
        try {
            dispatch({type: ListActionTypes.REMOVE_LIST})
            await deleteDoc(doc(db, "lists", id));
            dispatch({type: ListActionTypes.REMOVE_LIST_SUCCESS, payload: id})

        } catch (e) {
            dispatch({type: ListActionTypes.FETCH_LISTS_ERROR, payload: 'Произошла ошибка при удалении списка'})
        }
    }
}

