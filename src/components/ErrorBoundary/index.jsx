import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hasError: false,
        }
    }

    static getDerivedStateFromError(/* error */) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    async componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        console.error('::: Error:', error, info)
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div
                    style={{
                        width: '100%',
                        padding: '48px',
                        textAlign: 'center',
                        color: '#f00',
                    }}
                >
                    <big>
                        <strong>
                            <code>Something went wrong</code>
                        </strong>
                        <br />
                        <code>Please try again later or contact support</code>
                    </big>
                </div>
            )
        }

        return this.props.children
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.any.isRequired,
}

export default ErrorBoundary
