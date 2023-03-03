import React from 'react'
import { useDroppable } from '@dnd-kit/core'

export default function Droppable(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
    })
    const style = {
        color: isOver ? 'blue' : undefined,
    }

    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    )
}
