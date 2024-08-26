import Categories from "../models/Categories.js";

const getAll = async (req,res) =>{
    
    try{
        const response = await Categories.getAll();
        console.log(response);
        res.json({msg :"Je suis sur la route API pour récupérer TOUS les categories !",response,

        });
    } catch(error){
        res.status(500).json({message:"Erreur de serveur"})
    }
};
const getById = async(req,res)=>{

    try{
      const {id}= req.params;
      const response = await Categories.getById(id);
      if(!response) return res.status(404).json({message: "Categories nontrouvé"});
      res.json(response);
    } catch (error){
        res.status(500).json({message :"Erreur de serveur", error: error.message });
    }
   
};
const add =async (req,res)=>{

    try {
        const response = await Categories.add(req);
        res.status(201).json({
            message: "La catégorie a été ajoutée avec succès.",
            response
        });
    } catch (error) {
        res.status(500).json({
            message: "Erreur de serveur lors de l'ajout de la catégorie.",
            error: error.message
        });
    }
};
const update = async (req,res) =>{
    console.log("UPDATE",req.body)

    try{
       
        const response = await Categories.update(req);
        res.json({message :"la category a été modifié",response});

    } catch (error){
        res.status(500).json({message:"Erreur de serveur",error: error.message});
    }
};
const deleteCategory = async (req,res)=>{

    try{
        const {id} =req.params;
         await Categories.deleteCategory(id);
        res.json({message:"la catégory a été suprimée avec succès"});

    } catch (error){
        res.status(500).json({msg:"error de serveur",error: error.message});

    }
};
export {getAll, getById, add, update, deleteCategory};