import React, {
    lazy,
    Suspense,
    useEffect,
    useRef,
} from 'react'
import PropTypes from 'prop-types'

import {
    Redirect,
    Route,
    Switch,
    withRouter,
} from 'react-router-dom'

import ErrorBoundary from '../ErrorBoundary'

import Fallback from './Fallback'
import NotFound from '../NotFound'
import PrivateRoute from './PrivateRoute'

const CHome = lazy(() => import('../Home'))
const CPage1 = lazy(() => import('../Page1'))
const CPage11 = lazy(() => import('../Page11'))
const CPage12 = lazy(() => import('../Page12'))
const CPage2 = lazy(() => import('../Page2'))
const CSignIn = lazy(() => import('../SignIn'))
const CWorker = lazy(() => import('../Worker'))

function Routes({ history }) {
    const unlisten = useRef()
    useEffect(() => {
        unlisten.current = history.listen(() => window.scrollTo(0, 0))
        return () => unlisten.current()
    }, [history])

    return (
        <ErrorBoundary>
            <Suspense fallback={<Fallback />}>
                <Switch>
                    <Route
                        path="/not-found"
                        exact
                        component={NotFound}
                    />

                    <Route
                        path="/sign-in"
                        exact
                        component={CSignIn}
                    />

                    <Redirect
                        path="/home"
                        exact
                        to="/"
                    />
                    <PrivateRoute
                        path="/"
                        exact
                        PrivateComponent={CHome}
                    />

                    <PrivateRoute
                        path="/page1"
                        exact
                        PrivateComponent={CPage1}
                    />
                    <PrivateRoute
                        path="/page1/page11"
                        exact
                        PrivateComponent={CPage11}
                    />
                    <PrivateRoute
                        path="/page1/page12"
                        exact
                        PrivateComponent={CPage12}
                    />

                    <PrivateRoute
                        path="/page2"
                        exact
                        PrivateComponent={CPage2}
                    />

                    <PrivateRoute
                        path="/worker"
                        exact
                        PrivateComponent={CWorker}
                    />

                    <Redirect to="/not-found" />
                </Switch>
            </Suspense>
        </ErrorBoundary>
    )
}

Routes.propTypes = {
    history: PropTypes.object.isRequired,
}

export default withRouter(Routes)
