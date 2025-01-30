import axios from 'axios'
axios.defaults.withCredentials = true

//API - inventory and sales management system
export async function addProduct(addProductData){
    return await axios.post(
        'http://localhost:8000/api/client/add-product', addProductData
    )
}

export async function getProduct(){
    return await axios.get(
        'http://localhost:8000/api/client/get-product', 
    )
}

export async function InventorySalesRecord(){
    return await axios.get(
        'http://localhost:8000/api/client/sales-record', 
    )
}


export async function removeProduct(itemNumber){
    return await axios.delete(
        'http://localhost:8000/api/client/remove-product',
        { data: { item_number: itemNumber } }
    );
}

export async function searchProduct(itemName){
    return await axios.post(
        'http://localhost:8000/api/client/search-product', itemName
    )
}

export async function sellProduct(sellProductData){
    return await axios.post(
        'http://localhost:8000/api/client/sell-product', sellProductData
    )
}

export async function updateStock(updateStockData){
    return await axios.put(
        'http://localhost:8000/api/client/update-stock', updateStockData
    )
}

export async function updatePrice(updatePriceData){
    return await axios.put(
        'http://localhost:8000/api/client/update-price', updatePriceData
    )
}

export async function DailySalesRecord(DailySalesRecord){
    return await axios.post(
        'http://localhost:8000/api/client/daily-record', DailySalesRecord
    )
}

export async function getDailySalesRecord(){
    return await axios.get(
        'http://localhost:8000/api/client/get-daily-record', 
    )
}


export async function MonthlySalesRecord(MonthlySalesRecord){
    return await axios.post(
        'http://localhost:8000/api/client/monthly-record', MonthlySalesRecord
    )
}

export async function getMonthlySalesRecord(){
    return await axios.get(
        'http://localhost:8000/api/client/get-monthly-record', 
    )
}

export async function deleteDailySalesRecord(targetDate){
    return await axios.delete(
        'http://localhost:8000/api/client/remove-daily-sales', 
        {data:{targetDate:targetDate}}
    )
}

export async function deleteMonthlySalesRecord(startDate, endDate){
    return await axios.delete(
        'http://localhost:8000/api/client/remove-monthly-sales', 
        { data: { startDate: startDate, endDate: endDate } }
    )
}
export async function deleteInventorySalesRecord(saleDate){
    return await axios.delete(
        'http://localhost:8000/api/client/delete-inventory-sales', 
        { data: { saleDate:saleDate } }
    )
}