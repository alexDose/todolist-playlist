import {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanType> = (props) => {
    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        props.changeTitle(title)
        setEditMode(false)
    }

    return (
        editMode
            ? <TextField
                value={title}
                onChange={onChangeSetTitle}
                autoFocus
                onBlur={offEditMode}/>
            : <span onDoubleClick={onEditMode}>
                {title}</span>
    )
}