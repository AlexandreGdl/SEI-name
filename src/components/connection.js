import React,{Component} from 'react'
import background from '../img/1.png'

class DisplayConnection extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }


    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.email !== '' && this.state.password !== ''){
            this.props.actions.login(this.state.email,this.state.password)
        }
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
            <div className="row animate " style={styles.formContainer}>
                <div style={styles.form} className="col center z-depth-4 animate fadeUp">
                <p style={styles.formTitle}>Bienvenue sur SEI</p>
                    <p style={styles.formSentence}>Connectez vous avec votre compte.</p>
                    <form style={styles.formPosition} onSubmit={this.handleSubmit} >
                        <div className="input-field">
                        <input type='email' id='email'    minLength="8" onChange={(e) => this.setState({email: e.target.value})}/>
                        <label style={styles.label} htmlFor='email' >Email</label>
                        </div>
                        <div className="input-field">
                        <input type='password' id='password'    minLength="8" onChange={(e) => this.setState({password: e.target.value})}/>
                        <label style={styles.label} htmlFor='password' >Password</label>    
                        </div>
                        <button className="btn" type="submit"><i className="material-icons right">input</i>Se Connecter</button>
                        <p style={styles.connectionCall} onClick={() =>{ window.location.replace("http://localhost:3000/")}}>Pas encore de compte ?</p>
                    </form>
                </div> 
            </div>
        )
    }

}

export default DisplayConnection