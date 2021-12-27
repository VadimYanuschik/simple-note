import React, {useEffect, useState} from 'react';
import './Sidebar.scss';
import {List, ListItem, ListItemButton, ListItemText, TextField, Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {addList, fetchLists, removeList} from "../../store/action-creators/lists";
import {Link} from 'react-router-dom';
import {useNavigate} from "react-router";
import {ListProperties} from "../../types/list";
import {RootState} from "../../store/reducers";
import {getAuth, onAuthStateChanged} from "firebase/auth";


const Sidebar = () => {
    const navigate = useNavigate();
    const [list, setList] = useState('');
    const [uid, setUid] = useState<string>('');
    const lists = useSelector((state: RootState) => state.list.lists)
    const dispatch = useDispatch()

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid)
                dispatch(fetchLists(user.uid))
            }
        });

        return onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login')
            }
        })
    }, []);

    const handleAddList = () => {
        if (list.length >= 5) {
            uid && dispatch(addList(list, uid))
            dispatch(fetchLists(uid))
            setList('')
        }
    }

    const handleDeleteClick = (id: string) => {
        dispatch(removeList(id))
    }

    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddList()
        }
    }

    return (
        <div className="sidebar">
            <div className="add-list">
                <TextField onKeyDown={handleEnterPress} value={list} onChange={e => setList(e.target.value)}
                           color="secondary" id="outlined-basic" label="Новый список" variant="outlined"/>
                <Button onClick={handleAddList} color="secondary" variant="contained">Добавить</Button>
            </div>
            <List className="lists" sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                {lists.map((list: ListProperties, index: number) => (
                    <Link key={index} to={`/lists/${list.id}`}>
                        <ListItem
                            secondaryAction={
                                <IconButton onClick={() => handleDeleteClick(list.id)} edge="end" aria-label="delete">
                                    <DeleteIcon/>
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton>
                                <ListItemText primary={list.name}/>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
                {lists.length === 0 && <ListItem>Создайте новый список</ListItem>}
            </List>
        </div>
    );
}

export default Sidebar;