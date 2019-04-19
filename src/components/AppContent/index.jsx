import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

// import { BrowserRouter } from 'react-router-dom'

import withStyles from '@material-ui/core/styles/withStyles'

// import checkSignedIn from '../../../lib/check-signed-in'

// import { AppDispatchContext, AppStateContext } from '../App/AppStateProvider'
// import { AuthStateContext } from '../App/AuthStateProvider'
// import { PatientStateContext } from '../App/PatientStateProvider'

// import LeftBar from '../LeftBar'
// import PatientBanner from '../PatientBanner'
// import Routes from '../Routes'
// import TopBarL1 from '../TopBarL1'

// import useInitOnAuth from './use-init-on-auth'

function AppContent({ classes }) {
    //     useInitOnAuth()

    //     const appDispatch = useContext(AppDispatchContext)

    //     const {
    //         ui: {
    //             patientBanner: {
    //                 isVisible: isPatientBannerVisible,
    //                 height: patientBannerHeight,
    //             },
    //             topBarL1: {
    //                 isVisible: isTopBarL1Visible,
    //                 publicHeight: topBarL1_PublicHeight,
    //                 privateHeight: topBarL1_PrivateHeight,
    //             },
    //         },
    //     } = useContext(AppStateContext)

    //     const authState = useContext(AuthStateContext)

    //     const { selected: { status: selectedPatientStatus } } = useContext(PatientStateContext)

    //     const isSignedIn = checkSignedIn(authState)

    //     useEffect(() => {
    //         appDispatch({
    //             type: 'appState/ui/PATCH_PATIENT_BANNER',
    //             payload: { isVisible: selectedPatientStatus === ':READY:' },
    //         })
    //     }, [appDispatch, selectedPatientStatus])

    //     let offsetTop = 0
    //     if (isTopBarL1Visible) {
    //         if (isSignedIn) {
    //             offsetTop += topBarL1_PrivateHeight
    //         }
    //         else {
    //             offsetTop += topBarL1_PublicHeight
    //         }
    //     }
    //     if (isPatientBannerVisible) {
    //         offsetTop += patientBannerHeight
    //     }

    return (
        // <BrowserRouter basename="/provider-portal">
        <div className={classes.root}>
            {/* <TopBarL1 /> */}
            {/* <PatientBanner /> */}
            {/* <LeftBar /> */}
            <main
                id="app-main"
                className={classes.content}
            // style={{ marginTop: offsetTop }}
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
