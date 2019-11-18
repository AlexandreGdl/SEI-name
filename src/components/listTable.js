import React, { Component } from "react";
import jwt from 'jsonwebtoken'
import { Link } from "react-router-dom"

class ListTable extends Component {

    constructor(props){
        super(props)
        this.state = {
            table: props.table,
            data: props.data,
            token: props.token,
            tableName: '',
            toggleInput: false,
            changeName: false,
            newTableName: '',
            isLoading: false,
            user: props.user,
            socket: props.socket
        }
    }

    componentWillMount(){
        if (!this.props.table[0]) {
            this.props.actions.getTable(this.props.token)
        }
            this.state.socket.on('New Value In Table',() => {
                console.log('new Value in table')
                this.props.actions.getRow(this.state.token,this.state.data[0].table_id)
                console.log('Getting newData')
            })
    }

    componentWillReceiveProps(props){
        this.setState({table: props.table,data: props.data,token: props.token,isLoading: false,user: props.user})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.tableName !== ''){
            this.props.actions.addTable(this.props.token,this.state.tableName)
        }
        this.setState({tableName: '',toggleInput: false, isLoading:true})
        this.forceUpdate()
    }

    handleSubmitName = (e) => {
        e.preventDefault()
        if (this.state.newTableName !== '') {
            // data[0].table_id is the current table id which is also the one we want to change 
            this.changeTableName(this.state.token,this.state.newTableName,this.state.data[0].table_id)
        }
    }
    changeTableName = (token,name,table_id) => {
        this.props.actions.modifyTable(token,name,table_id,true)
        this.setState({changeName: false,isLoading: true})
    }



    getTableData = (token,table_id) => {
        this.props.actions.getColumn(token,table_id)
        this.props.actions.getRow(token,table_id)
        this.props.actions.getUser(token,table_id)
        this.props.socket.emit('Join Room',table_id)
    }
    






    showInput = () => { 
        const styles = {
            tab: {
                backgroundColor: 'rgba(0,0,0,0.6)',
                width: '100%',
                textAlign: 'left',
                paddingLeft: 20,
                borderBottom: "1px solid dark",
                transition: '0.3s',
                color: 'white',
                display: 'flex',
                flexFlow: 'row wrap',
                alignItems: 'center'

            },
            inputTable:{
                width: "75%",
                color: 'white'
            },
            hiddenSubmit: {
                display:"none"
            },
            close:{
                cursor: 'pointer'
            }
        }
        
        return(
            <li key="add3" className="left" style={styles.tab} > <form onSubmit={(e) => this.handleSubmit(e)}> <input style={styles.inputTable} type="text" onChange={(e) => this.setState({tableName: e.currentTarget.value})}/> <input type="submit" style={styles.hiddenSubmit}/></form> <i style={styles.close} onClick={() => this.setState({toggleInput: false,tableName: ''})} className="material-icons small">close</i></li>
        )
    }
    render(){
        const styles = {
            tab:{
                backgroundColor: 'white',
                width: '100%',
                textAlign: 'left',
                paddingLeft: 20,
                cursor: 'pointer',
                borderBottom: "1px solid dark",
                transition: '0.3s'
            },
            addTable: {
                color: '#333'
            },
            userName:{
                fontSize: '18pt',
                color: '#0B1A37',
                margin: 0,

            },
            inputTable:{
                width: "75%"
            },
            hiddenSubmit:{
                display:"none"
            },
            actualTargetTab:{
                backgroundColor: '#0B1A37',
                width: '100%',
                textAlign: 'left',
                paddingLeft: 20,
                borderBottom: "1px solid dark",
                transition: '0.3s',
                color: 'white',
                display: 'flex',
                flexFlow: 'row wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
            },
            noMarg:{
                margin: 0
            },
            editIcon:{
                marginRight: '15px',
                cursor: 'pointer'
            },
            iconContainer: {
                marginRight: "5px"
            },
            form:{
                width: "50%"
            },
            inputChange:{
                color: 'white'
            },
            goToProfile:{
                color: '#0B1A37',
                cursor: 'pointer'
            }
        }
        const {table,data,toggleInput,token,changeName,isLoading,user} = this.state
        const username = localStorage.getItem('username').replace(/^\w/, function($0) { return $0.toUpperCase(); })
        let token64 = jwt.decode(token)
        let ownLevel = 0
        let empty = ''
        if (user !== []){
            user.map(userInfo => {
                userInfo._id === token64.id ? ownLevel = userInfo.lvl : empty = ''
            })
        }


            return(
                <div className=" row">
                    
                <p className="center padding-5" style={styles.userName}>Bonjour {username} !</p>
                <p className="center " style={styles.noMarg} >Votre ID :  {token64.id} </p>
                <p style={styles.goToProfile} ><Link to={`/profile/${token64.id}`}>Accéder a mon profile</Link> </p>
                   <ul className="">
                   {table.map(tableData => 
                   <li key={tableData._id} className="left" style={data[0] ? data[0].table_id === tableData._id ? styles.actualTargetTab : styles.tab : styles.tab}
                   onClick={() =>  data[0] ? data[0].table_id === tableData._id ? false : this.getTableData(token,tableData._id) : this.getTableData(token,tableData._id)}>
    
                            {changeName === tableData._id ?
                            <form  style={styles.form} onSubmit={(e) => {this.handleSubmitName(e)}}> <input type="text" onChange={(e) => this.setState({newTableName: e.currentTarget.value})} style={styles.inputChange}/> <input type="submit" style={styles.hiddenSubmit}/></form> :
                            <p style={styles.noMarg}>{tableData.name}</p> }
    
                            {data[0] ? data[0].table_id === tableData._id ?
                            <div style={styles.iconContainer}>
                            <i className="material-icons small" style={styles.editIcon} onClick={() => { !changeName ? this.setState({changeName: tableData._id}) : this.setState({changeName: false}) }}>edit</i>
                            {ownLevel === 4 ?
                            <i className="material-icons small" style={styles.editIcon} onClick={() =>
                                {
                                this.props.actions.resetRow()
                                this.props.actions.resetColumn()
                                this.props.actions.deleteTable(token,tableData._id,true)
                                }}>delete</i>
                            : false
                            }
                            
                            </div>
                            : false : false}
                    </li>
                    
                    )}
                    {toggleInput ? this.showInput() : false}
                    <p className="btn left white hoverable transition" onClick={() => this.setState({toggleInput: true})}><i style={styles.addTable} className="material-icons">add</i></p>
                    {/* <li key="add" className="left" style={styles.tab} ><i className="material-icons">add</i></li> */}
                    </ul>
                    {isLoading ? 
                        <div className="row">
                            <div className="preloader-wrapper big active">
                                <div className="spinner-layer spinner-blue-only">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div><div className="gap-patch">
                                    <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                                </div>
                            </div>
                        </div>
                    :
                        false
                    }
                </div>
            )
        }
        
    }

export default ListTable