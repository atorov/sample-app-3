import React from 'react'
import { hot } from 'react-hot-loader'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import AppContent from '../AppContent'

import AppStateProvider from './AppStateProvider'

import './style.less'

const theme = createMuiTheme({
    // palette: {
    //     primary: {
    //         main: '#...',
    //     },
    //     secondary: {
    //         main: '#...',
    //     },
    //     error: {
    //         main: '#...',
    //     },
    // },
    typography: {
        useNextVariants: true,
    },
})

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <AppStateProvider>
                <AppContent />
            </AppStateProvider>
        </MuiThemeProvider>
    )
}

export default module.hot ? hot(module)(App) : App
