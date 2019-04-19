import { useState, useEffect } from 'react'

import checkAllValid from './validation-check-all-valid'

export default function (initData = {}, initValidation = {}, validate) {
    const [data, setData] = useState(initData)
    const [validation, setValidation] = useState(initValidation)

    useEffect(() => {
        if (validate) {
            const valid = validate(data)
            const isValid = checkAllValid(valid)
            setValidation({
                data: valid,
                isValid,
            })
        }
    }, [data, validate])

    return [data, setData, validation]
}
