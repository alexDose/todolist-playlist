import {ChangeEvent, memo, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanType> = memo((props) => {
    console.log('span')
    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        props.onChange(title)
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
})