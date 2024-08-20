import Query from "./Query.js";


class Products{
    static async getAll(){
 
         return await Query.run(`SELECT id, title, subTitle, status, picture, alt, description, price ,
        ref, quantityInStock,categories_id FROM products ORDER BY id DESC LIMIT 50`);
       
    };
    static async getById(id){

            return await Query.runWithParams(`SELECT id, title, subTitle, status, picture, alt, description, price,
         ref, quantityInStock, categories_id FROM products WHERE id = ?`, [id]);
        
    };
    static async getByCategoryId(id){

        return await Query.runWithParams(
            `SELECT id, title, subTitle, status, picture, alt, description, price, ref, quantityInStock, categories_id 
            FROM products 
            WHERE categories_id = ?`,
            [id]
          );
    
};
    static async add(req){
       
        return await Query.runWithParams(`INSERT INTO products 
            (title,
             subTitle,
             status,
             picture,
             alt,
              description, 
              price, 
              ref,
               quantityInStock, 
               categories_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, req.body);
    };
    
    static async update(req){
      
        const { id }= req.params;
       return await Query.runWithParams(
        `UPDATE products 
        SET title = ?, 
            subTitle = ?, 
            status =?,
            picture =?,
            alt = ?,
            description = ?, 
            price = ?, 
            ref = ?, 
            quantityInStock = ?, 
            categories_id = ? 
        WHERE products.id = ?`,{...req.body,id});
   
    };
    static async deleteProduct(id){
    
        return await Query.runWithParams(`DELETE FROM products  WHERE products.id=?`, [id]);
    };

}

export default Products;