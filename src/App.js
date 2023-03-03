import React from 'react'
import './App.css'
import MenuItems from './components/MenuItems'
import { useForm } from 'react-hook-form'
import NavType from './components/NavType'
import styles from './styles.module.scss'
import Box from '@mui/material/Box'

function App() {
    const methods = useForm({
        mode: 'onSubmit',
        defaultValues: {
            top: true,
            menuItems: [
                {
                    title: 'home',
                    url: 'www.home.com',
                    icon: 'fa-home',
                },
                { title: 'account', url: 'www.account.com', icon: 'fa-user' },
                {
                    title: 'collections',
                    url: 'www.collections.com',
                    icon: 'fa-shirt',
                },
                {
                    title: 'wishlist',
                    url: 'www.wishlist.com',
                    icon: 'fa-heart',
                },
                {
                    title: 'cart',
                    url: 'www.cart.com',
                    icon: 'fa-cart-shopping',
                },
                { title: 'about', url: 'www.about.com', icon: 'fa-store' },
            ],
        },
    })

    const onSubmit = (data) => {
        console.log('data', data)
    }

    return (
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
            </Box>
        </div>
    )
}

export default App
