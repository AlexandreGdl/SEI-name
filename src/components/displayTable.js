import React , {Component} from 'react'
import LandingTable from './landingTable';
import DropDown from './dropDown.js';
import UserAllowed from './userAllowed'
import swat from 'sweetalert2'
import jwt from 'jsonwebtoken'

class displayTable extends Component {



    constructor(props){
        super(props)
        this.state = {
            table: this.props.table,
            data: this.props.data,
            token: this.props.token,
            column: this.props.column,
            toggle: false,
            inputColum: false,
            newColName: '',
            changeColName: '',
            celInput: [0,0],
            changeCelValue: '',
            column_id: this.props.column_id,
            choosenRow: [],
            user: props.user,
            userToShow: props.userToShow,
            rowOver: '',
            toggleNewDesc: false,
            newDesc: '',
            socket: props.socket,
            chat: props.chat
        }
    }

    
    componentWillReceiveProps(props){
        if (props.table.length > this.state.table.length && this.state.table !== []) {
            window.M.toast({html: "Table successfully created"})
        }
        // because we are updating the column all the row are also updated
        if (props.column !== this.state.column && props.column.length !== 0){
            this.props.actions.getRow(this.state.token,props.column[0].table_id)
        }
        this.setState({chat: props.chat,table: props.table,data: props.data,column: props.column,column_id: props.column_id,user: props.user,userToShow: props.userToShow, choosenRow: [],toggleNewDesc: false,socket: props.socket})

    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.newColName !== ''){
            this.props.actions.addColumn(this.state.token,this.state.data[0].table_id,this.state.newColName,true)
            this.setState({inputColum: false})
        }
    }

    handleSubmitColumnName = (e) =>{
        e.preventDefault()
        if (this.state.changeColName !== '') {
            this.props.actions.modifyColumn(this.props.token,this.state.data[0].table_id,this.state.changeColName,this.props.column_id,true)
        }
        this.props.actions.defaultColumnInput()
    }

    handleSubmitCelValue = (e) => {
        e.preventDefault()
        if  ( this.state.changeCelValue !== '') {
                                            // token,            table_id,                   row_id,                 row_value,              column_id
            this.props.actions.modifyRow(this.props.token,this.state.data[0].table_id,this.state.celInput[0],this.state.changeCelValue,this.state.celInput[1],true)
            
        }
        this.setState({celInput: [0,0],changeCelValue: ''})
    }

    toggleInputVal = () => {
        this.setState({celInput: [0,0]})
    }

    changeDesc = () => {
        if (this.state.newDesc !== '' || this.state.newDesc !== ' '){
            this.props.actions.changeDesc(this.props.token,this.props.data[0].table_id,this.state.newDesc,true)
            this.setState({toggleNewDesc: false})
        } else {
            swat.fire({type:'error',title:'Enter a valid description or Cancel'})
        }
        
    }

    resetTable = () => {
        this.props.actions.resetTableData()
    }

   render(){
    const styles = {
        table:{
            marginBottom: 0
        },
        input:{
            width: 'auto',
            height: 'auto'
        },
        addRow:{
            backgroundColor: 'white',
            color: 'black'
        },
        noMarg: {
            margin: 0
        },
        deleteRow:{
            margin:0,
            marginLeft: 5,
            backgroundColor: 'rgb(220, 59, 59)',
            color: "white"
        },
        tableContainer:{
            display: 'flex',
            flexFlow: 'row'
        },
        addColumn:{
            margin:0,
            marginTop: '7.5px'
        },
        inputAddColumn:{
            height: 20,
            width: "80%"
        },
        columnInput: {
            width: 150,
            height: 20
        },
        hiddenSubmit:{
            display:'none'
        },
        iconColumn:{
            cursor: 'pointer'
        },
        columnContainer:{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            
        },
        btnInput:{
            width: 100,
            margin: 0
        },
        inputChangeCel: {
            width: "50%",
            height: "20px"
        },
        formCel:{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 0
        },
        nothing:{

        },
        tdTab: {
            width: "300px"
        },
        idRowCol:{
            width: "50px"
        },
        choosenRow:{
            backgroundColor: 'rgb(185, 217, 217)'
        },
        selectRow:{
            cursor: 'pointer'
        },
        textarea:{
            color: '#fff'
        },
        btnDesc:{
            marginLeft: '10px'
        }
    }

        const {table,data,column,inputColum,column_id,celInput,choosenRow,user,userToShow,rowOver,token,toggleNewDesc,newDesc,socket,chat} = this.state
        //creating variable in order to create the Row Array
        let currentTable = ''
        let allRow = []
        let dataExemple = []
        let j = 1
        let updatedChoosenRow= ''
        let token64 = jwt.decode(token)
        // creating the array with all the row and value
        if ( data[0]) {
            table.map(info => info._id === data[0].table_id ? currentTable = info : false )
            for (var i = 0; i < data.length; i++) {
                allRow[i]= Object.entries(data[i].data[0])
                allRow[i][0].push(data[i]._id)
              }
            dataExemple = data[0]
        }
        let ownLevel = 1
        let empty = ''
        function incrJ(){
            j++
        }

        if(user !== []){
            user.map(userInfo =>{
                userInfo._id === token64.id ? ownLevel = userInfo.lvl : empty = ''
            })
        }

       return(
        <div className="row pb-3 animate fadeLeft">  
        {/* If no table selected show a Menu with all the table else , show the table data */}
        {!data[0] ? 
        <LandingTable table={table} token={token} actions={this.props.actions}/>
        :
        <div style={{minHeight: "100vh"}}>
           <div className="close_tab" onClick={() => this.resetTable()}> <i className="material-icons">close</i> </div>
        <div className="container">
            <div className="row">
                <div className="col s12">
                    <h4 className="amber-text text-lighten-5">{currentTable.name}</h4>
                </div>
                <div className="col s12">
                    {toggleNewDesc ?
                    <div className="input-field">
                        <textarea style={styles.textarea} id="textarea1" className="materialize-textarea"
                         onChange={(e) => this.setState({newDesc: e.target.value})} defaultValue={currentTable.description}></textarea>
                        <label htmlFor="textarea1">Description</label>
                        <p className="btn red" onClick={()=> this.setState({toggleNewDesc: false})}>Annuler</p>
                        <p className="btn green" style={styles.btnDesc} onClick={()=> this.changeDesc()}>Sauvegarder</p>
                    </div>
                    :<p onClick={()=>
                        ownLevel === 4 ? this.setState({toggleNewDesc: true}) : false
                    }>
                    {currentTable.description ? currentTable.description : 'Click to add a description to the project ( Only for Admin )'}</p>}
                    
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <UserAllowed chat={chat} socket={socket} user={user} actions={this.props.actions} userToShow={userToShow} token={this.props.token} table_id={data[0].table_id}/>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col s12  ">
                 <div className="container">
                 <div style={styles.tableContainer}>  
                <table className="responsive-table card-panel highlight padding-8" style={styles.table}>
                    {/* Table Header (column) */}
                    <thead>
                    <tr>
                        {/* default column ID  */}
                        <th style={styles.idRowCol}>ID</th>
                        { column.map( columnData => 
                        // Creating column for each column in data base for this table
                         <th key={columnData._id} >
                             
                            {/* in order to change the name if activated */}
                            {column_id === columnData._id ?
                            <form onSubmit={(e) => this.handleSubmitColumnName(e)} style={styles.formCel}>
                            <input type="text" placeholder={columnData.colName} autoFocus style={styles.inputAddColumn} onChange={(e) => this.setState({changeColName: e.target.value})}/>
                            <input style={styles.hiddenSubmit} type="submit"/>
                            </form>
                            :
                            // else show basic column 
                            <div style={styles.columnContainer}>
                            {/* column Name */}
                            <p style={styles.noMarg}>{columnData.colName}</p>
                            {/* import the DropDown Component and give him props */}
                            <DropDown socket={socket} actions={this.props.actions} column={column} column_id={columnData._id} token={this.props.token} table_id={data[0].table_id} user={user}/>
                            </div>
                            }
                        </th>   
                            )  }
                        {/* Add a new column with input in order to add a new column to the table if inputColum toggle*/}
                       {inputColum ?  <th style={styles.columnInput}>
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                        <input type="text" autoFocus style={styles.inputAddColumn} onChange={(e) => this.setState({newColName: e.target.value})}/>
                        <input style={styles.hiddenSubmit} type="submit"/> </form> </th>
                        : false}
                    </tr>
                    </thead>
                    <tbody>
                    
                    { allRow.map(row =>
                    <tr key={row[0][2]} style={choosenRow.indexOf(row[0][2]) !== -1  ? styles.choosenRow : styles.nothing} className={choosenRow.indexOf(row[0][2]) !== -1  ? "" : "tr"}
                    onMouseEnter={() => this.setState({rowOver: row[0][2]})}
                    onMouseLeave={() => this.setState({rowOver: ''})}
                    >
                        <td onClick={() =>{
                            choosenRow.indexOf(row[0][2]) !== -1 ?
                            this.setState({choosenRow: choosenRow.splice(choosenRow.indexOf(row[0][2]),1)})
                            : 
                            choosenRow.push(row[0][2])
                            updatedChoosenRow = choosenRow
                            this.setState({choosenRow: updatedChoosenRow})}}
                            style={styles.selectRow}
                            >
                            { choosenRow.indexOf(row[0][2]) === -1  && rowOver === row[0][2] ?  <form style={styles.noMarg}>
      <label style={styles.noMarg}>
        <input  style={styles.noMarg} type="checkbox" className="filled-in" />
        <span style={styles.noMarg} > </span>
      </label>
    </form> : choosenRow.indexOf(row[0][2]) !== -1 ? <i className="material-icons tiny">check</i> : j}
                            </td>
                        {row.map(rowValue =>
                        <td className={choosenRow.indexOf(row[0][2]) !== -1  ? "td_rowSelected" : "td_row"} key={rowValue[0]} onClick={() => this.setState({celInput: [row[0][2],rowValue[0]]})} style={celInput[0] === row[0][2] && celInput[1] === rowValue[0] ? styles.tdTab : styles.nothing}>
                            {celInput[0] === row[0][2] && celInput[1] === rowValue[0] ?
                            <form onSubmit={(e) => this.handleSubmitCelValue(e)}  style={styles.formCel}>
                            <input type="text" placeholder={rowValue[1]} autoFocus style={styles.inputChangeCel} onChange={(e) => this.setState({changeCelValue: e.target.value})}/>
                            <input style={styles.hiddenSubmit} type="submit"/>
                            <i className="material-icons tiny" onClick={() => this.setState({celInput: [0,0]})} >clear</i>
                            </form>
                            : rowValue[1] }
                        </td>)}
                        {incrJ()}
                    </tr>                        
                    )}
                    </tbody> 
                    
                </table>
                {ownLevel > 1 ?
                <p className="btn left white hoverable transition"
                onClick={() => this.setState({inputColum: inputColum ? false : true})}
                style={styles.addColumn}><i style={styles.addRow} className="material-icons">add</i></p>
                : empty = ''}
</div>
                <div>
                {ownLevel > 1 ?
                <p className="btn left white hoverable transition"
                onClick={() => {
                    this.props.actions.addRow(this.props.token,data[0].table_id,column,dataExemple,true)
                }}
                style={styles.noMarg}><i style={styles.addRow} className="material-icons">add</i></p>
                :empty = ''}
                

                {choosenRow.length > 0 && ownLevel > 2 ?
                <p className="btn left hoverable transition"
                onClick={() => {
                if (choosenRow.length !== data.length) {
                    choosenRow.map(row => {
                    this.setState({choosenRow: []})
                    this.props.actions.deleteRow(this.props.token,this.props.data[0].table_id,row,true)
                    })
                } else {
                    swat.fire({title: 'Can\'t delete all the rows',type: 'error'})
                }
            }}
                style={styles.deleteRow}><i className="material-icons">delete<small className="notification-badge">{choosenRow.length}</small></i></p>
                : false
                }
                </div>
            </div>
        </div>
    </div>
    </div>    
        }
</div>
       )
   }


}

export default displayTable