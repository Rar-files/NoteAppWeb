'use client'

import React, { FC } from 'react'

type props = {
    children: React.ReactNode
    onClick?: () => void
}

const MenuBtn: FC<props> = ({ children, onClick }: props) => {
    return (
        <button
            className={`h-10 w-10 m-0.5 rounded-md hover:scale-110 duration-200 bg-text-dark text-text dark:bg-text dark:text-text-dark`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default MenuBtn
