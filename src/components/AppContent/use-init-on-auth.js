import { useContext, useEffect } from 'react'

import checkSignedIn from '../../../lib/check-signed-in'

import { AppDispatchContext } from '../App/AppStateProvider'
import { AppsDispatchContext } from '../App/AppsStateProvider'
import { AuthStateContext } from '../App/AuthStateProvider'
import { PatientDispatchContext } from '../App/PatientStateProvider'

export default function () {
    const appDispatch = useContext(AppDispatchContext)

    const appsDispatch = useContext(AppsDispatchContext)

    const authState = useContext(AuthStateContext)

    const patientDispatch = useContext(PatientDispatchContext)

    const isSignedIn = checkSignedIn(authState)

    useEffect(() => {
        if (isSignedIn) {
            appDispatch({ type: 'appState/INIT' })
            appsDispatch({ type: 'appsState/INIT' })
            patientDispatch({ type: 'patientState/INIT' })
        }
    }, [appDispatch, appsDispatch, isSignedIn, patientDispatch])
}
