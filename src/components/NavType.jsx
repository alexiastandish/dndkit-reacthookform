import React from 'react'
import Switch from '@mui/material/Switch'
import { Controller } from 'react-hook-form'
import Box from '@mui/material/Box'

export default function NavType({ control, setValue }) {
    return (
        <>
            <Controller
                control={control}
                name="top"
                render={({ field }) => {
                    return (
                        <>
                            <Box sx={{ typography: 'body1' }}>
                                Type: {field.value ? 'Top' : 'Bottom'}
                            </Box>
                            <Switch
                                checked={field.value}
                                onChange={(e) => {
                                    setValue('top', e.target.checked, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                        shouldTouch: true,
                                    })
                                }}
                            />
                        </>
                    )
                }}
            />
        </>
    )
}
