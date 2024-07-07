import { Router } from "express";
import isAdmin from "../middlewares/isAdmin.js";
import {getAll,getById, add,update,deleteCategory} from "../controller/categories.js";

const router = Router();


// http://localhost:9000/api/v1/categories
router.get("/",getAll);
router.get("/:id",getById);

router.post("/",isAdmin, add);
router.patch("/:id",isAdmin,update);
router.delete("/:id",isAdmin,deleteCategory);

   export default router;