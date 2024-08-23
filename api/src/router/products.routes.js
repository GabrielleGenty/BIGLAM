import { Router } from "express";

import {getAll,getById,getByCategoryId,add, update, deleteProduct} from "../controller/products.js";
import isAdmin from "../middlewares/isAdmin.js";


const router = Router();



// http://localhost:9000/api/v1/products/

router.get("/",getAll);
router.get("/:id",getById);
router.get("/category/:id",getByCategoryId);
router.post("/",isAdmin,add);
router.patch("/:id",isAdmin, update);
router.delete("/:id",isAdmin, deleteProduct);
export default router;



 