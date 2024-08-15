const express = require('express');
const studentRoutes = express.Router();
const dbo = require('../db/connection');
const student = require('../model/student');


//  //inserting  new novel to the database
// .post((req,res,next)=>{
//     Novel.create(req.body)
//     .then((novel)=>{
//         res.status=200;
//         res.json(novel);
//     })
//     .catch((err) => next(err));

// })


// router.post('/create',(req,res,next)=>{
//     items.create({
//         itemname:req.body.itemname,
//         price:req.body.price,
//         detail:req.body.detail,
//         item_category:req.body.item_category,
//         cafe:req.body.cafe,
//         image:req.body.image
//     }).then((callbacks)=>{
//         res.json( {status:"item created successfully",callback:callbacks});
//         console.log(callbacks);
//     }).catch(next);

// });


//post
studentRoutes.post('/students',(req, res)=>{
    const dbConnect = dbo.getDb();
    student.collection('students').create({
        _id: req.body.id,
        first_name: req.body.firstname, 
        last_name: req.body.lastname,
        age: req.body.age
    }).then((callbacks)=>{
        res.json( {status:"item created successfully",callback:callbacks});
        console.log(callbacks);
    }).catch(next);

    // const newStudentDocument = {
    //     _id: req.body.id,
    //     first_name: req.body.firstname, 
    //     last_name: req.body.lastname,
    //      age: req.body.age
    // }
    
    // dbConnect
    // .collection('students')
    // .insertOne(newStudentDocument, function(err, result){
    //     if(err){
    //         res.status(400).send('Error inserting new student!');
    //     }else{
    //         console.log('Added a new student with if'+result.insertedId);
    //         res.status(200).send();
    //     }
    // });
});

//get 
studentRoutes.get('/students', (req, res)=>{
    // const dbConnect = dbo.getDb();
    student
    .collection('students')
    .find({})
    .limit(50)
    .toArray(function(err, result){
        if(err){
            res.status(400).send('Error fetching students!');
        }else{
            res.json(result);
        }

    });
});


//put
studentRoutes.route('/students/:id').put(function(req, res){
    const dbConnect = dbo.getDb();
    const filter = {_id: req.params.id};
    const update = {
        $set:
        {
            "first_name": req.body.firstname,
            "last_name": req.body.lastname,
            "age":req.body.age
        }
    };
    
    dbConnect
    .collection('students')
    .updateOne(filter,update, function(err, result){
        if(err){
            res.status(400).send('Error updating student with id ' + filter._id);
        }else{
            console.log('Student Updated');
            res.status(200).send();
        }
    });
});


//delete
studentRoutes.route('/students/:id').delete((req, res)=>{
    const dbConnect = dbo.getDb();

    const filter = {_id: req.params.id};
    
    dbConnect
    .collection('students')
    .deleteOne(filter, function(err, result){
        if(err){
            res.status(400).send('Error deleting students with id ' + filter._id);
        }else{
            console.log('1 document deleted');
            res.status(204).send();
        }
    });
});


module.exports=studentRoutes;