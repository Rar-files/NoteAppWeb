'use client'

import Link from 'next/link'
import React, { FC } from 'react'
import MenuBtn from './menu-btn'

type props = {
    href: string
    children: React.ReactNode
}

const LinkBtn: FC<props> = ({ children, href }: props) => {
    return (
        <Link href={href}>
            <MenuBtn>{children}</MenuBtn>
        </Link>
    )
}

export default LinkBtn
