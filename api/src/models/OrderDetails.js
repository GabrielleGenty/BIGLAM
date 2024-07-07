import Query from "./Query.js";

class OrderDetails{
    static async getAll(){
        const query =`SELECT id, quantity, priceEach, orders_id, products_id FROM order_details`;
        const response =await Query.run(query);
        return response;
    }; 
    static async getById(req){
       const {id} = req.params;
       const query =`SELECT id , quantity, priceEach, orders_id, products_id FROM order_details Where order_details.id =?`;
       const response =await Query.runWithParams(query,[id]);
       return response;
    };
    static async deleteOrderDetails(req){
        const {id}=req.params;
    const query=`DELETE FROM order_details WHERE order_details.id =?`;
    const response = await Query.runWithParams(query,[id]);
    return response; 
    }
}

export default OrderDetails;