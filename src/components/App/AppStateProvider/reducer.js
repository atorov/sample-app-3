import initState from './init-state'

export default function (state, action) {
    switch (action.type) {
        // init
        case 'appState/INIT':
            return { ...initState }

        // ui
        case 'appState/ui/PATCH_LEFT_BAR':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    leftBar: {
                        ...state.ui.leftBar,
                        ...action.payload,
                    },
                },
            }

        case 'appState/ui/PATCH_TOP_BAR_L1':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    topBarL1: {
                        ...state.ui.topBarL1,
                        ...action.payload,
                    },
                },
            }

        // did not match
        default:
            console.warn('::: action.type:', action.type)
            throw new Error('Action type does not match!')
        // return state
    }
}
