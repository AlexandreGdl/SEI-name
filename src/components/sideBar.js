import React, { Component } from "react";
import ListTable from './listTable'
import logo from "../img/fiole-noir.png"

class SideBar extends Component {

    constructor(props){
        super(props)
        this.state = {
            token: props.token,
            table: props.table,
            data: props.data,
            user: props.user,
            socket: props.socket
        }
    }


    componentWillReceiveProps(props){
        this.setState({token: props.token, table: props.table,data: props.data,user: props.user,socket: props.socket})
    }

   

    disconnect = () => {
        this.props.actions.resetRow()
        this.props.actions.resetTable()
        this.props.actions.resetColumn()
        this.props.actions.resetUser()
        this.props.actions.logout()
    }

    render(){
        const {table,data,user,socket} = this.state
        const {actions} = this.props
        const styles = {
            sideBarScroll: {
                overflowY: 'auto',
                backgroundColor: "#FFD100"
            },
            btn:{
                backgroundColor: "#0B1A37"
            },
            logo:{
                width: "40px",
                height:"40px"
            },
            topName:{
                display: 'flex',
                flexFlow :'row nowrap',
                alignItems: 'center',
                justifyContent:'center',
                fontSize: '20pt'
            },
            nameContainer:{
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }
        }
        return(
            <div>
        <aside className="sidenav-main nav-expanded sidenav-active-square nav-collapsible sidenav-light ">
            <div className="brand-sidebar z-depth-4" style={styles.nameContainer}>
                <h1 className="logo-wrapper" style={styles.topName}><img style={styles.logo} src={logo} alt="materialize logo"/><span className="logo-text hide-on-med-and-down">SEI Project</span></h1>
            </div>
            <div style={styles.sideBarScroll} className="sidenav sidenav-fixed menu-shadow center ps">
            
             <div>
             <ListTable user={user} data={data} table={table} actions={actions} token={this.props.token} socket={socket}/>
             <p className='btn' onClick={() => this.disconnect()} style={styles.btn}><i className="material-icons right">clear</i>Se Deconnecter</p>
             </div>
            </div>
            
        </aside>
        <a className="sidenav-trigger btn-sidenav-toggle btn-floating btn-medium waves-effect waves-light hide-on-large-only" href="/" data-target="slide-out"><i className="material-icons">menu</i></a>
        </div>
        )
    }

}

export default SideBar