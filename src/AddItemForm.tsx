import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

type AddItemFormPropsType = {
    addItem: (title:string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)
    const errorMessageStyles = {color: "hotpink"}

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter"/* && e.ctrlKey*/) {
            onClickAddItem()
        }
    }

    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    return (

        <div>
            <TextField
                size={"small"}
                variant={"outlined"}
                value={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddItem}
                label={"Title"}
                error={error}
                helperText={error && "Title is required!"}
            />
            <IconButton
                aria-label={"arrowForwardIcon"} onClick={onClickAddItem}>
                <ArrowForwardIcon/></IconButton>
{/*
            {error && <div style={errorMessageStyles}>Title is required!</div>}
*/}
        </div>
    )
}