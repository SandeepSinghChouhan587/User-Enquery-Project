const express = require('express');
const router = express.Router();
const {Students} = require('../../models/student.model');


router.get('/read',async (req,res) => {
       let Data = await  Students.find();
       let resobj = {
        "status":1,
        message:"Students List",
        Data
       }
        res.send(resobj);
});

router.post('/insert',async (req,res) => {
        let obj = {
            name:req.body.name,
            email:req.body.email
        }
       
       let insertRes = await  Students.insertOne(obj).catch(err=>{
        res.send("Enter unique email it already exists")
        return
       });
       let resobj = {
        "status":1,
        "message":"Data Insert",
        insertRes
       }
        res.send(resobj);
});

router.post('/update',async (req,res) => {
       let obj = {};
       if(req.body.name !== "" && req.body.name !== undefined && req.body.name !== null){
                obj["name"] = req.body.name;
       }
       if(req.body.email !== "" && req.body.email !== undefined && req.body.email !== null){
                obj["email"] = req.body.email;
       }
       console.log(obj);
        let updateres = await Students.updateOne({_id:req.body.id},{$set:obj}).catch(err=>{
        res.send("Enter unique email it already exists")
        return
       });
        let resobj ={
                "status":1,
                "message":"Data Updated",
                updateres
        }
        res.send(resobj);
})

router.delete('/delete/:id',async (req,res) => {
        let updateres = await Students.deleteOne({_id:req.params.id});
        let resobj ={
                "status":1,
                "message":"Data Deleted",
                updateres
        }
        res.send(resobj);
})


module.exports = router;
