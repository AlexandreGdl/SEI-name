import swal from 'sweetalert2'

const token = (state = '',action) => {
    switch(action.type){
        case 'ADD_TOKEN':
        localStorage.setItem('token',action.payload.token)
        localStorage.setItem('username',action.payload.username)
        localStorage.setItem('userID',action.payload.userID)
        let newState = action.payload.jwt
        return newState
        case 'LOGIN_ERROR':
        swal.fire({type:'error',title: 'error',text:'wrong password or email',confirmButtonText: 'Ok !'})
        return state
        case 'REMOVE_TOKEN':
        return state = ''
        default:
        return state
    }
}

export default token