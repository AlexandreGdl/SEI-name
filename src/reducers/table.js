import {socket} from '../components/home'
const table = (state = [], action) => {
    switch(action.type){
        case 'GET_TABLE':
        return state = action.payload.data
        case 'MODIFY_TABLE':
            if(action.payload.socket){
                    socket.emit('Changing Table')
            }
            let arrayToChange = []
            action.payload.data.map( table =>arrayToChange.push(table[0]))
            console.log('hihihihihihi')
            return arrayToChange
        case 'ADD_TABLE':
            let arrayToAdd = action.payload.data
            return  arrayToAdd
        case 'DELETE_TABLE':
            if(action.payload.socket){
                socket.emit('Deleting Table')
            }
            let array = []
            for (let i = 0; i < state.length; i++) {
                if(state[i]._id === action.payload.id_item){

                }else {
                    array.push(state[i])
                }
            }
            
            return array
        case 'MANAGE_USER_ACCESS':
            return state
            case 'RESET_TABLE':
                return state = []
        case 'ADD_TABLE_ERROR':
        case 'ADD_TABLE_REQUEST':
        case 'GET_TABLE_ERROR':
        case 'GET_TABLE_REQUEST':
        default: 
            return state
    }
}

export default table