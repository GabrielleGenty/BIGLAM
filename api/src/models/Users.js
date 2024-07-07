import Query from "./Query.js";
import bcrypt from "bcrypt";  

class Users {
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

    static async add(firstname, lastname, email, isAdmin, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const query = `INSERT INTO users (firstname, lastname, email,isAdmin, password) VALUES(?, ?, ?, ?, ?)`;
            await Query.runWithParams(query, [firstname, lastname, email, isAdmin, hashedPassword]);
        } catch (error) {
            console.error("Error adding new user:", error.message);
            throw new Error("Database insert error");
        }
    }
}

export default Users;