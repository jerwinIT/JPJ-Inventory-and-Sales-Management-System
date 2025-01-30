const { check } = require('express-validator')
const db = require('../db')


//itemName
const itemName  = check('item_name')
    .isLength({min: 3, max: 50})
    .withMessage('Invalid Input')

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

//search product validator
const searchProductValidator = [itemName];

//sell product validator
const sellProductValidator = [itemName, stock_level, productExist];

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



module.exports = {
    searchProductValidator : searchProductValidator,
    sellProductValidator: sellProductValidator, 
    targetDateValidator: targetDateValidator,
    startDateValidator: startDateValidator,
    endDateValidator: endDateValidator,
    removeDailySalesRecordValidator: removeDailySalesRecordValidator,
    removeMonthlySalesRecordValidator: removeMonthlySalesRecordValidator
   
    
}