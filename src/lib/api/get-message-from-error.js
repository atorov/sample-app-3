import gdv from '../gdv'

const DEFAULT_MESSAGE = 'Something went wrong. Please try again later or contact support.'

export default function (error, defaultMessage = DEFAULT_MESSAGE) {
    if (!error || defaultMessage === false) {
        return ''
    }

    if (defaultMessage === true) {
        return DEFAULT_MESSAGE
    }

    return gdv(error, 'response.message')
        || gdv(error, 'response.error')
        || defaultMessage
}
