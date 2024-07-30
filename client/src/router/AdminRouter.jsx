import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import AdminHome from "../views/Admin/AdminHome";
import Products from "../views/Admin/Products.jsx";
import Details from "../views/Admin/Details.jsx";
import Header from "../views/user/partials/Header.jsx";
import AddProduct from "../views/Admin/AddProduct.jsx";
import Categories from "../views/Admin/Categories.jsx";
import AddCategory from "../views/Admin/AddCategory.jsx";
import Users from "../views/Admin/Users.jsx";




function AdminRouter(){
    return(
     
       <Router>
        <Header/>
          <Routes>
            <Route path="/" element={<AdminHome/>}/>
            <Route path="products" element={<Products/>}/>
            <Route path="products/add" element={<AddProduct/>}/>
            <Route path="products/details/:id" element={<Details />}/>
            <Route path="categories" element={<Categories/>}/>
            <Route path="category/add" element={<AddCategory/>}/>
            <Route path="users" element={<Users/>}/>
            <Route path="*" element={<p>NOT FOUND</p>}/>
          </Routes>
          </Router>
      
      );

}
export default AdminRouter;