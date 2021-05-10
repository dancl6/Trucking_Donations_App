import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider, InMemoryCache } from '@apollo/client';
import { ApolloClient } from '@apollo/client';
import Nav from "./components/Nav";
import  Trucker_Signup from "./pages/Trucker_Signup"
import  Trucker_Login from "./pages/Trucker_Login"
import  Dock_Signup from "./pages/Dock_Signup"
import { StoreProvider } from "./utils/GlobalState";

import { addTypenameToDocument } from '@apollo/client/utilities';
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
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>

      <Nav />
      <StoreProvider>
      <Switch>
      <Route exact path="/trucker_signup" component={Trucker_Signup} />
      <Route exact path="/dock_signup" component={Dock_Signup} />
      <Route exact path="/trucker_login" component={Trucker_Login} />

    </Switch>
    </StoreProvider>
    </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
