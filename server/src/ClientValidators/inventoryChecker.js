const { check } = require('express-validator')
const db = require('../db')


//itemName
const itemName  = check('item_name')
    .isLength({min: 3, max: 50})
    .withMessage('Invalid Input')

// itemNumber
const itemNumber = check('item_number')
    .isInt({ min: 1 })
    .withMessage('Invalid Item Number');

// stock_level
const stock_level = check('stock_level')
.isInt({ min: 1 })
.withMessage('Invalid stock_level');

//check if product exists
const productExist = check('item_name').custom(async (value) => {
    const { rows } = await db.query('SELECT * FROM jpj_inventory_table WHERE item_name = $1', 
    [value]);

    if (rows.length) {
        throw new Error('Product already exists.');
    }
});


//add product validator
const addProductValidator = [itemName, productExist]

//remove product validator
const removeProductValidator = [itemNumber, productExist];

//search product validator
const searchProductValidator = [itemName];

//sell product validator
const sellProductValidator = [itemName, stock_level, productExist];

//update product stock level validator
const updateProductStockLevelValidator = [itemName, stock_level, productExist];

//update product price validator
const updateProductPriceValidator = [
    itemName,
    check('new_price')
        .isNumeric()
        .withMessage('Invalid price format')
        .custom((value, { req }) => {
            if (parseFloat(value) <= 0) {
                throw new Error('Price must be greater than zero');
            }
            return true;
        })
        .withMessage('Price must be greater than zero'),
    productExist
];

// target date validator
const targetDateValidator = check('targetDate')
    .isISO8601()
    .toDate({ format: 'YYYY-MM-DD' })
    .withMessage('Invalid date format. Use YYYY-MM-DD.');

// start date validator
const startDateValidator = check('startDate')
.isISO8601()
.toDate({ format: 'YYYY-MM-DD' })
.withMessage('Invalid start date format. Use YYYY-MM-DD.');

// end date validator
const endDateValidator = check('endDate')
.isISO8601()
.toDate({ format: 'YYYY-MM-DD' })
.withMessage('Invalid end date format. Use YYYY-MM-DD.');

// remove daily sales record validator
const removeDailySalesRecordValidator = [targetDateValidator];

// remove monthly sales record validator
const removeMonthlySalesRecordValidator = [startDateValidator, endDateValidator];

// validators for delete inventory sales record
const deleteInventorySalesRecordValidator = [
    check('saleDate')
        .isISO8601()
        .toDate({ format: 'YYYY-MM-DD' })
        .withMessage('Invalid sale date format. Use YYYY-MM-DD.')
];


module.exports = {
    addProductValidator: addProductValidator,
    removeProductValidator: removeProductValidator,
    searchProductValidator : searchProductValidator,
    sellProductValidator: sellProductValidator,
    updateProductStockLevelValidator: updateProductStockLevelValidator,
    updateProductPriceValidator: updateProductPriceValidator,
    targetDateValidator: targetDateValidator,
    startDateValidator: startDateValidator,
    endDateValidator: endDateValidator,
    removeDailySalesRecordValidator: removeDailySalesRecordValidator,
    removeMonthlySalesRecordValidator: removeMonthlySalesRecordValidator,
    deleteInventorySalesRecordValidator: deleteInventorySalesRecordValidator
   
    
}