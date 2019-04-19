import makeRequest from './make-request'

export default async function (
    url = '',
    data = {},
    dispatch = () => { },
    state = {},
    cfg = {},
) {
    const { addBearer = false } = cfg

    return makeRequest(
        url,
        dispatch,
        state,
        {
            addBearer,
            data,
            method: 'POST',
        },
    )
}
