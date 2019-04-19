import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { Redirect, Route } from 'react-router-dom'

import checkSignedInIn from '../../../lib/check-signed-in'

import { AuthStateContext } from '../../App/AuthStateProvider'

function RenderPropWrapper(ownProps) {
    const authState = useContext(AuthStateContext)

    return (renderProps) => {
        const combinedProps = { ...renderProps, ...ownProps }
        const { PrivateComponent, ...rest } = combinedProps

        const isSignedIn = checkSignedInIn(authState)

        if (isSignedIn) {
            return <PrivateComponent {...rest} />
        }

        return (
            <Redirect
                to={{
                    pathname: '/sign-in',
                    search: combinedProps.location.search,
                    state: { from: combinedProps.location },
                }}
            />
        )
    }
}

const PrivateRoute = props => (
    <Route
        {...props}
        render={RenderPropWrapper(props)}
    />
)


PrivateRoute.propTypes = {
    PrivateComponent: PropTypes.any.isRequired,

    location: PropTypes.object,
}

PrivateRoute.defaultProps = {
    location: {},
}

export default PrivateRoute
