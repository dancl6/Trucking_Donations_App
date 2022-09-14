const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { DateTimeResolver, DateTimeTypeDefinition } = require('graphql-scalars')
// const { ApolloServer } = require('apollo-server');
const path = require('path');
require("dotenv").config();
const { ScalarNameResolver } = require('graphql-scalars');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');





const PORT = process.env.PORT || 3001;
const PORT_PUSH = process.env.PORT_PUSH || 3004
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});


const webpush = require('web-push')
// const bodyParser= require('body-parser')
// app.use(bodyParser.json())
const publicVapidKey = 'BKJsLI3aWaL3s3zjKKhta0Os-8WhFyuBCYD_GmmF1mrodDPQvYwhaYv90cS7dOfZrvnj8ZkFwngpxDaL2zlADj0'
const privateVapidKey = 'h-GdjZmGd2Vyw75ssvUwVz-eZMy6DB28HO61t5V1stw'
webpush.setVapidDetails('mailto:dan.lyons.career@gmail.com', publicVapidKey, privateVapidKey)
// Subscribe Route
app.post('/subscribe', (req,res) => {
  // Get pushSubscription object
  const subscription = req.body
  // Send 201 - resource created
  res.status(201).json({})

  // Create payload
  const payload = JSON.stringify({ title: 'Push Test'})


// Pass object into sendNotification
webpush.sendNotification(subscription, payload).catch(err => console.error(err))

})

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// server.start({port: 3000, endpoint:'/graphql'})

db.once('open', () => {
  app.listen({port: PORT}, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

app.listen({port: PORT_PUSH}, () => console.log(`Push Server started on port ${PORT_PUSH}`))