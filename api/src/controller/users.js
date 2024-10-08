import bcrypt from "bcrypt";
import Users from "../models/Users.js";
import isAdmin from "../middlewares/isAdmin.js";

const getAll = async (req,res)=>{
    // on encapsule le code dans un bloc try catch pour gérer les erreurs
   try{
     
       const response =await Users.getAll();
       res.json({msg :"Je suis sur la route API pour récupérer TOUS les users !",
           response,

       });
   } catch (error){
       
       res.status(500).json({message: "Erreur de serveur"});
   }
};
// Vérification de l'authentification
const checkAuth = (req, res) => {
    if (req.session.user) {
        console.log("Session existante");
        res.json({ message: "Utilisateur Connecté", user: req.session.user });
    } else {
        console.log("Aucune Session User");
        res.json({ message: "Utilisateur non Connecté" });
    }
};

// Inscription d'un nouvel utilisateur
const register = async (req, res) => {
    console.log("ADD",req.body);
    try {

        const { firstname, lastname, email,isAdmin, password } = req.body;
        // Vérifier si l'utilisateur existe déjà dans la base de données
        const existingUser = await Users.getByEmail(email);
        if (existingUser) {
            // Code 409 pour indiquer un conflit
            return res.status(409).json({ message: "Cet utilisateur existe déjà" });
        
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;
        console.log(req.body);
        // Sauvegarder le nouvel utilisateur dans la base de données
        await Users.add(req);// isAdmin set to false for new users
        res.status(201).json({ message: "Inscription réussie" });

    } catch (error) {
        console.error("Error registering user:", error.message);
        res.status(500).json({ message: "Erreur de serveur" });
    }
};

// Connexion d'un utilisateur
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe dans la base de données
        const user = await Users.getByEmail(email);

        if (!user) {
            return res.status(401).json({ message: "Informations incorrectes" });
        }
        // Vérifier le mot de passe
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Informations 2 incorrectes" });
        }
        console.log(user);
        const infoUser = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email:user.email,
            isAdmin:user.isAdmin
           
        };
        //set session
        req.session.user = infoUser;
        res.status(200).json({ message: "Connexion réussie", user: infoUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur de serveur", error: error.message });
    }
};

// Déconnexion d'un utilisateur
const logout = async (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur de serveur" });
        }
            res.clearCookie(process.env.SECRET_SESSION);
            res.json({ message: "Déconnexion réussie" });
        
    });
};

export { getAll,checkAuth, register, login, logout };