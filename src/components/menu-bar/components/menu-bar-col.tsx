'use client'

type props = {
    children?: React.ReactNode
    allign: 'LEFT' | 'CENTER' | 'RIGHT'
}

const MenuBarCol = ({ children, allign }: props) => {
    if (allign === 'LEFT')
        return (
            <div className={`flex flex-row justify-start items-center w-1/3 `}>
                {children}
            </div>
        )

    if (allign === 'CENTER')
        return (
            <div className={`flex flex-row justify-center items-center w-1/3 `}>
                {children}
            </div>
        )

    return (
        <div className={`flex flex-row justify-end items-center w-1/3 `}>
            {children}
        </div>
    )
}

export default MenuBarCol
