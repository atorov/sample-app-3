import React, { useEffect, useRef } from 'react'

import SampleWorker from '../../workers/sample.worker'

export default function () {
    const sampleWorker = useRef(null)

    useEffect(() => {
        sampleWorker.current = new SampleWorker()
        sampleWorker.current.addEventListener(
            'message',
            res => console.log('::: >>> Sample web worker:', res.data.message),
        )
        return () => {
            sampleWorker.current.terminate()
            sampleWorker.current = undefined
        }
    }, [])

    return (
        <div className="container">
            <h1>Sample worker demo</h1>

            <p><em>Open the browser console...</em></p>

            <button
                type="button"
                onClick={() => {
                    console.log('::: >>> Ping sent and now waiting...')
                    sampleWorker.current.postMessage({ message: 'Ping!' })
                }}
            >
                Sample Web Worker: Send a Ping!
            </button>
        </div>
    )
}
