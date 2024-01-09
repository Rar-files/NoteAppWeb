import type { Config } from 'tailwindcss'
import { addDynamicIconSelectors } from '@iconify/tailwind'
import colors from 'tailwindcss/colors'

export const notePalette = {
    red: '#ffadad',
    yellow: '#fdffb6',
    green: '#c2e0d9',
    blue: '#c3e3f4',
    violet: '#dedaf4',
}

const theme = {
    primary: {
        light: '#FFB4A2',
        DEFAULT: '#E5989B',
        dark: '#B5838D',
    },
    block: {
        DEFAULT: '#FFD4BD',
        dark: '#6D6875',
    },
    bg: {
        DEFAULT: '#FFDFCE',
        dark: '#5D5864',
    },
    text: {
        DEFAULT: '#27252A',
        dark: '#FFEDE4',
    },
    comments: {
        DEFAULT: '#5D514F',
        dark: '#DBCCC8',
    },
    notes: notePalette,
    success: colors.green[600],
    warn: colors.amber[600],
    danger: colors.red[600],
    info: colors.sky[600],
}

const config: Config = {
    content: [
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: ['class'],
    theme: {
        colors: theme,
    },
    plugins: [
        // Iconify plugin
        addDynamicIconSelectors(),
    ],
}
export default config
