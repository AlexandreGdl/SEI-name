import React, { Component } from "react";
import DisplayTable from './displayTable'

class Main extends Component {


    constructor(props){
        super(props)
        this.state = {
            token: props.token,
            data: props.data,
            table: props.table,
            column: props.column,
            column_id: props.column_id,
            user: props.user,
            userToShow: props.userToShow,
            socket: props.socket,
            chat: props.chat,
        }
    }

    componentWillReceiveProps(props){
        this.setState({chat: props.chat,token: props.token,table: props.table,data: props.data,column: props.column,column_id: props.column_id,user: props.user,userToShow: props.userToShow,socket: props.socket})
    }


    
    render(){
        const {token,table,data,column,column_id,user,userToShow,socket,chat} = this.state

        return(
            <div id="main" >
                {token ?
                <DisplayTable chat={chat} actions={this.props.actions} token={token} table={table} data={data} column={column} column_id={column_id} user={user} userToShow={userToShow} socket={socket}/>
                : 
                false
                //DIV WITH HELYX CORPORATION
                 }

            </div>
        )
    }

}

export default Main

