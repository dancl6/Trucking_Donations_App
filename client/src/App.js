// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { ApolloProvider, InMemoryCache } from '@apollo/client';
import ApolloClient from 'apollo-boost';

import { ApolloProvider } from '@apollo/react-hooks';
// import { ApolloClient } from '@apollo/client';
import Nav from "./components/Nav";
import  Trucker_Signup from "./pages/Trucker_Signup"
import  Modify_Load from "./pages/Modify_Load"
import  Trucker_Login from "./pages/Trucker_Login"
import  Dock_Signup from "./pages/Dock_Signup"
import Dock_Login from "./pages/Dock_Login"
import  Add_Load from "./components/Add_Load"
import Search_Loads from './pages/Search_Loads';
import { StoreProvider } from "./utils/GlobalState";
import My_Loads from './pages/My_Loads';
import Test_Form_Fill from './pages/Test_Form_FIll';
import Test_Effect from './pages/Test_Effect'
// import { addTypenameToDocument } from '@apollo/client/utilities';
// import { cache } from './cache'


const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
  // cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider key ="appollo_provider" client={client}>
      <Router key = "router">
        <div key = "parent_div_appjs">


      <StoreProvider key = "store_provider">
      <Nav key = "nav" />
      <Switch key = "switch">

      <Route exact path="/trucker_signup" key = "trucker_signup" component={Trucker_Signup} />
      <Route exact path="/dock_signup" key = "dock_signup" component={Dock_Signup} />
      <Route exact path="/trucker_login" key = "trucker_login" component={Trucker_Login} />
      <Route exact path="/dock_login" key = "dock_login" component={Dock_Login} />
      <Route exact path="/add_load" key = "add_load" component={Add_Load} />
      <Route exact path="/load_search" key = "load_search" component={Search_Loads} />
      <Route exact path="/modify_load/:id" key = "modify_load" component={Modify_Load} />
      <Route exact path="/my_loads" key = "my_loads" component={My_Loads} />
      <Route exact path="/test_useEffect_useState" key = "test_effect" component={Test_Effect} />
      <Route exact path= "/test_form_fill" key = "test_form_fill" component= {Test_Form_Fill} />
      {/* <Route exact path="/add_load" component={Add_Load} /> */}

    </Switch>
      <img key = "img" src= {process.env.PUBLIC_URL+"/Truck_Image.png"}  className = "image" />


    </StoreProvider>
    </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
