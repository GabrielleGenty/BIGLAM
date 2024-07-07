import { Router } from "express";
import isAdmin from "../middlewares/isAdmin.js";



import { getAll, checkAuth, register, login, logout} from "../controller/users.js";


const router = Router();

// on est sur la route http://localhost:9000/api/v1/users

router.get("/", checkAuth);
router.get("/getAll",isAdmin, getAll);
router.post("/register",register);
router.post("/login",login);
router.get("/logout",logout);


   export default router;