import initState from './init-state'

export default function (state, action) {
    switch (action.type) {
        // init
        // case 'appState/INIT':
        //     return { ...initState }

        // ui
        // case 'appState/ui/PATCH_LEFT_BAR':
        //     return {
        //         ...state,
        //         ui: {
        //             ...state.ui,
        //             leftBar: {
        //                 ...state.ui.leftBar,
        //                 ...action.payload,
        //             },
        //         },
        //     }

        case 'appState/ui/PATCH_TOP_BAR':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    topBar: {
                        ...state.ui.topBar,
                        ...action.payload,
                    },
                },
            }

        case 'appState/ui/TOGGLE_LEFT_BAR':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    leftBar: {
                        ...state.ui.leftBar,
                        isExpanded: !state.ui.leftBar.isExpanded,
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
