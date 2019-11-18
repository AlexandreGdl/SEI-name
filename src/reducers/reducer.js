import { combineReducers } from 'redux'
import data from './row'
import table from './table'
import column from './column'
import token from './token'
import column_id from './column_id'
import user from './user'
import userToShow from './userToShow'
import profile from './profile'
import chat from './chat'

export default combineReducers({
    data,
    table,
    column,
    token,
    column_id,
    user,
    userToShow,
    profile,
    chat
})

// Structure de donnée dans store : 
// data: Contient les rows || Actions possible -> MODIFY_ROW, ADD_ROW
// table: Contient l'ID et le nom de la table || Actions possible -> MODIFY_TABLE, ADD_TABLE, DELETE_TABLE, MANAGE_USER_ACCESS (only if admin)
// column: Contient les colonnees de la table || Actions possible -> MODIFY_COLONNE, ADD_COLONNE, DELETE_COLONNE

