import { RSAA } from 'redux-api-middleware'

// ROW
export const GET_ROW = 'GET_ROW'
export const GET_ROW_REQUEST = 'GET_ROW_REQUEST'
export const GET_ROW_ERROR = 'GET_ROW_ERROR'

export const MODIFY_ROW_REQUEST = 'MODIFY_ROW_REQUEST'
export const MODIFY_ROW = 'MODIFY_ROW'
export const MODIFY_ROW_ERROR = 'MODIFY_ROW_ERROR'

export const ADD_ROW_REQUEST = 'ADD_ROW_REQUEST'
export const ADD_ROW = 'ADD_ROW'
export const ADD_ROW_ERROR = 'ADD_ROW_ERROR'

export const DELETE_ROW_REQUEST = 'DELETE_ROW_REQUEST'
export const DELETE_ROW = 'DELETE_ROW'
export const DELETE_ROW_ERROR = 'DELETE_ROW_ERROR'

// TABLE
export const MODIFY_TABLE = 'MODIFY_TABLE'
export const MODIFY_TABLE_REQUEST = 'MODIFY_TABLE_REQUEST'
export const MODIFY_TABLE_ERROR = 'MODIFY_TABLE_ERROR'

export const ADD_TABLE = 'ADD_TABLE'
export const ADD_TABLE_REQUEST = 'ADD_TABLE_REQUEST'
export const ADD_TABLE_ERROR = 'ADD_TABLE_ERROR'

export const DELETE_TABLE_REQUEST = 'DELETE_TABLE_REQUEST'
export const DELETE_TABLE = 'DELETE_TABLE'
export const DELETE_TABLE_ERROR = 'DELETE_TABLE_ERROR'

export const GET_TABLE = 'GET_TABLE'
export const GET_TABLE_ERROR = 'GET_TABLE_ERROR'
export const GET_TABLE_REQUEST = 'GET_TABLE_REQUEST'

export const MANAGE_USER_ACCESS = 'MANAGE_USER_ACCESS'

// COLUMN
export const GET_COLUMN = 'GET_COLUMN'
export const GET_COLUMN_REQUEST = 'GET_COLUMN_REQUEST'
export const GET_COLUMN_ERROR = 'GET_COLUMN_ERROR'

export const MODIFY_COLUMN_REQUEST = 'MODIFY_COLUMN_REQUEST'
export const MODIFY_COLUMN = 'MODIFY_COLUMN'
export const MODIFY_COLUMN_ERROR = 'MODIFY_COLUMN_ERROR'

export const ADD_COLUMN_REQUEST = 'ADD_COLUMN_REQUEST'
export const ADD_COLUMN = 'ADD_COLUMN'
export const ADD_COLUMN_ERROR = 'ADD_COLUMN_ERROR'

export const DELETE_COLUMN_REQUEST = 'DELETE_COLUMN_REQUEST'
export const DELETE_COLUMN = 'DELETE_COLUMN'
export const DELETE_COLUMN_ERROR = 'DELETE_COLUMN_ERROR'

export const LOGIN_SUCCESS = 'ADD_TOKEN'
export const LOGIN_REQUEST = 'REQUEST'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const DISCONNECT = 'REMOVE_TOKEN'

export const CHANGE_COLUMN_INPUT = 'CHANGE_COLUMN_INPUT'
export const DEFAULT_COLUMN_INPUT = 'DEFAULT_COLUMN_INPUT'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER = 'GET_USER'
export const GET_USER_ERROR = 'GET_USER_ERROR'

export const RESET_ROW = 'RESET_ROW'
export const RESET_COLUMN = 'RESET_COLUMN'
export const RESET_TABLE = 'RESET_TABLE'
export const RESET_USER = 'RESET_USER'


// ROW
export const getRow = (token, table_id) => ({
    [RSAA] : {
        endpoint: `http://localhost:3001/rows/find/table_id/${table_id}`,
        method: 'POST',
        headers: {'Content-Type': 'application/json',jwt: token},
        body: JSON.stringify({table_id}),
        types:[
            GET_ROW_REQUEST,
            GET_ROW,
            GET_ROW_ERROR
        ]
    }
})
export const modifyRow = (token,table_id,row_id,row_value, column_id,socket) => {
    let query = {}
    query[column_id] = row_value
    return {[RSAA] : {
        endpoint: `http://localhost:3001/rows/edit/${row_id}`,
        method: 'POST',
        headers: {'Content-Type': 'application/json',jwt: token},
        body: JSON.stringify({data: query,table_id,socket}),
        types:[
            MODIFY_ROW_REQUEST,
            MODIFY_ROW,
            MODIFY_ROW_ERROR
        ]
    }}
};

export const addRow = (token,table_id,column,exempleRow,socket) => ({
    [RSAA] : {
        endpoint: `http://localhost:3001/rows/create/`,
        method: 'PUT',
        headers: {'Content-Type': 'application/json',jwt: token},
        body: JSON.stringify({table_id,column,exempleRow,socket}),
        types:[
            ADD_ROW_REQUEST,
            ADD_ROW,
            ADD_ROW_ERROR
        ]
    }
})

export const deleteRow = (token,table_id,row_id,socket) => ({
    [RSAA]:{
        endpoint: `http://localhost:3001/rows/delete/${row_id}`,
        method: 'DELETE',
        headers: {'Content-Type': 'application/json',jwt: token},
        body: JSON.stringify({table_id,socket}),
        types: [
            DELETE_ROW_REQUEST,
            DELETE_ROW,
            DELETE_ROW_ERROR
        ]
    }
})

// TABLE
export const getTable = (token) => ({
    [RSAA]:{
        endpoint:`http://localhost:3001/userRights/`,
        method: 'POST',
        headers:{'Content-Type': 'application/json',jwt: token},
        body: JSON.stringify({userID: localStorage.getItem('userID')}),
        types:[
            GET_TABLE_REQUEST,
            GET_TABLE,
            GET_TABLE_ERROR
        ]
    }
})

export const modifyTable = (token,name,table_id,socket) => ({
    [RSAA]:{
        endpoint: `http://localhost:3001/tables/edit/${table_id}/`,
        method: 'POST',
        headers: {'Content-Type': 'application/json',jwt: token},
        body: JSON.stringify({userID: localStorage.getItem('userID'),name,table_id,socket}),
        types: [
            MODIFY_TABLE_REQUEST,
            MODIFY_TABLE,
            MODIFY_TABLE_ERROR
        ]
    }
    
})
export const addTable = (token,name,socket) => ({
    [RSAA]:{
        endpoint:`http://localhost:3001/tables/create/`,
        method: 'PUT',
        headers:{'Content-Type': 'application/json',jwt: token},
        body: JSON.stringify({userID: localStorage.getItem('userID'),name,socket}),
        types:[
            ADD_TABLE_REQUEST,
            ADD_TABLE,
            ADD_TABLE_ERROR
        ]
    }
})
export const deleteTable = (token,table_id,socket) => ({
    [RSAA]: {
        endpoint: `http://localhost:3001/tables/delete/${table_id}`,
        method: 'DELETE',
        headers: {'Content-Type': 'application/json',jwt: token},
        body: JSON.stringify({table_id,socket}),
        types: [
            DELETE_TABLE_REQUEST,
            DELETE_TABLE,
            DELETE_TABLE_ERROR
        ]
    }
})

export const changeDesc = (token,table_id,description,socket) => ({
    [RSAA]:{
        endpoint: `http://localhost:3001/tables/edit/${table_id}/`,
        method: 'POST',
        headers: {'Content-Type': 'application/json',jwt: token},
        body: JSON.stringify({userID: localStorage.getItem('userID'),table_id,description,socket}),
        types: [
            MODIFY_TABLE_REQUEST,
            MODIFY_TABLE,
            MODIFY_TABLE_ERROR
        ]
    }
})

export const manageUserAccess = (id_user,lvl,table_id) => ({
    type: MANAGE_USER_ACCESS,
    id_user,
    lvl,
    table_id
})

// COLUMN
export const getColumn = (token,table_id) => {
    return {[RSAA]:
        {
            endpoint: `http://localhost:3001/columns/find/table_id/${table_id}`,
            method: 'POST',
            headers: {'Content-Type': 'application/json',jwt: token},
            body: JSON.stringify({table_id}),
            types:[
                GET_COLUMN_REQUEST,
                GET_COLUMN,
                GET_COLUMN_ERROR
            ]
        }
    }
}
export const modifyColumn = (token,table_id,colName,column_id,socket) => ({
    [RSAA]:{
        endpoint: `http://localhost:3001/columns/edit/${column_id}/`,
        method: 'POST',
        headers:{'Content-Type': 'application/json',jwt: token},
        body: JSON.stringify({table_id,colName,socket}),
        types:[
            MODIFY_COLUMN_REQUEST,
            MODIFY_COLUMN,
            MODIFY_COLUMN_ERROR
        ]
    }
})
export const addColumn = (token,table_id,colName,socket) => ({
    [RSAA] : {
        endpoint: "http://localhost:3001/columns/create/",
        method: "PUT",
        headers: {'Content-Type': 'application/json',jwt: token},
        body: JSON.stringify({table_id,colName,socket}),
        types:[
            ADD_COLUMN_REQUEST,
            ADD_COLUMN,
            ADD_COLUMN_ERROR
        ]
    }
})
export const deleteColumn = (token,column_id,table_id,socket) => ({
    [RSAA]: {
        endpoint: `http://localhost:3001/columns/delete/${column_id}`,
        method: 'DELETE',
        headers: {'Content-Type': 'application/json',jwt: token},
        body: JSON.stringify({column_id,table_id,socket}),
        types: [
            DELETE_COLUMN_REQUEST,
            DELETE_COLUMN,
            DELETE_COLUMN_ERROR
        ]
    }
})

export const changeColumnInput = (column_id) => ({
    type: CHANGE_COLUMN_INPUT,
    column_id
})

export const defaultColumnInput = () => ({
    type: DEFAULT_COLUMN_INPUT
})

// LOGIN
export const login = (email,password) => ({[RSAA]: {
    endpoint: 'http://localhost:3001/auth/',
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({email,password}),
    types: [
      LOGIN_REQUEST,
      LOGIN_SUCCESS,
      LOGIN_ERROR
    ]
  }})

export const logout = () => ({
    type: DISCONNECT
})

export const getUser = (token,table_id) => ({
        [RSAA] : {
            endpoint: `http://localhost:3001/userRights/find/table_id/${table_id}/`,
            method: 'POST',
            headers: {'Content-Type': 'application/json',jwt: token},
            body: JSON.stringify({table_id}),
            types:[
                GET_USER_REQUEST,
                GET_USER,
                GET_USER_ERROR
            ]
        }
})


export const FIND_USER_REQUEST = 'FIND_USER_REQUEST'
export const FIND_USER = 'FIND_USER'
export const FIND_USER_ERROR = 'FIND_USER_ERROR'

export const findUser = (username) => ({
    [RSAA]: {
        endpoint: `http://localhost:3001/users/${username}/`,
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        types:[
            FIND_USER_REQUEST,
            FIND_USER,
            FIND_USER_ERROR
        ]
    }
})



export const resetRow = () => {
    return {type: RESET_ROW}
}
export const resetColumn = () => {
    return {type: RESET_COLUMN}
}
export const resetTable = () => {
    return {type: RESET_TABLE}
}
export const resetUser = () => {
    return {type: RESET_USER}
}

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST'
export const ADD_USER = 'ADD_USER'
export const ADD_USER_ERROR = 'ADD_USER_ERROR'

export const addUser = (token,table_id,data) =>  ({
    [RSAA] : {
        endpoint: `http://localhost:3001/userRights/edit/${table_id}/`,
        method: 'POST',
        headers: {'Content-Type': 'application/json',jwt: token},
        body: JSON.stringify({table_id,data}),
        types:[
            ADD_USER_REQUEST,
            ADD_USER,
            ADD_USER_ERROR
        ]
    }
})

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST'
export const GET_PROFILE = 'GET_PROFILE'
export const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR'

export const getProfile = (profile_id) => ({
    [RSAA]:{
        endpoint:`http://localhost:3001/users/profile/${profile_id}`,
        method: 'GET',
        headers:{'Content-Type': 'application/json'},
        types:[
            GET_PROFILE_REQUEST,
            GET_PROFILE,
            GET_PROFILE_ERROR
        ]
    }
})


export const changeName = (token,profile_id,username) => ({
    [RSAA]:{
        endpoint: `http://localhost:3001/users/changeName/${profile_id}`,
        method: 'POST',
        headers: {'Content-Type': 'application/json',jwt: token},
        body:JSON.stringify({username}),
        types:[
            CHANGE_PROFILE_REQUEST,
            CHANGE_PROFILE,
            CHANGE_PROFILE_ERROR
        ]
    }

})

export const changePassword = (token,profile_id,newPassword) => ({
    [RSAA]:{
        endpoint: `http://localhost:3001/users/changePassword/${profile_id}`,
        method: 'POST',
        headers: {'Content-Type': 'application/json',jwt: token},
        body:JSON.stringify({newPassword}),
        types:[
            CHANGE_PROFILE_REQUEST,
            CHANGE_PROFILE,
            CHANGE_PROFILE_ERROR
        ]
    }

})

export const changeEmail = (token,profile_id,email) => ({
    [RSAA]:{
        endpoint: `http://localhost:3001/users/changeEmail/${profile_id}`,
        method: 'POST',
        headers: {'Content-Type': 'application/json',jwt: token},
        body:JSON.stringify({email}),
        types:[
            CHANGE_PROFILE_REQUEST,
            CHANGE_PROFILE,
            CHANGE_PROFILE_ERROR
        ]
    }

})

export const CHANGE_PROFILE_REQUEST = 'CHANGE_PROFILE_REQUEST'
export const CHANGE_PROFILE = 'CHANGE_PROFILE'
export const CHANGE_PROFILE_ERROR = 'CHANGE_PROFILE_ERROR'

export const REMOVE_USER_REQUEST = 'REMOVE_USER_REQUEST'
export const REMOVE_USER = 'REMOVE_USER'
export const REMOVE_USER_ERROR = 'REMOVE_USER_ERROR'

export const deleteUser = (token,table_id,user_id) => ({
    [RSAA] : {
        endpoint: `http://localhost:3001/userRights/edit/${table_id}/`,
        method: 'POST',
        headers: {'Content-Type': 'application/json',jwt: token},
        body: JSON.stringify({table_id,user_id,delete: true}),
        types:[
            REMOVE_USER_REQUEST,
            REMOVE_USER,
            REMOVE_USER_ERROR
        ]
    }
})

export const changeColumnGroupBy = (id_column,table_id,token) => ({
    [RSAA]:{
        endpoint: `http://localhost:3001/tables/edit/${table_id}/`,
        method: 'POST',
        headers: {'Content-Type': 'application/json',jwt: token},
        body: JSON.stringify({userID: localStorage.getItem('userID'),column_groupe_by: id_column,table_id}),
        types: [
            MODIFY_TABLE_REQUEST,
            MODIFY_TABLE,
            MODIFY_TABLE_ERROR
        ]
    }
})


export const receiveMessage = (data) => ({
        type: "NEW_MESSAGE", 
        data
})

export const resetTableData = () => ({
    type: 'RESET_TABLE_DATA',
})