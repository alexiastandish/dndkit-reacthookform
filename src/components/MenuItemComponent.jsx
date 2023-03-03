import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React, { useState } from 'react'
import styles from '../styles.module.scss'
import EditContainer from './EditContainer'
import Box from '@mui/material/Box'
import constants from '../utils/constants.json'

export default function MenuItemComponent({
    id,
    register,
    index,
    setValue,
    watch,
    remove,
}) {
    // setNodeRef: how it's going to track the element
    // attributes: defining different attributes for your element
    // listener: how we are going to listen for the event
    // transition: for animation
    // transform: coordinates
    const { setNodeRef, attributes, listeners, transition, transform } =
        useSortable({ id })
    const [close, setClose] = useState(false)

    const style = { transition, transform: CSS.Transform.toString(transform) }

    const icon = watch(`menuItems.${index}.icon`)

    return (
        <div ref={setNodeRef} className={styles.user} style={style}>
            <div className={styles.userContent}>
                <button {...listeners} {...attributes} type="button">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
                <EditContainer
                    buttonIdentifier={`icon-${index}`}
                    closeOnClick={close}
                    setClose={setClose}
                    button={<i className={`fa ${icon}`}></i>}
                >
                    <Box
                        sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}
                        style={{ height: 100, width: 200, overflow: 'scroll' }}
                    >
                        {constants.icons.map((icon) => {
                            return (
                                <i
                                    style={{ margin: 5 }}
                                    className={`fa ${icon}`}
                                    key={icon}
                                    onClick={(e) => {
                                        setValue(
                                            `menuItems.${index}.icon`,
                                            e.target.className.split(' ')[1],
                                            {
                                                shouldValidte: true,
                                                shouldDirty: true,
                                                shouldTouch: true,
                                            }
                                        )
                                        return setClose(true)
                                    }}
                                ></i>
                            )
                        })}
                    </Box>
                </EditContainer>

                <input
                    {...register(`menuItems.${index}.title`, {
                        onChange: (e) => {
                            setValue(
                                `menuItems.${index}.title`,
                                e.target.value,
                                {
                                    shouldValidte: true,
                                    shouldDirty: true,
                                    shouldTouch: true,
                                }
                            )
                        },
                    })}
                />
                <EditContainer button="link" buttonIdentifier={`link-${index}`}>
                    <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                        <input
                            {...register(`menuItems.${index}.url`, {
                                onChange: (e) => {
                                    setValue(
                                        `menuItems.${index}.url`,
                                        e.target.value,
                                        {
                                            shouldValidte: true,
                                            shouldDirty: true,
                                            shouldTouch: true,
                                        }
                                    )
                                },
                            })}
                        />
                    </Box>
                </EditContainer>
            </div>

            <button
                type="button"
                onClick={() => remove(index)}
                className={styles.removeBtn}
            >
                <i className="fa-solid fa-trash"></i>
            </button>
        </div>
    )
}
