import React,{Component} from 'react'
import background from '../img/1.png'
import Request from 'request'
import swal from 'sweetalert2'

class DisplayRegister extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            username: '',
            password2: ''
        }
    }


    handleSubmit = (e) => {
        e.preventDefault()
        let check = false
        this.state.email.indexOf('@') === -1 && this.state.email.indexOf('.') > this.state.email.indexOf('@') ? check = false : check = true
        if (this.state.email !== '' && this.state.password2 !== '' && this.state.password !== '' && this.state.password2 === this.state.password && check === true && this.state.username !== ''){

          this.createAccount(this.state.email,this.state.password,this.state.username)
        }
        
    }

    any = () => {
        window.location.replace("http://localhost:3000/project")
    }

    createAccount = (email,password,username) => {
        Request.put(`http://localhost:3001/users/create`, {json: {username,password,email}},  (err, res, body) => {
                if (err) {
                    console.log('error')
                    swal.fire({
                        title: 'Error',
                    })
                } else if (res.body.status !== 'error' && !err){
                    swal.fire({
                        title: 'success',type: 'success',text: 'Compte crée, vous pouvez désormais vous connecter avec !',confirmButtonText: 'Super !',onAfterClose: this.any()
                    })
                } else {
                    swal.fire({
                        type: 'error',
                        title: res.body.message,
                        text: res.body.value,
                        confirmButtonText: 'Tres bien !'
                    })
                }
            })
    }
    

    render(){
        const styles = {
            form:{
                backgroundColor: 'rgba(255,255,255,0.8)',
                borderRadius: 3,
                padding: 50
            },
            formSentence:{
                lineHeight: 2,
                color: "#333"
            },
            formTitle:{
                color: "#333",
                fontSize: '18pt',
                margin: 0
            },
            formPosition:{
                marginTop: 25
            },
            formContainer:{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexFlow: 'row',
                height: '100vh',
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover'
            },
            label:{
                color: '#333'
            },
            connectionCall:{
                cursor: 'pointer',
                color: "#1B4F72"
            }
        }

        return(
            <div className="row " style={styles.formContainer}>
                <div style={styles.form} className="col center z-depth-4 animate fadeUp">
                <p style={styles.formTitle}>Bienvenue sur SEI</p>
                    <p style={styles.formSentence}>Vous n'avez toujours pas de compte ? <br/> Inscrivez vous ici ! <br /> ( Vous serez automatiquement rediriger vers la connexion ) </p>
                    <form style={styles.formPosition} onSubmit={this.handleSubmit}>
                        <div className="input-field">
                        <input type='text' id='username' onChange={(e) => this.setState({username: e.target.value})}/>
                        <label style={styles.label} htmlFor='username'>Username</label>
                        </div>
                        <div className="input-field">
                        <input type='email' id='email'    minLength="8" onChange={(e) => this.setState({email: e.target.value})}/>
                        <label style={styles.label} htmlFor='email' >Email</label>
                        </div>
                        <div className="input-field">
                        <input type='password' id='password'    minLength="8" onChange={(e) => this.setState({password: e.target.value})}/>
                        <label style={styles.label} htmlFor='password' >Password</label>
                        </div>
                        <div className="input-field">
                        <input type='password' id='password2'    minLength="8" onChange={(e) => this.setState({password2: e.target.value})}/>
                        <label style={styles.label} htmlFor='password2' >Password Confirmation</label>
                        </div>
                        <button className="btn" type="submit"><i className="material-icons right">input</i>S'inscire</button>
                        <p onClick={() => this.any()} style={styles.connectionCall}>Vous avez déja un compte ? </p>
                    </form>
                </div> 
            </div>
        )
    }

}

export default DisplayRegister