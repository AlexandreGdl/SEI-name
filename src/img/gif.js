import React, {Component} from 'react'


class Gif extends Component {

    render(){
        const styles = {
            svg:{
                width:200,
                marginLeft: 290,
                position: 'relative'
            }
        }
        return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 595.3 841.9" enableBackground="new 0 0 595.3 841.9" style={styles.svg}>
            {/* <style type="text/css">.st0{fill:#19233E;} .st1{fill:#3D75BA;} .st2{fill:#FED500;}</style> */}
            <path className="st0" d="M297.587 147.844l124.167 124.167-124.167 124.167-124.167-124.167z" id="Calque_1"/>
            <path className="st1" d="M157.458 296.824l124.167 124.167-124.167 124.167-124.167-124.167z" id="Calque_2"/>
            <path className="st2" d="M440.456 296.822l124.167 124.167-124.167 124.167-124.167-124.167z" id="Calque_3"/>
        </svg>
        )
    }
}

export default Gif