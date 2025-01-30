const db = require('../db')


//INVENTORY MANAGEMENT SYSTEM
//displaying product list
exports.getProduct = async (req, res) => {
    try {
        const { rows } = await db.query('select * from jpj_inventory_table');
        return res.status(200).json({
            success: true,
            users: rows,
        })
    } catch (error) {
        console.log(error.message)
    }
}



//adding new product
exports.addProduct = async (req, res) => {
    const { item_name, price, product_line_mmi_id_fk, motor_id_fk, stock_level, reorder_point, ceiling_level, floor_level } = req.body;
    try {
        await db.query('INSERT INTO jpj_inventory_table (item_name, price, product_line_mmi_id_fk, motor_id_fk, stock_level, reorder_point, ceiling_level, floor_level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
        [item_name, price, product_line_mmi_id_fk, motor_id_fk, stock_level, reorder_point, ceiling_level, floor_level]);
        return res.status(201).json({
            success: true,
            message: 'Product Added!'
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message
        });
    }
};


//remove product
exports.removeProduct = async (req, res) => {
    const { item_number } = req.body;
    try {
        // Check if the product exists
        const { rowCount } = await db.query('DELETE FROM jpj_inventory_table WHERE item_number = $1', [item_number]);
        
        if (rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Product not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product removed successfully.'
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        });
    }
};




// search product
exports.searchProduct = async (req, res) => {
    const { item_name } = req.body;
    try {
        const { rows } = await db.query('SELECT * FROM jpj_inventory_table WHERE item_name ILIKE $1', [`%${item_name}%`]);
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No products found for the specified item name.'
            });
        }
        return res.status(200).json({
            success: true,
            products: rows,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        });
    }
};



//sell product
exports.sellProduct = async (req, res) => {
    const { item_name, stock_level } = req.body;
    try {
        // Check if the product exists in the inventory
        const getProductQuery = 'SELECT * FROM jpj_inventory_table WHERE item_name = $1';
        const { rows: [product] } = await db.query(getProductQuery, [item_name]);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found in the inventory.'
            });
        }

        // Check if there's enough stock_level to sell
        if (product.stock_level < stock_level) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock_level in stock.'
            });
        }

        // Calculate total price
        const totalPrice = stock_level * product.price;

        // Deduct sold stock_level from inventory
        const updatedstock_level = product.stock_level - stock_level;

        // Update product inventory
        const updateInventoryQuery = 'UPDATE jpj_inventory_table SET stock_level = $1 WHERE item_name = $2';
        await db.query(updateInventoryQuery, [updatedstock_level, item_name]);

        // Record the sale in inventory sales record
        const recordSaleQuery = `
            INSERT INTO inventory_sales_record (sale_date, item_name, stock_level, total_price) 
            VALUES (CURRENT_TIMESTAMP, $1, $2, $3)
        `;
        await db.query(recordSaleQuery, [item_name, stock_level, totalPrice]);

        return res.status(200).json({
            success: true,
            message: 'Product sold successfully.',
            totalPrice: totalPrice
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        });
    }
};

// Update product quantity/stock
exports.updateProductQuantity = async (req, res) => {
    const { item_name, stock_level } = req.body;
    try {
        // Check if the product exists in the inventory
        const getProductQuery = 'SELECT * FROM jpj_inventory_table WHERE item_name = $1';
        const { rows: [product] } = await db.query(getProductQuery, [item_name]);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found in the inventory.'
            });
        }

        // Update product inventory with the provided stock level
        const updateInventoryQuery = 'UPDATE jpj_inventory_table SET stock_level = $1 WHERE item_name = $2';
        await db.query(updateInventoryQuery, [stock_level, item_name]);

        return res.status(200).json({
            success: true,
            message: 'Product quantity updated successfully.',
            updatedStockLevel: stock_level
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        });
    }
};


//update product price
exports.updateProductPrice = async (req, res) => {
    const { item_name, new_price } = req.body;
    try {
        // Check if the product exists in the inventory
        const getProductQuery = 'SELECT * FROM jpj_inventory_table WHERE item_name = $1';
        const { rows: [product] } = await db.query(getProductQuery, [item_name]);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found in the inventory.'
            });
        }

        // Update product price
        const updatePriceQuery = 'UPDATE jpj_inventory_table SET price = $1 WHERE item_name = $2';
        await db.query(updatePriceQuery, [new_price, item_name]);

        return res.status(200).json({
            success: true,
            message: 'Product price updated successfully.',
            newPrice: new_price
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        });
    }
};

//generate daily record
exports.DailySalesRecord = async (req, res) => {
    const { targetDate } = req.body; // Assuming you pass the target date in the request body

    try {
        // Query to get total sales for the specified day
        const query = `
            SELECT 
                sale_date::date AS sales_date,
                SUM(total_price) AS total_sales
            FROM 
                inventory_sales_record
            WHERE 
                sale_date::date = $1
            GROUP BY 
                sale_date::date;
        `;
        
        // Execute the query
        const { rows } = await db.query(query, [targetDate]);
        
        // Check if any sales record exists for the specified day
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No sales record found for the specified day.'
            });
        }
        
        // Insert the daily sales record into daily_record table
        const insertDailyRecordQuery = `
            INSERT INTO daily_record (record_date, total_sales)
            VALUES ($1, $2)
        `;
        await db.query(insertDailyRecordQuery, [targetDate, rows[0].total_sales]);

        // Return the total sales for the specified day
        return res.status(200).json({
            success: true,
            totalSales: rows[0].total_sales,
            salesDate: rows[0].sales_date
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        });
    }
};

//retrieve daily sales record
exports.getDailySalesRecord = async (req, res) => {
    try {
        const { rows } = await db.query('select * from daily_record');
        return res.status(200).json({
            success: true,
            users: rows,
        })
    } catch (error) {
        console.log(error.message)
    }
}

//removing daily sales record
exports.deleteDailySalesRecord = async (req, res) => {
    const { targetDate } = req.body;

    try {
        // Check if the daily sales record exists for the specified targetDate
        const checkQuery = `
            SELECT * FROM daily_record
            WHERE record_date = $1;
        `;
        const { rows } = await db.query(checkQuery, [targetDate]);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No daily sales record found for the specified date.'
            });
        }

        // Delete the daily sales record for the specified targetDate
        const deleteQuery = `
            DELETE FROM daily_record
            WHERE record_date = $1;
        `;
        await db.query(deleteQuery, [targetDate]);

        return res.status(200).json({
            success: true,
            message: 'Daily sales record deleted successfully.'
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        });
    }
};





//generate monthly_record
exports.MonthlySalesRecord = async (req, res) => {
    const { startDate, endDate } = req.body; // Assuming you pass the start date and end date in the request body

    try {
        // Query to get total sales for the specified date range
        const query = `
            SELECT 
                SUM(total_price) AS total_sales
            FROM 
                inventory_sales_record
            WHERE 
                sale_date::date >= $1 AND sale_date::date <= $2;
        `;
        
        // Execute the query
        const { rows } = await db.query(query, [startDate, endDate]);

        // Check if any sales records exist for the specified date range
        if (!rows[0].total_sales) {
            return res.status(404).json({
                success: false,
                message: 'No sales records found within the specified date range.'
            });
        }
        
        // Insert the monthly sales record into monthly_record table
        const insertMonthlyRecordQuery = `
            INSERT INTO monthly_record (start_date, end_date, total_sales)
            VALUES ($1, $2, $3)
        `;
        await db.query(insertMonthlyRecordQuery, [startDate, endDate, rows[0].total_sales]);

        // Return the total sales for the specified date range
        return res.status(200).json({
            success: true,
            totalSales: rows[0].total_sales,
            startDate: startDate,
            endDate: endDate
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        });
    }
};

//retrieve monthly sales record
exports.getMonthlySalesRecord = async (req, res) => {
    try {
        const { rows } = await db.query('select * from monthly_record');
        return res.status(200).json({
            success: true,
            users: rows,
        })
    } catch (error) {
        console.log(error.message)
    }
}

//remove monthly sales record
exports.deleteMonthlySalesRecord = async (req, res) => {
    const { startDate, endDate } = req.body;

    try {
        // Delete the monthly sales record for the specified date range
        const deleteQuery = `
            DELETE FROM monthly_record
            WHERE start_date = $1 AND end_date = $2;
        `;
        await db.query(deleteQuery, [startDate, endDate]);

        return res.status(200).json({
            success: true,
            message: 'Monthly sales record deleted successfully.'
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        });
    }
};

//displaying inventory_sales_record
exports.InventorySalesRecord = async (req, res) => {
    try {
        const { rows } = await db.query('select * from inventory_sales_record');
        return res.status(200).json({
            success: true,
            users: rows,
        })
    } catch (error) {
        console.log(error.message)
    }

}

//delete function for inventory sales record based on item
exports.deleteInventorySalesRecord = async (req, res) => {
    const { saleDate } = req.body;

    try {
        // Check if any sales record exists for the specified sale date
        const checkQuery = `
            SELECT * FROM inventory_sales_record
            WHERE sale_date = $1;
        `;
        const { rows } = await db.query(checkQuery, [saleDate]);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No inventory sales record found for the specified sale date.'
            });
        }

        // Delete the inventory sales record for the specified sale date
        const deleteQuery = `
            DELETE FROM inventory_sales_record
            WHERE  sale_date = $1;
        `;
        await db.query(deleteQuery, [saleDate]);

        return res.status(200).json({
            success: true,
            message: 'Inventory sales record deleted successfully.'
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        });
    }
};