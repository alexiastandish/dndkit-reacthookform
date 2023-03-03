import React from 'react'
import { useFormContext } from 'react-hook-form'
import styles from '../styles.module.scss'

export default function Preview(props) {
    const formContext = useFormContext()

    const values = formContext.watch('menuItems')
    const top = formContext.watch('top')
    return (
        <div className={`${styles.container} ${styles.preview}`}>
            <div
                className={`${top ? styles.topNav : styles.bottomNav} ${
                    !top && styles.floatBottom
                }`}
            >
                {values.map((value) => {
                    if (value.title) {
                        return (
                            <div
                                key={value.title}
                                className={`${
                                    top
                                        ? styles.topNavItem
                                        : styles.bottomNavItem
                                }`}
                            >
                                <i className={`fa ${value.icon}`}></i>
                                <p>{value.title}</p>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}
