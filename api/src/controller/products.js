import Products from "../models/Products.js";
import Query from "../models/Query.js";
import upload from "../config/multer.js";  // Importez multer

// on passe la callback en async pour pouvoir utiliser await, approche moderne. 
// (sinon on aurait pu utiliser .then() et .catch())

const getAll = async (req,res)=>{
     // on encapsule le code dans un bloc try catch pour gérer les erreurs
    try{
      
        const response =await Products.getAll();
        res.json({msg :"Je suis sur la route API pour récupérer TOUS les produits !",
            response,

        });
    } catch (error){
        
        res.status(500).json({message: "Erreur de serveur"});
    }
};
const getById =async (req,res)=>{
    try{
        const { id } = req.params;
        const response = await Products.getById(id);
        if(!response) return res.status(404).json({message: "Produit nontrouvé"});
        res.json(response[0]);
    }catch (error){
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });

    }
};
const getByCategoryId= async (req,res)=>{
    try{
        const { id:categoryId} = req.params;
        const response = await Products.getByCategoryId(categoryId);
        if(!response) return res.status(404).json({message: "Produit nontrouvé"});
        res.json(response);
    }catch (error){
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });

    }
};
const add = async (req,res)=>{
   
    console.log("ADD",req.body);
    try {
		upload(req, res, async function (error) {
			if (error) {
				return res.status(400).json({ message: error });
			}
			if (!req.file) {
				return res
					.status(400)
					.json({
						message:
							"Veuillez sélectionner une image au format webp",
					});
			}

			const product = {
				...req.body,
				picture: req.file.originalname,
			};
            console.log(product)
			const query = `INSERT INTO products 
            (title,
             subTitle,
             status,
             alt,
              description, 
              price, 
              ref,
               quantityInStock, 
               categories_id,
             picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
			const response = await Query.runWithParams(query, product);

			if (response) {
				res.json({
					msg: "Les données ont bien été insérées !",
					response,
				});
			}
		});
	} catch (error) {
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
	}
    
};
const update= async (req,res) =>{
    
    console.log("UPDATE",req.body)
    try{

        const response = await Products.update(req);

        res.json({ msg: "Le produit a été modifié avec succès" ,response });
    } catch (error) {

        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};
const deleteProduct= async (req,res)=>{
    console.log("DELETE",req.body)
    try{
        const { id } = req.params;
         await Products.deleteProduct(id);
        res.json({ msg: "Le produit a été supprimé avec succès" });
    }catch (error) {
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};
export { getAll, getById,getByCategoryId, add, update ,deleteProduct };