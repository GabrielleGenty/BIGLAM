import {Router} from "express";
import products_router from "./products.routes.js";
import categories_router from "./categories.routes.js";
import users_router from "./users.routes.js";
import orders_router from "./orders.routes.js";
import orderDetails_router from "./orderDetails.routes.js"


const router = Router();
const BASE_API = "/api/v1";
router.use((req, res, next) => {
    console.log(`In router: ${req.method}:${req.originalUrl}`);
    next();
});

// http://localhost:9000/
router.get("/",(req,res)=>{
 res.json({msg:"connected to API !! "})

});

// http://localhost:9000/api/v1/products ->orinté vers le router "products"
router.use(`${BASE_API}/products`,products_router);
router.use(`${BASE_API}/categories`,categories_router);
router.use(`${BASE_API}/users`,users_router);
router.use(`${BASE_API}/orders`,orders_router);
router.use(`${BASE_API}/orderDetails`,orderDetails_router);

export default router;