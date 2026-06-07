const express = require('express');
const codeRouter = express.Router();
const userMiddelware = require('../middleware/usermiddleware');

const {runCode} = require('../controllers/usercoderun')

codeRouter.post('/run' , userMiddelware , runCode); // midllware must needed kiyuki request postman se bhi aa sakti hai 



module.exports = codeRouter;