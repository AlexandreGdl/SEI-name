import React , { Component } from 'react'
import SideBar from './sideBar'
import EditTable from './main'
import Connection from './connection'
import socketIOClient from 'socket.io-client'
export const socket = socketIOClient('http://localhost:4001');


class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            data: props.data,
        table: props.table,
        column: props.column,
        token: props.token,
        column_id: props.column_id,
        user: props.user,
        userToShow: props.userToShow,
        chat: props.chat
        }
    }


    componentWillReceiveProps(props){
        this.setState({data: props.data,
            table: props.table,
            column: props.column,
            token: props.token,
            column_id: props.column_id,
            user: props.user,
            userToShow: props.userToShow,
            chat: props.chat})
    }

    componentDidMount(){
        socket.on('New Value In Table',() => {
            this.props.actions.getRow(this.state.token,this.state.data[0].table_id)
        })

        socket.on('New Column Value',() => {
            this.props.actions.getColumn(this.state.token,this.state.data[0].table_id)
            this.props.actions.getRow(this.state.token,this.state.data[0].table_id)
        })

        socket.on('New Table Value', () => {
            this.props.actions.getTable(this.state.token)
        })
        
        socket.on('Table Deleted',() => {
            this.props.actions.getTable(this.state.token)
        })

        socket.on("Receive Message",(data) => {
            this.props.actions.receiveMessage(data)
        })
    }

    render(){
        const { data,
            table,
            column,
            token,
            column_id,
            user,
            userToShow,
            chat} = this.state

        return(
            <>
            {token !== '' ?
            <>
                <SideBar actions={this.props.actions} table={table} data={data} column={column} token={token} column_id={column_id} user={user} userToShow={userToShow} socket={socket}/>
                <EditTable chat={chat} actions={this.props.actions} table={table} data={data} column={column} token={token} column_id={column_id} user={user} userToShow={userToShow} socket={socket}/>
                </>
                 : 
                <Connection actions={this.props.actions}/>
                
                }
                
                

            </>
        )
    }

}

export default Home

