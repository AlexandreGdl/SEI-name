import React , { Component } from 'react'
import { Link } from 'react-router-dom'
import Form from './form'
import jwt from 'jsonwebtoken'

export default class UserAllowed extends Component {

    constructor(props){
        super(props)
        this.state = {
            user: props.user,
            tabUser: props.userToShow,
            userToAdd: [],
            table_id: props.table_id,
            msg: '',
            chat: [],
            chat: props.chat,
            newMessage: 0
        }
    }

    componentDidMount(){
        const elems = document.querySelectorAll('.modal')
        const options= {}
        window.M.Modal.init(elems,options)

        var elemss = document.querySelectorAll('.tooltipped');
        window.M.Tooltip.init(elemss, options);

        let objDiv = document.getElementById("chat_container");
        objDiv.scrollTop = objDiv.scrollHeight;

        this.props.socket.on("Receive Message",data => {
            this.setState({newMessage: this.state.newMessage + 1})
        })
        
    }

    componentWillReceiveProps(props){
        this.setState({chat: props.chat,user: props.user,tabUser: props.userToShow})
        
    }

    componentDidUpdate(){
        let objDiv = document.getElementById("chat_container");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    addUser = () => {
        let toUpdate = {data: [{}]}
        let query = {}

        // toUpdate =  {data: [{...oldData[0].data[0],...req.body.data}]}

        this.state.userToAdd.map(user => {
            query[user._id] = 1 
            toUpdate = {data: [{...toUpdate.data[0],...query}]}
        })
        toUpdate.data = toUpdate.data[0]
        this.props.actions.addUser(this.props.token,this.props.table_id,toUpdate)
    }

    handleMessageSubmit = (e) => {
        e.preventDefault()
        this.sendMessage()
    }

    sendMessage = (j) => {
        if(this.state.msg === '' || this.state.msg === ' ' || this.state.msg === '  '){

        } else {
            let username 
            let token64 = jwt.decode(this.props.token)
            let id = token64.id
            let picture
            this.state.user.map(one => {
                if (id === one._id){
                    username = one.username
                    if(one.file_directory){
                        picture = one._id
                    } else {
                        picture = false
                    }
                }
            })
            let chat = {
                username,
                picture,
                msg: this.state.msg,
                id,
                id_message: j
            }
            this.props.socket.emit("New Message",{chat,table_id: this.props.table_id})
            document.getElementById("input").value = ""
            this.setState({msg: ''})

        }
        this.setState({msg: ''})

    }

    render(){

        const styles = {
            username:{
                color: '#333',
                fontWeight: 'bold'
            },
            user_container: {
                display: 'flex',
                flexFlow: 'row wrap',
                backgroundColor: 'rgba(163, 162, 162, 0.6)',
                alignItems: 'center',
                justifyContent:'space-between'
            },
            userListItem:{
                display: 'flex',
                alignItems: 'center',
                marginBottom: "15px",
                padding: "7px"
            },
            userName:{
                margin:0,
                marginLeft: "15px"
            },
            circleUser:{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height:50,
                borderRadius: 50,
                marginRight: 10,
                backgroundColor: "#FFD100"
            },
            img:{
                mawWidth: 50,
                maxHeight:50,
                borderRadius: 50,
                marginRight: 10,
            },
            containerToAdd:{
                display: 'flex',
            },
            toAdd:{
                marginRight: '5px'
            },
            containerName:{
                display: 'flex',
                flexFlow: 'column wrap',
                justifyContent: 'space-between'
            },
            noMarg:{
                margin:0
            },
            userAndAdd:{
                display:'flex',
                alignItems: 'center'
            },
            settingContainer:{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            },
            footer:{
                textAlign: 'center'
            },
            modal2:{
                height: "50vh"
            },
            profilePic:{
                maxWidth: 50,
                maxHeight:50,
                borderRadius: 50,
                marginRight: 10,
            },
            fifty:{
                width: '50px',
                height: '50px',
                marginRight: '10px'
            },
            circleUserChat:{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 25,
                height:25,
                borderRadius: 50,
                backgroundColor: "#FFD100",
                fontSize: "8pt"
            }
        }

        const {user,tabUser,userToAdd,chat,newMessage} = this.state
        let ownLevel = 1
        let empty = ''
        let token64 = jwt.decode(this.props.token)
        if(user !== []){
            user.map(userInfo =>{
                userInfo._id === token64.id ? ownLevel = userInfo.lvl : empty = ''
            })
        }

        const tab = [ {lvl: 1,name: "Lecteur/Editeur"},
                    {lvl: 2,name: "Editeur/Createur"},
                    {lvl: 3,name: "Edit/Creat/Suppr"},
                    {lvl: 4,name: "Admin"},
                    {lvl: 0,name: "Retirer"}
                  ]
                  let i = 0
                  let j = 0
                  function incrI(){
                    i++
                }
                function incrJ(){
                    j++
                }
        return(
            <div>
                <p className="amber-text text-lighten-5">Votre rôle : {tab[ownLevel - 1 ].name}</p>
                <p className="amber-text text-lighten-5">Personne ayant acces à ce projet : </p>
                    <div style={styles.user_container} className="padding-1">
                    <div style={styles.userAndAdd}>
                    {user.map(userInfo =>
                            <Link to={`/profile/${userInfo._id}`} key={userInfo._id} className="tooltipped"  data-position="top" data-tooltip={userInfo.username} style={styles.fifty}>
                                {userInfo.file_directory ?
                                <img src={`http://localhost:3001/users/profile/picture/${userInfo._id}`} style={styles.profilePic} /> 
                                :
                                <div style={styles.circleUser} className="z-depth-1"  >
                                    <p style={styles.username} className="bold">{userInfo.username.charAt(0).toUpperCase()}</p>
                                </div>}
                            </Link>
                        )}

                    {ownLevel === 4 ? 
                    <a href="#modal1" className="btn-floating btn-medium cyan modal-trigger"><i className="material-icons">add</i></a>
                    :
                    false
                    }
                    
                    
                    </div>
                    <div className="sei_tool">
                    <div style={{position: "relative"}}  onClick={() => this.setState({newMessage: 0})}>
                        <a href="#modal3" className={newMessage !== 0 ? "btn-floating btn-medium green modal-trigger chat_icon pulse" : "btn-floating btn-medium green modal-trigger chat_icon"}><i className="material-icons">chat</i></a> 
                        {newMessage === 0 ? false :  <p className="badge_message pulse">{newMessage}</p>}  
                    </div>
                    
                    {ownLevel === 4 ? 
                    <a href="#modal2" className="btn-floating btn-medium grey modal-trigger"><i className="material-icons">settings</i></a>
                    :
                    false
                    }
                    </div>
                    </div>

                    <div id="modal1" className="modal">
                        <div className="modal-content">
                        <h4>Ajouter un membre au projet</h4>
                            <div className="input-field">
                                <input type="text" id="member" onChange={(e) => {
                                    if(e.target.value !== ''){
                                        this.props.actions.findUser(e.target.value)
                                    } else {
                                        this.setState({tabUser: []})
                                    }
                                }}/>
                                <label htmlFor="member">Rechercher un utilisateur</label>
                            </div>
                            <div>
                                <ul style={styles.containerToAdd}>
                                    {userToAdd.map(userInAdd => 
                                        <li key={userInAdd._id} style={styles.toAdd} onClick={() =>{
                                         userToAdd.splice(userToAdd.indexOf(userInAdd,1))
                                         this.setState({userToAdd: userToAdd })
                                         }}><div className="chip">
                                            {userInAdd.username}
                                            <i className="close material-icons">close</i>
                                            </div>
                                        </li>    
                                    )}
                                </ul>
                            </div>
                            <ul style={styles.userListContainer}>
                                
                               
                                 {tabUser.map(info => {
                                    let toShow = true
                                    user.map(any => any._id === info._id ? toShow = false : console.log('no') )
                                if(userToAdd.indexOf(info) === -1 && toShow){
                                    return (<li style={styles.userListItem} className="li_user" key={info._id} onClick={() =>{
                                        userToAdd.push(info)
                                        this.setState({userToAdd: userToAdd})
                                     }}>
                                         {info.file_directory ?
                                <img src={`http://localhost:3001/users/profile/picture/${info._id}`} style={styles.profilePic}/> 
                                :
                                <div style={styles.circleUser} className="z-depth-1">
                                    <p style={styles.username} className="bold">{info.username.charAt(0).toUpperCase()}</p>
                                </div>}
                                        <div style={styles.containerName}>
                                            <p style={styles.noMarg}>{info.username}</p>
                                            <p style={styles.noMarg}>ID : {info._id}</p>
                                        </div>
                                     </li>
                                     )
                                 } else {

                                 }
                                 })}
                            </ul>
                            
                        </div>
                        <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect  btn-flat">Annuler</a>
                        <a href="#!" className="modal-close waves-effect  btn-flat" onClick={() => this.addUser()} >Ajouter</a>
                        </div>
                    </div>


                    <div id="modal2" className="modal" style={styles.modal2}>
                        <div className="modal-content">
                            {user.map(oneUser => 
                                
                                    <div key={oneUser._id} style={styles.settingContainer}>
                                        <div style={styles.userListItem}>
                                        {oneUser.file_directory ?
                                <img src={`http://localhost:3001/users/profile/picture/${oneUser._id}`} style={styles.profilePic}/> 
                                :
                                <div style={styles.circleUser} className="z-depth-1">
                                    <p style={styles.username} className="bold">{oneUser.username.charAt(0).toUpperCase()}</p>
                                </div>}
                                            <div style={styles.containerName}>
                                                <p style={styles.noMarg}>{oneUser.username}</p>
                                                <p style={styles.noMarg}>ID : {oneUser._id}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <Form actions={this.props.actions}lvl={oneUser.lvl} user_id={oneUser._id} token={this.props.token} table_id={this.props.table_id} />
                                        </div>
                                        
                                    </div>
                            )}
                        </div>
                        <div className="modal-footer" style={styles.footer}>
                            <p>Notez que des que vous changez un rôle, ce dernier est directement enregistré.</p>
                                <a href="#!" className="modal-close waves-effect  btn-flat">Fermer</a>
                        </div>
                    </div>

                    <div id="modal3" className="modal" style={styles.modal2} onMouseEnter={() => this.setState({newMessage: 0})}>
                        <div className="modal-content">
                           <div className="chat_container" id="chat_container">
                                <p className="starting">Ici débute votre conversation</p>
                                {chat.map(message => {
                                        return(
                                            <div className="chat_body" key={i} >
                                                {message.picture ?
                                                 <img src={`http://localhost:3001/users/profile/picture/${message.picture}`} alt="user"className="chat_user_icon"/> :
                                                 <div style={styles.circleUserChat} className="z-depth-1"  >
                                                     <p style={styles.username} className="bold">{message.username.charAt(0).toUpperCase()}</p>
                                                </div>
                                            }
                                                <div className="chat_content">
                                                <p className="chat_username">{message.username}</p>
                                                <div id={i}>
                                                    <p className="chat_message" id={message.id_message}>{message.msg}</p>
                                                </div>
                                                </div>
                                                {incrI()}
                                            </div>
                                            ) 
                                                                       
                                })}
                           </div>
                           <div>
                               <form className="chat_form" onSubmit={(e) => {this.handleMessageSubmit(e)}}>
                                   <input type="text" id="input"className="chat_textarea" onChange={(e) => this.setState({msg: e.target.value})} placeholder="Ecrivez votre message"/>
                                   <button className="chat_submit" onClick={() => {
                                       this.sendMessage(j)
                                       incrJ()
                                    }}>Envoyer <i className="material-icons small" >send</i></button>
                               </form>
                           </div>
                        </div>
                        <div className="modal-footer" style={styles.footer}>
                                <a href="#!" className="modal-close waves-effect  btn-flat">Fermer</a>
                        </div>
                    </div>
                    
            </div>
        )
    }

}