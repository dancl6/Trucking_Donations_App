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
import  Trucker_Login from "./pages/Trucker_Login"
import  Dock_Signup from "./pages/Dock_Signup"
import  Add_Load from "./pages/Add_Load"
import { StoreProvider } from "./utils/GlobalState";

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
    <ApolloProvider client={client}>
      <Router>
        <div>
        <img src= {process.env.PUBLIC_URL+"/Truck_Image.png"}  className = "image" />
      <Nav />
      <StoreProvider>
      <Switch>
      <Route exact path="/trucker_signup" component={Trucker_Signup} />
      <Route exact path="/dock_signup" component={Dock_Signup} />
      <Route exact path="/trucker_login" component={Trucker_Login} />
      <Route exact path="/add_load" component={Add_Load} />

    </Switch>
    </StoreProvider>
    </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
