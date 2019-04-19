import gdv from '../gdv'

function _parseJSON(response) {
    // return response.json()
    return JSON.parse('{"accessToken":"access_token"}') // TODO:
}

async function _checkStatus(response, dispatch) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }

    if (response.status === 401) {
        dispatch({ type: 'authState/RESET' })
    }

    const error = new Error(response.statusText)
    error.response = await _parseJSON(response)
    throw error
}

export default async function (
    url = '',
    dispatch = () => { },
    state = {},
    cfg = {},
) {
    const {
        addBearer = false,
        data,
        method = 'GET',
        mode = 'cors', // no-cors, cors, *same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        // headers = {},
        // redirect: 'follow', // manual, *follow, error
        // referrer: 'no-referrer', // no-referrer, *client
    } = cfg

    let accessToken = gdv(state, 'access_token')
    accessToken = addBearer ? `Bearer ${accessToken}` : accessToken
    console.log('>>>', accessToken) // TODO:

    // const headers = // TODO:
    // const response = await fetch(url, {
    //     method,
    //     mode,
    //     headers: {
    //         // 'Access-Control-Allow-Origin': '*',
    //         // 'Access-Control-Allow-Methods': 'GET',
    //         // 'Access-Control-Allow-Headers': 'authorization',
    //         Authorization: accessToken || '',
    //         'Content-Type': 'application/json',
    //     },
    //     body: data ? JSON.stringify(data) : undefined,
    // })
    const response = { status: 200 } // TODO:

    await _checkStatus(response, dispatch)

    return _parseJSON(response)
}
