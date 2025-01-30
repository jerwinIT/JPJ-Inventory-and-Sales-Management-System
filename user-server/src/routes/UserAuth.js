const express = require('express');
const routerUser = express.Router();

//LOGIN SYSTEM
const { login, protected, logout, getCredUser  } = require('../UserControllers/authen');
const { validationMiddleware } = require('../UserMiddleware/validations-middleware');
const { loginValidation  } = require('../UserValidators/authen');
const { userAuthen } = require('../UserMiddleware/auth-middleware');

//Route to login
routerUser.post('/login', loginValidation, validationMiddleware, login);

//Protected route
routerUser.get('/protected-user', userAuthen, protected);

//Route to logout
routerUser.post('/logout', logout);

    

//INVENTORY MANAGEMENT SYSTEM
const { getProduct, searchProduct, sellProduct, InventorySalesRecord, DailySalesRecord, MonthlySalesRecord, getDailySalesRecord, getMonthlySalesRecord, deleteDailySalesRecord, deleteMonthlySalesRecord} = require('../UserControllers/invms');
const { searchProductValidator, sellProductValidator, targetDateValidator, startDateValidator, endDateValidator, removeDailySalesRecordValidator, removeMonthlySalesRecordValidator } = require('../UserValidators/inventoryChecker');

//Route to display product informations
routerUser.get('/get-product', getProduct)

//Route to display inventory sales record
routerUser.get('/sales-record', InventorySalesRecord)

//Route to display daily sales record
routerUser.get('/get-daily-record', getDailySalesRecord)

//Route to display daily sales record
routerUser.get('/get-monthly-record', getMonthlySalesRecord)

//Route to search specific product
routerUser.post('/search-product', searchProductValidator, validationMiddleware, searchProduct)

//Route to sell product
routerUser.post('/sell-product', sellProductValidator, sellProduct);

// Route to generate daily sales record
routerUser.post('/daily-record', targetDateValidator, DailySalesRecord);

// Route to generate monthly sales record
routerUser.post('/monthly-record', startDateValidator, endDateValidator, MonthlySalesRecord);

// //Route to remove daily sales record
// routerUser.delete('/remove-daily-sales', removeDailySalesRecordValidator, deleteDailySalesRecord)

// //Route to remove daily sales record
// routerUser.delete('/remove-monthly-sales', removeMonthlySalesRecordValidator, deleteMonthlySalesRecord)







module.exports = routerUser;