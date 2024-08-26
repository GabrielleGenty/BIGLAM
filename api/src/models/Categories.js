import Query from "./Query.js";

class Categories{
    static async getAll(){
       
        return await Query.run(`SELECT * FROM categories`);
     
    };
    static async getById (id){
       
        return await Query.runWithParams(`SELECT id ,label FROM categories WHERE id=?`,id);
       
    };
    static async add(req){
        const { label } = req.body; 
        return await Query.runWithParams(`INSERT INTO categories(label) VALUES (?)`, [label]);
    
    };
    static async update(req){
        const{ id } = req.params;
        return await Query.runWithParams(
        `UPDATE categories
        SET label = ?
        WHERE id = ?`,{...req.body,id});
    };
    static async deleteCategory(id){

        return await Query.runWithParams(`DELETE FROM categories WHERE id =?`,[id]);
    
    };

}

export default Categories;