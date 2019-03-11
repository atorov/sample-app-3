import React, { /* StrictMode, */ } from 'react'
import { render } from 'react-dom'

import $ from 'jquery'

import App from './components/App'

setTimeout(() => {
    const appRootElement = document.querySelector('#app-root')
    const buildDate = appRootElement.dataset.buildDate

    function $remove() {
        setTimeout(() => $(this).remove(), 5550)
    }

    $('#init-loader-wrapper')
        .css('pointer-events', 'none')
        .fadeTo(1550, 0, $remove)

    console.log('::: ::: :::')
    console.log('::: process.env.NODE_ENV (NODE_ENV):', process.env.NODE_ENV)
    console.log('::: process.env.BABEL_ENV:', process.env.BABEL_ENV)
    console.log('::: module.hot:', !!module.hot)
    console.log('::: APP_NAME:', APP_NAME)
    console.log('::: APP_VERSION:', APP_VERSION)
    console.log('::: TARGET:', TARGET)
    console.log('::: Build Date:', buildDate)
    console.log('::: ::: :::')

    render(
        // <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>,
        // </StrictMode>,
        document.querySelector('#app-root'),
    )
}, 250) // TODO:

export default null
