import { Routes,Route} from "react-router-dom";
import AdminHome from "../views/Admin/AdminHome";
import Products from "../views/Admin/Products.jsx";
import Details from "../views/Admin/Details.jsx";
import AddProduct from "../views/Admin/AddProduct.jsx";
import Categories from "../views/Admin/Categories.jsx";
import AddCategory from "../views/Admin/AddCategory.jsx";
import Orders from "../views/Admin/Orders.jsx";
import Users from "../views/Admin/Users.jsx";
import OrderDetails from "../views/Admin/OrderDetails.jsx";




function AdminRouter(){
    return(
     
       <>
          <Routes>
            <Route path="/" element={<AdminHome/>}/>
            <Route path="products" element={<Products/>}/>
            <Route path="products/add" element={<AddProduct/>}/>
            <Route path="products/details/:id" element={<Details />}/>
            <Route path="categories" element={<Categories/>}/>
            <Route path="category/add" element={<AddCategory/>}/>
            <Route path="users" element={<Users/>}/>
            <Route path="orders" element={<Orders/>}/>
            <Route path="orders/details/:id" element={<OrderDetails/>}/>
            <Route path="*" element={<p>NOT FOUND</p>}/>
          </Routes>
          </>
      
      );

}
export default AdminRouter;