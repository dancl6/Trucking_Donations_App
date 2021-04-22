import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Nav from "./components/Nav";
import Trucker_Signup from "./pages/Trucker_Signup"
// import { StoreProvider } from "./utils/GlobalState";

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
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
      {/* <StoreProvider> */}
      <Nav />
      <Switch>
      <Route exact path="/trucker_signup" component={Trucker_Signup} />

    {/* </StoreProvider> */}
    </Switch>
    </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
