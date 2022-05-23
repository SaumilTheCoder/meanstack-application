// Creating a Routing.. 

const express = require("express");
const res = require("express/lib/response");
const { json } = require("express/lib/response");
const app = express();

const bookRoute = express.Router(); //this module very importanat

let Book = require("../model/Book");

// Add Book for Store..

bookRoute.route('/forms/basic').post((req,res, next)=>{
    Book.create(req.body,(error,data)=>{
        if(error){
            return next(error)
        }
        else{
            res.json(data)
        }
    });
});


//get data from book store
bookRoute.route('/').get((req,res)=>{
    // alert("hii");
    Book.find((error,data)=>{
        if(error)
        {
            return next(error);
        }
        else{
            res.json(data)
        }
    });
});

//Same as this all
//Get Book by ID

bookRoute.route('/read-book/:id').get((req,res)=>{
    Book.findById(req.params.id,(error,data)=>{
        if(error)
        {
            return next(error);
        }
        else{
            res.json(data)
        }
    });
});

//Update data..

bookRoute.route('/update-book/:id').put((req,res,next)=>{
    // alert("hii update checking data..");
    Book.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },(error,data)=>{
        if(error)
        {
            return next(error);
            console.log(error);
        }
        else{
            res.json(data);
            console.log('Student Record updated Suceesfully..');
        }
    });
});


// Delete Data..

bookRoute.route('/delete-book/:id').delete((req,res,next)=>{
    Book.findByIdAndRemove(req.params.id,(error,data)=>{
        if(error)
        {
            return next(error);
        }
        else{
            res.status(200).json({
                msg:data
            })
            // res.json(data)
        }
    });
});
// Don't Forget the exports module..
module.exports = bookRoute;