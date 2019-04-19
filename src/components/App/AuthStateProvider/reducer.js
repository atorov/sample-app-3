import initState from './init-state'

export default function (state, action) {
    switch (action.type) {
        case 'authState/RESET':
            return { ...initState }

        case 'authState/SET':
            return {
                ...state,
                ...action.payload,
            }

        // did not match
        default:
            console.warn('::: action.type:', action.type)
            throw new Error('Action type does not match!')
        // return state
    }
}
