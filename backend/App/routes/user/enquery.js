const express = require('express');
const router = express.Router();
const { insertEnquery, listQuery, delteEnquery, updateEnquiery , enquerySingleRow} = require('../../controllers/user/userEnqueryController');


router.post('/insert', insertEnquery);

router.get('/list', listQuery);

router.get('/delete/:id', delteEnquery);

router.put('/update/:id', updateEnquiery);

router.get('/single/:id', enquerySingleRow);

module.exports = router