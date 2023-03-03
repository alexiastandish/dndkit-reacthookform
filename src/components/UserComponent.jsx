import { useDraggable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React from 'react'
import styles from '../styles.module.scss'
import EditContainer from './EditContainer'
import Box from '@mui/material/Box'

export default function UserComponent({ id, name, register, index, setValue }) {
    // setNodeRef: how it's going to track the element
    // attributes: defining different attributes for your element
    // listener: how we are going to listen for the event
    // transition: for animation
    // transform: coordinates
    const {
        setNodeRef,
        setActivatorNodeRef,
        attributes,
        listeners,
        transition,
        transform,
    } = useSortable({ id })

    const style = { transition, transform: CSS.Transform.toString(transform) }

    return (
        <div ref={setNodeRef} className={styles.user} style={style}>
            <button {...listeners} {...attributes}>
                drag handle
            </button>
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
            <EditContainer button="link">
                <input
                    {...register(`users.${index}.url`, {
                        onChange: (e) => {
                            setValue(`users.${index}.url`, e.target.value, {
                                shouldValidte: true,
                                shouldDirty: true,
                                shouldTouch: true,
                            })
                        },
                    })}
                />
            </EditContainer>
        </div>
    )
}
