const express = require('express');
const enqueryModel = require('../../models/enquery.model');


const insertEnquery = async (req, res) => {
    const { name, email, phone, message } = req.body;
    const createddoc = new enqueryModel({
        name, email, phone, message
    })
    createddoc.save().then(() => {
        res.json({ status: 1, message: "INsert Successfull!", createddoc })
    }).catch((err) => {
        res.json({ status: 0, messsage: "INsert Failed!!", error: err })
    });
};

const listQuery = async (req, res) => {
    const enquerylist = await enqueryModel.find();
    res.status(200).json({ status: 1, message: "Enquery List..", list: enquerylist })
}

const delteEnquery = async (req, res) => {
    const queryId = req.params.id;
    const deletedQuery = await enqueryModel.deleteOne({ _id: queryId });
    res.status(200).json({ status: 1, message: "Enquery Deleted Successfully..", id: queryId, data: deletedQuery })
}

const updateEnquiery = async (req, res) => {
    const queryId = req.params.id;
    const { name, email, phone, message } = req.body;
    const updatedquery = await enqueryModel.updateOne({ _id: queryId }, { name, email, phone, message }).catch((err) => {
        res.send({ status: 0, message: "Enquery Not Updated....", Error: err })
    });
    res.status(200).json({ status: 1, message: "Enquery Updated Successfully..", id: queryId, data: updatedquery })
}

const enquerySingleRow = async (req,res) => {
    let enId = req.params.id;
    let enquery = await enqueryModel.findOne({_id:enId});
    res.send({status:1,enquery});
}



module.exports = { insertEnquery, listQuery, delteEnquery, updateEnquiery ,enquerySingleRow}








