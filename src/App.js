import React, { useState } from 'react'
import './App.css'
import Users from './components/Users'
import { useForm } from 'react-hook-form'
import NavType from './components/NavType'
import styles from './styles.module.scss'
import Box from '@mui/material/Box'

function App() {
    const methods = useForm({
        mode: 'onSubmit',
        defaultValues: {
            top: true,
            users: [
                {
                    name: 'alexia',
                    url: 'www.alexia.com',
                },
                { name: 'chai', url: 'www.chai.com' },
                { name: 'mia', url: 'www.mia.com' },
                { name: 'justin', url: 'www.justin.com' },
                { name: 'sean', url: 'www.sean.com' },
                { name: 'fernando', url: 'www.fernando.com' },
            ],
        },
    })

    const onSubmit = (data) => {
        console.log('data', data)
    }
    const dirty = methods.formState
    console.log('dirty', dirty)

    return (
        <div className={styles.container}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <NavType
                    control={methods.control}
                    setValue={methods.setValue}
                />
                <Users
                    control={methods.control}
                    register={methods.register}
                    setValue={methods.setValue}
                />
                <input type="submit" />
            </form>
            <Box sx={{ typography: 'body1' }}>
                Is dirty: {JSON.stringify(methods.formState.isDirty)}
            </Box>
        </div>
    )
}

export default App
