const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mernshopping', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ))

// mongoose.connection.on("connected", () => {
//   console.log("Connect Success")
// })

// mongoose.connection.on("error", (err) => {
//   console.log("error", err)
// })

module.exports = mongoose.connection;  
