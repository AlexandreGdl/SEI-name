const profile = (state = [],action) => {
switch(action.type){
    case 'GET_PROFILE':
            let newState = action.payload.data
        return newState
    case 'CHANGE_PROFILE':
        let newProfile = []
        newProfile[0] = action.payload
        
            return newProfile
    default:
        return state
}
}

export default profile