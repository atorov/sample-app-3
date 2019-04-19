import { useEffect, useState, useRef } from 'react'

import postData from './post-data'

const requestURL = '/login-portal'

export default function (
    dispatch = () => { },
    state = {},
) {
    const isMounted = useRef(false)

    const [status, setStatus] = useState(':INIT:')
    const [error, setError] = useState(null)

    useEffect(() => {
        isMounted.current = true
        return () => {
            isMounted.current = false
        }
    }, [])

    async function goSignIn(signInData) {
        setStatus(':PENDING:')

        try {
            const response = await postData(requestURL, signInData, dispatch, state)

            if (isMounted.current) {
                setStatus(':READY:')
                dispatch({
                    type: 'authState/SET',
                    payload: response,
                })
            }
        }
        catch (reason) {
            console.error('::: reason:', reason)
            if (isMounted.current) {
                setStatus(':ERROR:')
                setError(reason)
            }
        }
    }

    return [
        status,
        setStatus,
        error,
        setError,
        goSignIn,
    ]
}
