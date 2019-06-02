import React from 'react'
import { hot } from 'react-hot-loader'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import AppContent from '../AppContent'

import AppStateProvider from './AppStateProvider'
import AuthStateProvider from './AuthStateProvider'

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
})

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <AppStateProvider>
                <AuthStateProvider>
                    <AppContent />
                </AuthStateProvider>
            </AppStateProvider>
        </MuiThemeProvider>
    )
}

export default module.hot ? hot(module)(App) : App
