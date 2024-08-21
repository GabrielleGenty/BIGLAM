import Query from "../models/Query.js";
import Orders from "../models/Orders.js"
import pool from "../config/db.js";

const getAll = async (req, res) => {
    try {
        const response = await Orders.getAll();
        res.json({ msg: "Je suis sur la route API pour récupérer TOUS les orders !", response });
    } catch (error) {
        res.status(500).json({ message: "Erreur de serveur" });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
       const response = await Orders.getById(id);
        if (!response) return res.status(404).json({ message: "order non trouvé" });
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: "Erreur de serveur", error: error.message });
    }
};
const getUserOrders = async (req, res) => {
    try {
        const userEmail = req.params.email;
        const orders = await Orders.getByUserEmail(userEmail);

        if (!orders.length) {
            return res.status(404).json({ message: "Aucune commande trouvée pour cet utilisateur." });
        }

        res.json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Erreur de serveur", error: error.message });
    }
};

const add = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        //pour optimiser les performances , on peut utiliser une "transaction" 
        //pour éveter avoir une commande sans details 
        //on doit enregistrer la commande et les details de la commande en meme temps le lien entre eux c'est l'id
        //on commence par recuperer une connexion unique à la base de données

        
        //on démarre la transaction 
        await connection.beginTransaction();

        const queryOrder = `INSERT INTO orders (orderedDate, totalPrice, status, users_id)
         VALUES (NOW(), ?, ?, ?)`;
     
        const dataOrder = [req.body.totalPrice, req.body.status, req.session.user.id];

        const resultOrder = await Query.runWithParams(queryOrder, dataOrder, connection);
        const orderId = resultOrder.insertId;

        const queryOrderDetails = `INSERT INTO order_details (quantity, priceEach, orders_id, products_id) VALUES (?, ?, ?, ?)`;
        console.log(req.body.order_details)

        //pour chaque produit de la commande,il va falloir insérer une ligne dans la table order_detail
        for (const product of req.body.order_details) {
            const dataOrderDetail = [
                product.quantity,
                product.priceEach,
                orderId,
                product.products_id
            ];
            await Query.runWithParams(queryOrderDetails, dataOrderDetail, connection);
        
            }

        await connection.commit();
        res.json({ message: "Commande bien enregistrée !" });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ message: "Erreur de serveur", error: error.message });
    } finally {
        connection.release();
    }
};
const update= async (req,res) =>{
    
    console.log("UPDATE",req.body)
    try{

        const response = await  Orders.update(req);

        res.json({ msg: "Le Status de l'Order a été modifié avec succès" ,response });
    } catch (error) {

        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
         await Orders.deleteOrder(id);
        res.json({ message: "L'order a été supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

export { getAll, getById, getUserOrders , add, update,deleteOrder };