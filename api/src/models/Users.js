import Query from "./Query.js";


class Users {

    static async getAll(){
 
        return await Query.run(`SELECT id, firstname, lastname, email,
            createdDate FROM users ORDER BY id DESC LIMIT 50`);
      
   };
    static async getByEmail(email) {
        const query = `SELECT * FROM users WHERE email = ?`;
        try {
            const [existingUser] = await Query.runWithParams(query, [email]);
            return existingUser;
        } catch (error) {
            console.error("Error fetching user by email:", error.message);
            throw new Error("Database query error");
        }
    }

    static async add(req) {
        try {
            await Query.runWithParams(`INSERT INTO users 
                ( firstname,
                  lastname,
                  email,
                  isAdmin,
                  password,
                  CreatedDate) VALUES(?, ?, ?, ?,?,NOW())`, req.body);

        } catch (error) {
            console.error("Error adding new user:", error.message);
            throw new Error("Database insert error");
        }
    }
}

export default Users;