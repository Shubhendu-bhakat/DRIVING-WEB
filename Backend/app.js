// const dotenv = require('dotenv');
// dotenv.config();
// const express = require('express');
// const app = express();
// const cors = require('cors'); //make sure to install the cors package and dotenv package
// //db connection 
// const userRoutes = require('./routes/user.routes');
// const connectToDB = require('./db/db');
// connectToDB();
// app.use(express.json());
// app.use(express.urlencoded({extended:true}))


// app.use(cors());//cross domain request handler


// app.get('/', (req, res) => {
//     res.send('Hello World');
// });
// app.use('/users',userRoutes);

// module.exports = app;

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/users', userRoutes);



module.exports = app;

