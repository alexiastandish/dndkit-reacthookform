import React, { useEffect, useState, useRef } from 'react'
import Popper from '@mui/material/Popper'

const useClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return
            }
            handler(event)
        }

        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)

        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [ref, handler])
}

export default function EditContainer({
    children,
    button,
    setClose,
    closeOnClick,
}) {
    const [anchorEl, setAnchorEl] = useState(null)

    useEffect(() => {
        if (closeOnClick) {
            setAnchorEl(null)
            setClose(false)
        }
    }, [closeOnClick])

    const handleClick = (event) => {
        if (!anchorEl) {
            setAnchorEl(event.currentTarget)
        }
    }
    const ref = useRef()
    const popperRef = useRef()

    const open = Boolean(anchorEl)

    const id = open ? 'simple-popper' : undefined

    useClickOutside(ref, (e) => {
        if (e.target.id === 'popper-button') {
            return
        }
        return setAnchorEl(null)
    })

    return (
        <div>
            <button
                aria-describedby={id}
                id="popper-button"
                type="button"
                onClick={handleClick}
            >
                {button}
            </button>
            <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                popperRef={popperRef}
                placement="right-start"
            >
                <div ref={ref}>{children}</div>
            </Popper>
        </div>
    )
}
