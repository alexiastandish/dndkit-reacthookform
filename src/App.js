import React from 'react'
import './App.css'
import MenuItems from './components/MenuItems'
import { FormProvider, useForm } from 'react-hook-form'
import NavType from './components/NavType'
import styles from './styles.module.scss'
import Box from '@mui/material/Box'
import constants from './utils/constants.json'
import Preview from './components/Preview'

function App() {
    const methods = useForm({
        mode: 'onSubmit',
        defaultValues: constants.defaultValues,
    })

    const onSubmit = (data) => {
        console.log('data', data)
    }

    return (
        <div className={styles.section}>
            <FormProvider {...methods}>
                <div className={styles.container}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <NavType
                            control={methods.control}
                            setValue={methods.setValue}
                        />
                        <MenuItems
                            control={methods.control}
                            register={methods.register}
                            watch={methods.watch}
                            setValue={methods.setValue}
                        />
                        <input type="submit" />
                    </form>
                    <Box sx={{ typography: 'body1' }}>
                        Is dirty: {JSON.stringify(methods.formState.isDirty)}
                        <button
                            onClick={() =>
                                methods.reset({ ...constants.defaultValues })
                            }
                            type="button"
                        >
                            discard changes
                        </button>
                    </Box>
                </div>

                <Preview />
            </FormProvider>
        </div>
    )
}

export default App
