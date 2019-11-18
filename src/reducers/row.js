import {socket} from '../components/home'

const data = (state = [], action) => {
    switch(action.type){
        case 'GET_ROW':
        return state = action.payload.data
        case 'ADD_ROW':
            if (action.payload.socket){
                socket.emit('Changing value in table',action.payload.dataRow[0].table_id)
            }
            return state = action.payload.dataRow
        case 'MODIFY_ROW':
            let newState = action.payload.data
            if(action.payload.socket){
                socket.emit('Changing value in table',action.payload.data[0].table_id)
            }
            return newState
        case 'DELETE_ROW':
                let array = []
                for (let i = 0; i < state.length; i++) {
                    if(state[i]._id === action.payload.id_item){
    
                    }else {
                        array.push(state[i])
                    }
                }
                if (action.payload.socket){
                    socket.emit('Changing value in table',action.payload.table_id)
                }
                return array
            case 'RESET_ROW':
                return state = []
            case 'RESET_TABLE_DATA':
                return []
        default:
            return state
    }
}

export default data