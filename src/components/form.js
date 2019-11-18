import React, { Component  } from "react";


class Form extends Component {


    constructor(props){
      super(props)
      this.state = {
        lvl: props.lvl,
        user_id: props.user_id
      }
    }

    componentWillReceiveProps = (props) => {
      this.setState({lvl: props.lvl,user_id: props.user_id})
    }

      componentDidMount(){
        var elemsss = document.querySelectorAll('select');
        var options = {}
        window.M.FormSelect.init(elemsss, options)
      }


      editRight = (lvl) => {
        let query = {}

        query[this.props.user_id] = parseInt(lvl, 10)

        let toUpdate = {data: [query]}
        toUpdate.data = toUpdate.data[0]
        if(lvl > 0 ) {
          this.props.actions.addUser(this.props.token,this.props.table_id,toUpdate)
        } else {
          this.props.actions.deleteUser(this.props.token,this.props.table_id,this.props.user_id)
        }
      }
    render(){
      const {lvl} = this.state
      const tab = [ {lvl: 1,name: "Lecteur/Editeur"},
                    {lvl: 2,name: "Editeur/Createur"},
                    {lvl: 3,name: "Edit/Creat/Suppr"},
                    {lvl: 4,name: "Admin"},
                    {lvl: 0,name: "Retirer"}
                  ]
        return(
           <form>
             <select defaultValue={lvl} onChange={(e) => this.editRight(e.target.value)}>
                  {tab.map(lvlInfo => 
                      <option  key={lvlInfo.lvl} value={lvlInfo.lvl}>{lvlInfo.name}</option>
                    )}
                </select>
           </form>
        )
    }
}

export default Form