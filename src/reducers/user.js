const user = (state = [],action) => {
    switch(action.type){
        case 'GET_USER_REQUEST':
            return state
        case 'ADD_USER':
                let newState2 = []
                newState2 = action.payload.data
                return newState2
        case 'GET_USER':
            let newState = []
            newState = action.payload.data
            return newState
            case 'GET_USER_ERROR':
                    console.log('ERROR')
                    return state
            case 'RESET_USER':
                return state = []
            case 'ADD_USER_REQUEST':
                console.log('request')
                return state
            case 'ADD_USER_ERROR':
                console.log('ERROR')
                return state
            case 'REMOVE_USER':
                let removedUser = action.payload.data
                console.log(action.payload)
                return removedUser
            case 'REMOVE_USER_REQUEST':
                console.log('request user')
                return state
        default: 
            return state
    }
}

export default user