import { useDraggable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React from 'react'
import styles from '../styles.module.scss'

export default function UserComponent({ id, register, index, setValue }) {
    // setNodeRef: how it's going to track the element
    // attributes: defining different attributes for your element
    // listener: how we are going to listen for the event
    // transition: for animation
    // transform: coordinates
    const { setNodeRef, attributes, listeners, transition, transform } =
        useSortable({ id })

    const style = { transition, transform: CSS.Transform.toString(transform) }

    return (
        <div
            ref={setNodeRef}
            className={styles.user}
            style={style}
            {...listeners}
            {...CSS.attributes}
        >
            {/* <button> */}
            <input
                {...register(`users.${index}.name`, {
                    onChange: (e) => {
                        setValue(`users.${index}.name`, e.target.value, {
                            shouldValidte: true,
                            shouldDirty: true,
                            shouldTouch: true,
                        })
                    },
                })}
            />
            {/* </button> */}
        </div>
    )
}
