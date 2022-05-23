// creating a routes..
const { LOADIPHLPAPI } = require('dns');
let express = require('express'),
path = require('path'),
mongoose = require('mongoose'),
cors = require ('cors'),
bodyParser = require('body-parser'),

mongoDb = require('./database/db');
mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database connected Succesfully..");
},
error=>{
     console.log("Database erorr:" +error);
})

//Now i am going to port serve..

const bookRoute = require("./node-backend/routes/book.routes");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(cors());

// Now Create Static path..

app.use(express.static(path.join(__dirname,'dist/Bookstore')));

//Api Root
app.use('/api',bookRoute);

// Port Created
const port = process.env.port || 9000;
    app.listen(port,()=>{
        console.log('Listing port on :' + port);
})

// 404 Error Handling..

app.get('/',(req,res)=>{
    res.send('Invalid Endpoint');
});

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/Bookstore/index.html'));
});


app.use(function(err,req,res,next){
    console.error(err.message);

    if(!err.statusCode)err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

