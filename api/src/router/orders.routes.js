import { Router } from "express";
import isAdmin from "../middlewares/isAdmin.js";
import userRequired from "../middlewares/userRequired.js";
import {getAll, getById, add, update ,deleteOrder} from "../controller/orders.js";

const router = Router();
// http://localhost:9000/api/v1/orders
router.get("/",getAll);
router.get("/:id", getById);

router.post("/", userRequired, add);

router.patch("/:id",isAdmin, update);
router.delete("/:id",isAdmin, deleteOrder);

   export default router;