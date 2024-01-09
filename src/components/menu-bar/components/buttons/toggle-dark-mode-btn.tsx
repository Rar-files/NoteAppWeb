'use client'

import { useTheme } from 'next-themes'
import { FC } from 'react'
import MenuBtn from './menu-btn'

const ToggleDarkModeBtn: FC = () => {
    const { theme, setTheme } = useTheme()

    return (
        <MenuBtn onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? (
                <span className={'icon-[mdi--weather-sunny]'} />
            ) : (
                <span className={'icon-[mdi--weather-night]'} />
            )}
        </MenuBtn>
    )
}

export default ToggleDarkModeBtn
