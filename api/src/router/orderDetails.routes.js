import {Router} from "express";
import isAdmin from "../middlewares/isAdmin.js";
import { getAll, getById, deleteOrderDetails } from "../controller/orderDetails.js";

const router =Router();

//http://localhost:9000/api/v1/orderDetails

router.get("/", getAll);
router.get("/:id", getById);
router.delete("/:id", isAdmin, deleteOrderDetails);

export default router;