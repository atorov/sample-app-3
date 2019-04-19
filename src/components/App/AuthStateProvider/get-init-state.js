import $ from 'jquery'

import initState from './init-state'
import loadState from './load-state'

export default function () {
    const savedState = loadState()

    return $.extend(true, {}, initState, savedState)
}
