import React, {Component} from 'react'
import Swiper from 'swiper'


class LandingTable extends Component {

    constructor(props){
        super(props)
        this.state = {
            table: props.table
        }
    }

    componentWillReceiveProps(props){
        this.setState({table: props.table})
    }
    
    getData = (id) => {
        this.props.actions.getColumn(this.props.token,id)
        this.props.actions.getRow(this.props.token,id)
        this.props.actions.getUser(this.props.token,id)
    }

    componentDidMount(){
        var mySwiper = new Swiper('.swiper-container', {
            speed: 400,
            spaceBetween: 100,
        });
    }

    render(){

        const { table } = this.state
        const styles = {
            landingTable: {
                width: '75%',
                display: 'flex',
                flexFlow: 'row wrap',
                alignItems: 'center',
                justifyContent: 'space-around',
                margin: '0 auto'
            },
            tableContainer:{
                backgroundColor: 'rgba(255,255,255,0.8)',
            },
            cardContent:{
                backgroundColor: '#FFD100'
            },
            Card:{
                cursor: 'pointer'
            }
        }

        return(
            <div style={styles.landingTable}>
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        {table.map(tableInfo=>
                        <div class="swiper-slide">
                                <h4 className="card-stats-title white-text">{tableInfo.name}</h4>
                                <p className="card-stats-number white-text">{tableInfo.description}</p>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

}

export default LandingTable