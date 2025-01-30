import axios from 'axios'
axios.defaults.withCredentials = true


export async function getProduct(){
    return await axios.get(
        'http://localhost:9000/api/user/get-product', 
    )
}

export async function sellProduct(sellProductData){
    return await axios.post(
        'http://localhost:9000/api/user/sell-product', sellProductData
    )
}

export async function InventorySalesRecord(){
    return await axios.get(
        'http://localhost:9000/api/user/sales-record', 
    )
}

export async function searchProduct(itemName){
    return await axios.post(
        'http://localhost:9000/api/user/search-product', itemName
    )
}

export async function deleteDailySalesRecord(targetDate){
    return await axios.delete(
        'http://localhost:9000/api/remove-daily-sales', 
        {data:{targetDate:targetDate}}
    )
}

export async function deleteMonthlySalesRecord(startDate, endDate){
    return await axios.delete(
        'http://localhost:9000/api//remove-monthly-sales', 
        { data: { startDate: startDate, endDate: endDate } }
    )
}
