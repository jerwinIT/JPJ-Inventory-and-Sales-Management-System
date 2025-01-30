const express = require('express');
const router = express.Router();


//LOGIN SYSTEM
const { getCred, register, login, protected, logout, changePassword, deleteAccount, registerUser, getCredUser, deleteAccountUser, changePasswordUser } = require('../ClientControllers/authen');
const { validationMiddleware } = require('../ClientMiddleware/validations-middleware');
const { registerValidation, loginValidation, changePasswordValidation, deleteAccountValidation, registerValidationUser } = require('../ClientValidators/authen');
const { userAuth } = require('../ClientMiddleware/auth-middleware');

//Route to get cred
router.get('/get-cred', getCred);

//Route to get cred
router.get('/get-cred-user', getCredUser);

//Protected route
router.get('/protected', userAuth, protected);

//Route to registration
router.post('/register', registerValidation, validationMiddleware, register);

//Route to registration
router.post('/register-user', registerValidationUser, validationMiddleware, registerUser);

//Route to login
router.post('/login', loginValidation, validationMiddleware, login);

//Route to logout
router.post('/logout', logout);

//route to change password
router.post('/change-password', changePasswordValidation, changePassword);

//route to change password
router.post('/change-password-user', changePasswordValidation, changePasswordUser);

//route to delete account
router.delete('/delete-account', deleteAccountValidation, deleteAccount)

//route to delete account
router.delete('/delete-account-user', deleteAccountValidation, deleteAccountUser
    
)



//INVENTORY MANAGEMENT SYSTEM
const { getProduct, addProduct, removeProduct, searchProduct, sellProduct, updateProductQuantity, updateProductPrice, InventorySalesRecord, DailySalesRecord, MonthlySalesRecord, getDailySalesRecord, getMonthlySalesRecord, deleteDailySalesRecord, deleteMonthlySalesRecord, deleteInventorySalesRecord} = require('../ClientControllers/invms');
const { addProductValidator, removeProductValidator, searchProductValidator, sellProductValidator, updateProductStockLevelValidator, updateProductPriceValidator, targetDateValidator, startDateValidator, endDateValidator, removeDailySalesRecordValidator, removeMonthlySalesRecordValidator, deleteInventorySalesRecordValidator } = require('../ClientValidators/inventoryChecker');

//Route to display product informations
router.get('/get-product', getProduct)

//Route to display inventory sales record
router.get('/sales-record', InventorySalesRecord)

//Route to display daily sales record
router.get('/get-daily-record', getDailySalesRecord)

//Route to display daily sales record
router.get('/get-monthly-record', getMonthlySalesRecord)

//Route to search specific product
router.post('/search-product', searchProductValidator, validationMiddleware, searchProduct)

//Route to add product
router.post('/add-product', addProductValidator, validationMiddleware, addProduct)
 
//Route to removing product
router.delete('/remove-product', removeProductValidator,  removeProduct)

//Route to sell product
router.post('/sell-product', sellProductValidator, sellProduct);

//Route to update product stock level
router.put('/update-stock', updateProductStockLevelValidator, updateProductQuantity)

//Route to update product price
router.put('/update-price', updateProductPriceValidator, updateProductPrice)

// Route to generate daily sales record
router.post('/daily-record', targetDateValidator, DailySalesRecord);

// Route to generate monthly sales record
router.post('/monthly-record', startDateValidator, endDateValidator, MonthlySalesRecord);

//Route to remove daily sales record
router.delete('/remove-daily-sales', removeDailySalesRecordValidator, deleteDailySalesRecord)

//Route to remove daily sales record
router.delete('/remove-monthly-sales', removeMonthlySalesRecordValidator, deleteMonthlySalesRecord)

//Route to delete inventory sales record
router.delete('/delete-inventory-sales', deleteInventorySalesRecordValidator, deleteInventorySalesRecord)







module.exports = router;