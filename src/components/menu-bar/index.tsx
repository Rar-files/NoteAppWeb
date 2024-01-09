'use client'

import { FC } from 'react'

import ToggleDarkModeBtn from './components/buttons/toggle-dark-mode-btn'
import MenuBarCol from './components/menu-bar-col'
import Logo from '@/components/menu-bar/components/logo'

const MenuBar: FC = () => {
    return (
        <div className={`h-14 w-full`}>
            <div
                className={`fixed h-14 w-full p-2 flex flex-row bg-block dark:bg-block-dark justify-between shadow-xl`}
            >
                <MenuBarCol allign={'LEFT'}>
                    <Logo />
                </MenuBarCol>
                <MenuBarCol allign={'CENTER'}></MenuBarCol>
                <MenuBarCol allign={'RIGHT'}>
                    <ToggleDarkModeBtn />
                </MenuBarCol>
            </div>
        </div>
    )
}

export default MenuBar
