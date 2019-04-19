import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

// import { BrowserRouter } from 'react-router-dom'

import withStyles from '@material-ui/core/styles/withStyles'

import checkSignedIn from '../../lib/check-signed-in'

import { AppDispatchContext, AppStateContext } from '../App/AppStateProvider'
import { AuthStateContext } from '../App/AuthStateProvider'

// import LeftBar from '../LeftBar'
// import Routes from '../Routes'
import TopBar from '../TopBar'

// import useInitOnAuth from './use-init-on-auth'

function AppContent({ classes }) {
    //     useInitOnAuth()

    const appDispatch = useContext(AppDispatchContext)

    const {
        ui: {
            // patientBanner: {
            //     isVisible: isPatientBannerVisible,
            //     height: patientBannerHeight,
            // },
            topBar: {
                isVisible: isTopBarVisible,
                height: topBarHeight,
            },
        },
    } = useContext(AppStateContext)

    const authState = useContext(AuthStateContext)

    const isSignedIn = checkSignedIn(authState)

    useEffect(() => {
        appDispatch({
            type: 'appState/ui/PATCH_TOP_BAR',
            payload: { isVisible: isSignedIn },
        })
    }, [appDispatch, isSignedIn])

    const offsetTop = isTopBarVisible ? topBarHeight : 0

    return (
        // <BrowserRouter basename="/provider-portal">
        <div className={classes.root}>
            {isTopBarVisible ? <TopBar /> : null}
            {/* <LeftBar /> */}
            <main
                id="app-main"
                className={classes.content}
                style={{ marginTop: offsetTop }}
            >
                App Content
                {/* <Routes /> */}
            </main>
        </div>
        // </BrowserRouter>
    )
}

AppContent.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(theme => ({
    content: {
        flexGrow: 1,
        paddingTop: 0,
        paddingRight: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 8,
        paddingLeft: theme.spacing.unit * 3,
    },
    root: {
        display: 'flex',
    },
}), { withTheme: true })(AppContent)
