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
   static async getByUserEmail(email) {
        // Requête SQL avec jointure pour récupérer les commandes et les détails en une seule requête
        const ordersQuery = `
                     SELECT 
                orders.id, 
                orders.orderedDate, 
                orders.totalPrice, 
                orders.status,
                order_details.quantity, 
                order_details.priceEach,
                products.picture AS product_img,
                products.title AS product_name
            FROM orders
            INNER JOIN users ON orders.users_id = users.id
            INNER JOIN order_details ON orders.id = order_details.orders_id
            INNER JOIN products ON order_details.products_id = products.id
            WHERE users.email = ?
            ORDER BY orders.orderedDate DESC  
        `;

        // Récupération des commandes avec détails
        const rows = await Query.runWithParams(ordersQuery, [email]);

        // Organiser les données pour que chaque commande ait un tableau de détails
        const ordersMap = new Map();

        rows.forEach(row => {
            const { id, orderedDate, totalPrice, status, quantity, priceEach, product_img, product_name } = row;

            if (!ordersMap.has(id)) {
                ordersMap.set(id, {
                    id,
                    orderedDate,
                    totalPrice,
                    status,
                    details: []
                });
            }

            ordersMap.get(id).details.push({
                product_name,
                quantity,
                priceEach,
                product_img
            });
        });

        // Convertir les commandes en tableau
        const orders = Array.from(ordersMap.values());

        return orders;
    }
    static async update(req){
      
        const { id }= req.params;
       return await Query.runWithParams(
        `UPDATE orders 
        SET 
            status = ? 
        WHERE orders.id = ?`,{...req.body,id});
   
    };
    static async deleteOrder(id){
       
        return await Query.runWithParams(`DELETE FROM orders WHERE id = ?`, [id]);
       
    };

}

export default Orders;