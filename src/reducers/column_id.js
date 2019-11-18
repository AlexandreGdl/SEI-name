const column = (state = '', action) => {
    switch(action.type){
        case 'CHANGE_COLUMN_INPUT':
        let newState = action.column_id
            return newState
        case 'DEFAULT_COLUMN_INPUT':
        let defaultState = ''
            return defaultState
        default:
            return state
    }
}

export default column