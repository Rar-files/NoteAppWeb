import Link from 'next/link'

const Logo = () => {
    return (
        <Link href={`/`}>
            <div
                className={`text-xl flex flex-row items-center text-text dark:text-text-dark`}
            >
                <span id="logo" className={`icon-[mdi--note-outline] m-1`} />
                <span>NoteApp</span>
            </div>
        </Link>
    )
}

export default Logo
