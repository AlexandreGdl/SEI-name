import React, {Component} from 'react'
import swat from 'sweetalert2'
import jwt from 'jsonwebtoken'

class DropDown extends Component {

    constructor(props){
        super(props)
        this.state = {
            actions: props.actions,
            column_id: props.column_id,
            table_id: props.table_id,
            token: props.token,
            column: props.column,
            user: props.user
        }
    }


    componentWillReceiveProps(props){
        this.setState({column_id: props.column_id,column: props.column,user: props.user,token: props.token})
    }

    componentDidMount(){
        const elems = document.querySelectorAll('.dropdown-trigger.material-icons')
        const options= {}
        window.M.Dropdown.init(elems,options)
    }


    render(){
        const styles = {
            noMarg:{
                margin: 0
            },
            liDropDown:{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '5px'
            }
        }

        const {column,user,token} = this.state

        let ownLevel = 0
        let empty = ''
        let token64 = jwt.decode(token)
        if ( user !== [] ){
            user.map(userInfo => {
                token64.id === userInfo._id ? ownLevel = userInfo.lvl : empty = ''
            })
        }
        return(
            <>
            <i className="material-icons dropdown-trigger" data-target={this.props.column_id} >arrow_drop_down</i>
            <ul id={this.props.column_id} className='dropdown-content'>
                <li style={styles.liDropDown} onClick={() => this.props.actions.changeColumnInput(this.props.column_id)}><p href="#!" style={styles.noMarg}>Rename</p><i className="material-icons tiny">edit</i></li>
                <li className="divider" tabIndex="-1"></li>
                {ownLevel > 2 ?
                <>
                <li style={styles.liDropDown} onClick={() =>{
                if(column.length !==1 ){
                    this.props.actions.deleteColumn(this.props.token,this.props.column_id,this.props.table_id,true)
                } else {
                    swat.fire({title: 'can\'t delete all Columns',type: "error"})
                }}}>
                <p href="#!" style={styles.noMarg}>Delete</p><i className="material-icons tiny">delete</i>

                </li>
                <li style={styles.liDropDown} onClick={() => { this.props.actions.changeColumnGroupBy(this.props.column_id,this.props.table_id,this.props.token)}}><p href="#!" style={styles.noMarg}>Sort with</p> <i className="material-icons tiny">sort</i></li>
                </>
                : false }
            </ul>
            {/* this.props.actions.deleteColumn(token,column_id,table_id) */}
            </>
        )
    }
}
export default DropDown