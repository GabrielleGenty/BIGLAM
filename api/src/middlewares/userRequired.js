const userRequired = (req, res,next)=>{

    if(!req.session.user){
       // 403 : Forbiden
       res.status(403).json({message: "Vous devez etre connecté pour effectuer cette action !"});
       return;
    }
    if(req.session.user){
        next();
    }


}
export default userRequired;