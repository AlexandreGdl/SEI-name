const chat = (state = [], action) => {
    let newState
    switch(action.type){
        case "NEW_MESSAGE":
            return [
                ...state,
                action.data
            ]
        default:
            return state
    }
}

export default chat