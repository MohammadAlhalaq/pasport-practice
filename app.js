const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const { join } = require('path');

const router = require('./routes');
const users = require('./routes/users');

//DB Config
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('mongoDb is connected...'))
.catch((err) => console.log(err));


//comfigration app
const app = express();
const port = process.env.PORT || 50000;

//statics
app.use(express.static(join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false}));

//ejs layout
app.use(expressLayouts);
app.set('view engine', 'ejs');

//body parser
app.use(express.json());

// ROuter
app.use( users)
app.use(router)
app.use((err, req, res, next) => {
  if (err.isBoom ) {
    if (err.output.statusCode == 422) {
      if(err.output.payload.message.includes('register')){
        res.render('register', {error: err.output.payload.message})
      }
      
    }
  }
  
})
app.listen(port, () => console.log(`server know listening to http://localhost:${port}`)
)