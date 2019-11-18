const user = (state = [],action) => {
    switch(action.type){
        case 'FIND_USER':
            let newState = []
            newState = action.payload.data
            return newState
            case 'RESET_FIND_USER':
                return state = []
        default: 
            return state
    }
}

export default user