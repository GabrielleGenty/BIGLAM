import OrderDetails from "../models/OrderDetails.js";


const getAll = async(req,res)=>{

try{
    const response = await OrderDetails.getAll();
    console.log(response);
    res.json({msg:"je suis sur le route API pour récupérer TOUS les order_details !",response,

    });

}catch(error){
    res.status(500).json({message:"Erreur de servveur"})

}
};

const getById = async(req, res) =>{
 try{
    const response = await OrderDetails.getById(req);
    if(!response) return res.status(404).json({message:"orderDetails nontrouvé"});
    res.json(response);
 } catch(error){
    res.status(500).json({message :"Error de serveur",error :error.message});
 }
};

const deleteOrderDetails = async (req,res) =>{
try{ 
   const response = await OrderDetails.deleteOrderDetails(req);
    res.json({message: "l'ordereDetails a été suprimée avec succès"});

}catch(error){

    res.status(500).json({message :"Erreur de serveur"})
}
};
export {getAll ,getById, deleteOrderDetails};