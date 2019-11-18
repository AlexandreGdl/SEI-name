import {socket} from '../components/home'
const column = (state = [], action) => {
    switch(action.type){
        case 'GET_COLUMN':
            return state = action.payload.data
        case 'ADD_COLUMN':
            if(action.payload.socket){
                socket.emit('Changing Column',action.payload.dataColumn[0].table_id)
            }
            return state = action.payload.dataColumn
        case 'MODIFY_COLUMN':
            if (action.payload.socket){
            socket.emit('Changing Column',action.payload.data[0].table_id)
            }
            let newState = action.payload.data
            return newState
        case 'DELETE_COLUMN':
                let array = []
                for (let i = 0; i < state.length; i++) {
                    if(state[i]._id === action.payload.id_item){
    
                    }else {
                        array.push(state[i])
                    }
                }
                if (action.payload.socket){
                    socket.emit('Changing Column',action.payload.table_id)
                }
                return array
        case 'RESET_COLUMN':
                return state = []
        default:
            return state
    }
}

export default column