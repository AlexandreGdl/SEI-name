import React from 'react';
import { Provider } from 'react-redux'
import Home from './container/home'
import Profile from './container/profile'

import configureStore from './configureStore/configureStore'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import DisplayRegister from './components/displayRegister'
// Note : Pour afficher les bon éléments dans la bonne colonne utilise data = le data dans row <td>data[idCol]</td>
// et ainsi de suite

let store = configureStore({data: [],table:[],column:[],token: '',column_id: []});


function Index() {
     return (
       <div>
        <DisplayRegister/>
      </div>
     )
}

function Content(){

    return(
      <>
      <Home />
      </>
    )
}

function UserProfile({match}){
  return(
    <div>
      <Profile id={match.params.id} />
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>

  

      <Router>
        <Route path="/" exact component={Index} />
        <Route path="/project" exact component={Content} />
        <Route path="/profile/:id" exact component={UserProfile}/>
      </Router>


    </Provider>
  );
}

export default App;
