import Products from "../models/Products.js";

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
        res.json(response);
    }catch (error){
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });

    }
};
const add = async (req,res)=>{
    console.log("ADD",req.body);
    try{
        const response = await Products.add(req);
        res.json({ msg: "Les données ont bien été insérées !", response });
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
export { getAll, getById, add, update ,deleteProduct };