import React, {Component} from 'react'
import jwt from 'jsonwebtoken'
import img from '../img/user.png'
import swat from 'sweetalert2'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Profile extends Component {

    constructor(props){
        super(props)
        this.state = {
            token: props.token,
            id: props.id,
            actions: props.actions,
            profile: props.profile,
            editToggle: false,
            password: '',
            password2: '',
            newName: '',
            email:'',
            selectedFile: null
        }
    }

    componentWillMount(){
        this.state.actions.getProfile(this.state.id)
    }

    componentWillReceiveProps(props){
        this.setState({profile: props.profile,token: props.token})    
        
    }


    savePassword = () =>{
        if (this.state.password !== '' && this.state.password === this.state.password2){
            this.props.actions.changePassword(this.state.token,this.state.id,this.state.password)
            swat.fire({
                type:'success',
                title:'Changement effectuer'
            })
        }
    }

    saveName = () =>{
        if (this.state.newName !== ''){
            this.props.actions.changeName(this.state.token,this.state.id,this.state.newName)
            swat.fire({
                type:'success',
                title:'Changement effectuer'
            })
        }
    }

    saveEmail = () =>{
        if (this.state.email !== '' && this.state.email.indexOf('@') !== -1 && this.state.email.indexOf('.') > this.state.email.indexOf('@') ) {
            this.props.actions.changeEmail(this.state.token,this.state.id,this.state.email)
            swat.fire({
                type:'success',
                title:'Changement effectuer'
            })
        }
    }

    handleFile = (e) => {
        this.setState({selectedFile: e.target.files[0]})
    }

    saveNewImg = (selectedFile) => {
        let reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onload=(e)=>{
            const body = { file: e.target.result,name: selectedFile.name,token: this.state.token}
            axios.post(`http://localhost:3001/users/changeImg/${this.state.id}`,body)
            .then(res => {
                this.state.actions.getProfile(this.state.id)
                console.log(res)
            })
        }
    }

    deleteImg = () => {
        const body = {token: this.props.token}
        axios.post(`http://localhost:3001/users/deleteImg/${this.state.id}/`, body )
        .then(res => {
            this.state.actions.getProfile(this.state.id)
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        
        const {token,profile,editToggle,selectedFile} = this.state
        if (token === '' ){
            window.location.replace('http://localhost:3000/')
        }
        let token64 = jwt.decode(token) 
        let showParameterChange = false
        
        if(profile.length === 0) {
            return(
                <div>
                    Loading
                </div>
            )
        } else {
            if (token64.id === profile[0]._id) {
                showParameterChange = true
            } else {
                showParameterChange = false
            }

            const styles = {
                img: {
                    width: 150,
                    height: 150
                },
                username:{
                    margin:0,
                    padding:0
                },
                divEditImg:{
                    display: 'flex',
                    justifyContent: 'space-between'
                },
                editTool:{
                    cursor: 'pointer'
                },
                inputEdit:{
                    width: '35%'
                },
                callModifPassword:{
                    margin: 0,
                    marginTop: 50,
                    fontSize: "16pt"
                },
                inputPassword:{
                    display: 'flex',
                    flexFlow: 'column wrap'
                },
                btnChoice:{
                    display: 'flex',
                    flexFlow: 'column wrap',
                    width: '30%'
                },
                confirmBtn:{
                    marginLeft: 20
                },
                email:{
                    fontSize: '14pt'
                },
                profileContainer:{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                card:{
                    width: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                goBack:{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                block:{
                    width: "50%"
                }
            }
            const username = profile[0].username.replace(/^\w/, function($0) { return $0.toUpperCase(); })
            return(
                <>
                <div style={styles.profileContainer}>
                   
                    <div className="row" style={styles.card}>
                        <div className="col  padding-8 card" style={styles.block} >
                        <div style={styles.divEditImg}>
                            {editToggle ? <div> <form><input type="file" accept="image/png" onChange={(e) => this.handleFile(e)}/> </form>
                            <p style={styles.confirmBtn} className="btn confirmer" onClick={() => {this.saveNewImg(selectedFile)}}>Sauvegarder</p>
                            <p style={styles.confirmBtn} className="btn confirmer annuler" onClick={() => {this.deleteImg()}}>Supprimer</p> </div>
                             : profile[0].file_directory ? <img style={styles.img} src={`http://localhost:3001/users/profile/picture/${profile[0]._id}`} alt='user'/> : <img style={styles.img} src={img} alt='user'/> }
                            
                            {showParameterChange ? <p style={styles.editTool} onClick={() =>  this.setState({editToggle: editToggle ? false : true})}><i className="material-icons">edit</i></p> : false}
                        </div>
                        { editToggle ?
                            <div style={styles.inputPassword}>
                                <p style={styles.callModifPassword} >Modifier votre nom : </p>
                                <div className="input-field">
                                    <input style={styles.inputEdit} type="text" placeholder={profile[0].username} onChange={(e) => this.setState({newName: e.target.value})} />
                                    <p style={styles.confirmBtn} className="btn confirmer" onClick={() => {this.saveName()}}>Sauvegarder</p>
                                </div>
                            </div>
                            : <> <h2 style={styles.username} className="card-content">{username}</h2>
                              <p style={styles.email}>Adresse e-mail : {profile[0].email}</p> </>}
                        <p>ID : {profile[0]._id}</p>
                        {editToggle ?
                        <div> 
                            <div style={styles.inputPassword}>
                                <p style={styles.callModifPassword} >Modifier votre mot de passe : </p>
                                <div className="input-field">
                                    <input type="password" id="passowrd" style={styles.inputEdit} onChange={(e) => this.setState({password: e.target.value})} />
                                    <label htmlFor="passowrd">New Password</label>
                                </div>
                                <div className="input-field">
                                    <input type="password" id="passowrdConfirmation" style={styles.inputEdit}  onChange={(e) => this.setState({password2:e.target.value})} />
                                    <label htmlFor="passowrdConfirmation">Confirmation Password</label>
                                    <p style={styles.confirmBtn} className="btn confirmer" onClick={() => {this.savePassword()}}>Sauvegarder</p>
                                </div>
                                
                            </div>

                            <div style={styles.inputPassword}>
                                <p style={styles.callModifPassword} >Modifier votre email : </p>
                                <div className="input-field">
                                    <input type="email" id="email" style={styles.inputEdit}  onChange={(e) => this.setState({email: e.target.value})} />
                                    <label htmlFor="email">Email</label>
                                    <p style={styles.confirmBtn} className="btn confirmer" onClick={() => {this.saveEmail()}}>Sauvegarder</p>
                                </div>
                            </div>

                            <div style={styles.btnChoice}>
                                <p className="btn annuler" onClick={() => this.setState({editToggle: false})}>Annuler</p>
                                
                            </div>
                        </div>
                        :
                        false 
                        }
                        </div>
                    </div>

                </div>
                <div>
                    <div style={styles.goBack}>
                    <Link to={`/project`} className="amber-text text-lighten-5"> <p className="btn annuler amber-text text-lighten-5">Revenir à la page projet</p></Link>
                                
                    </div>
                </div>
                </>
            )
        }
        
    }
}

export default Profile