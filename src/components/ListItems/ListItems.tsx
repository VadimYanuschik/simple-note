import React, {useEffect} from 'react';
import './ListItems.scss';

import {Checkbox, List, Button, ListItemButton, ListItemIcon, ListItemText, TextField, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {teal} from "@mui/material/colors";

import {useNavigate, useParams} from "react-router";
import {useDispatch} from "react-redux";

import {useTypedSelector} from "../../hooks/useTypedSelector";
import {fetchList} from "../../store/action-creators/lists";
import {AddItem, CheckItem, DeleteItem} from "../../store/action-creators/item";
import {ListItemProperties, ListItemsProperties} from "../../types/list";

import {getAuth, signOut} from "firebase/auth";

const ListItems = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const {id} = useParams<string>();
    const items : any[] | null | undefined = useTypedSelector(state => state.list.currentList)
    const [newItem, setNewItem] = React.useState<string>('');
    const [searchBarText, setSearchBarText] = React.useState<string>('');
    const [filteredItems, setFilteredItems] = React.useState<ListItemsProperties>([]);

    useEffect(() => {
        id && dispatch(fetchList(id))
    }, [id]);

    const handleAddItem = (newItemName: string) => {
        id && dispatch(AddItem(id, newItemName))
        id && dispatch(fetchList(id))
        setNewItem('')
    }

    const handleToggle = (id: string, status: boolean) => () => {
        items?.map((list) => {
            if(list.id === id) {
                list.checked = !list.checked
            }
            return list;
        });
        dispatch(CheckItem(id, status))
    };

    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            id && handleAddItem(newItem)
        }
    }

    const handleSearchBarChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(searchBarText.length > 0) {
            let filteredItemsArray = items?.filter((list : ListItemProperties) => {
                return list.name.toLowerCase().includes(searchBarText)
            })
            filteredItemsArray && setFilteredItems(filteredItemsArray)
        }
        setSearchBarText(e.target.value)
    }

    const handleDelete = (itemID: string) => {
        dispatch(DeleteItem(itemID))
        id && dispatch(fetchList(id))
    }

    const handleLogOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigate('/login')
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div className="list-items">
            <Button onClick={() => handleLogOut()} className="logout-button" color="secondary" variant="contained">Log Out</Button>
            {items && items.length === 0 && <Typography variant="h2">Список пуст</Typography>}
            {id && items && (<div className="list-content">
                    <div className="inputs">
                        <div className="add-item">
                            <TextField onKeyDown={handleEnterPress} value={newItem} onChange={(e) => setNewItem(e.target.value)} className="add-item-input" fullWidth margin="normal" color="secondary" id="standard-basic" label="Название" variant="standard" />
                            <Button onClick={() => handleAddItem(newItem)} className="add-item-button" color="secondary" variant="contained">Добавить</Button>
                        </div>
                        <TextField value={searchBarText} onChange={handleSearchBarChange}  className="search-bar" fullWidth color="secondary" id="standard-basic" label="Поиск" variant="standard" />
                    </div>

                    <List className="list">
                        {!searchBarText && items.map((item: ListItemProperties) => (
                            <ListItemButton key={item.id} onClick={handleToggle(item.id, !item.checked)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={item.checked}
                                        edge="start"
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                                <ListItemIcon>
                                    <DeleteIcon sx={{color: teal[500]}} onClick={() => handleDelete(item.id)}/>
                                </ListItemIcon>
                            </ListItemButton>
                        ))}
                        {searchBarText && filteredItems.map((item: ListItemProperties) => (
                            <ListItemButton key={item.id} onClick={handleToggle(item.id, !item.checked)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={item.checked}
                                        edge="start"
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                                <ListItemIcon>
                                    <DeleteIcon sx={{color: teal[500]}} onClick={() => handleDelete(item.id)}/>
                                </ListItemIcon>
                            </ListItemButton>
                        ))}
                    </List>
                </div>
            )}
        </div>
    );
};


export default ListItems;
