import Query from "./Query.js";

class Orders{
    static async getAll(){
       
        return await Query.run(`SELECT orders.id,orders.orderedDate, orders.totalPrice,orders.status, 
         users_id AS users_id ,users.firstname, users.lastname, users.email
         FROM orders
         INNER join users ON
         orders.users_id = users.id
         WHERE orders.id ORDER BY orderedDate ASC`);
    };  
    static async getById(id){

        return await Query.runWithParams(`SELECT id, orderedDate, totalPrice, status,
        users_id FROM orders WHERE orders.id = ?`, [id]);
        
    };
    static async deleteOrder(id){
       
        return await Query.runWithParams(`DELETE FROM orders WHERE id = ?`, [id]);
       
    };

}

export default Orders;