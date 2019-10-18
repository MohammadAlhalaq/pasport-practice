const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { join } = require('path');

const router = require('./routes');
const users = require('./routes/users');


const app = express();
const port = process.env.PORT || 4500;
//ejs layout
app.use(express.static(join(__dirname, 'public')))
app.use(expressLayouts);
app.set('view engine', 'ejs');

// ROuter
app.use( users)
app.use(router)
app.listen(port, () => console.log(`server know listening to http://localhost:${port}`)
)