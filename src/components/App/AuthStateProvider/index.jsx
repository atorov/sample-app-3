import React, {
    createContext,
    useEffect,
    useReducer,
} from 'react'
import PropTypes from 'prop-types'

import getInitState from './get-init-state'
import reducer from './reducer'
import saveState from './save-state'

const initState = getInitState()

export const AuthDispatchContext = createContext(() => { })
export const AuthStateContext = createContext(initState)

function AuthStateProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initState)

    useEffect(() => {
        saveState(state)
    }, [state])

    return (
        <AuthDispatchContext.Provider value={dispatch}>
            <AuthStateContext.Provider value={state}>
                {children}
            </AuthStateContext.Provider>
        </AuthDispatchContext.Provider>
    )
}

AuthStateProvider.propTypes = {
    children: PropTypes.any.isRequired,
}

export default AuthStateProvider
