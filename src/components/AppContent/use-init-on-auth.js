import { useContext, useEffect } from 'react'

import checkSignedIn from '../../lib/check-signed-in'

import { AppDispatchContext } from '../App/AppStateProvider'
import { AuthStateContext } from '../App/AuthStateProvider'

export default function () {
    const appDispatch = useContext(AppDispatchContext)

    const authState = useContext(AuthStateContext)

    const isSignedIn = checkSignedIn(authState)

    useEffect(() => {
        appDispatch({ type: 'appState/INIT' })
    }, [appDispatch, isSignedIn])
}
