import React, { useState } from 'react'
import UserComponent from './UserComponent'
import styles from '../styles.module.scss'
import {
    closestCenter,
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    KeyboardSensor,
} from '@dnd-kit/core'
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useFieldArray } from 'react-hook-form'

export default function Users({ control, register, setValue }) {
    // TODO
    const { fields, move } = useFieldArray({
        control,
        name: 'users',
    })

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragEnd = (event) => {
        const { active, over } = event

        if (active.id !== over.id) {
            const oldIndex = fields.findIndex((item) => item.id === active.id)
            const newIndex = fields.findIndex((item) => item.id === over.id)

            move(oldIndex, newIndex)
        }
    }
    console.log('fields', fields)

    //    context of the global component where all the drag and drop will happen
    //    sensors: what kind of sensors do you want to use (pointer? keyboard?); how you can control dragging and dropping
    //    collectionDetention: know how dnd will determine if you are over something or not

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            {/* sorting the items; will keep track of all items and provide all the data needed for the component to move (slide over) and switch places */}
            {/* sortable context needs id of elements for tracking those items (mapping all items to their ids) */}
            {/* strategy: moving the item horizontally or vertically */}
            <SortableContext
                items={fields.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
            >
                {fields.map((item, index) => {
                    return (
                        <UserComponent
                            {...item}
                            index={index}
                            key={item.id}
                            register={register}
                            setValue={setValue}
                        />
                    )
                })}
            </SortableContext>
        </DndContext>
    )
}
