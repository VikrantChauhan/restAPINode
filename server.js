const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const app = express();

// load bodyparser
const bodyparser = require('body-parser');

// +++++ Routes files +++++
const user = require('./api/student');

// +++++ DB config +++++
const db = require('./config/key').mongoURI;

//body parser middle ware
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());

// +++++ DB connect +++++
mongoose.connect(db,{useNewUrlParser: true}).then(()=>{
    console.log('DB connected');
}).catch((err)=>{
    console.log(err);
})

app.get('/', (req,res) => {
    res.send('Hello');
});

//+++++ use routes +++++
app.use('/api/student',user);

const port = process.env.port || 4000;

app.listen(port , ()=> {
    console.log(`server is running on ${port}`);
});
