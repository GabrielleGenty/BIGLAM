import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import AdminHome from "../views/Admin/AdminHome";
import Products from "../views/Admin/Products.jsx";
import Details from "../views/Admin/Details.jsx";
import Header from "../views/user/partials/Header.jsx";




function AdminRouter(){
    return(
     
       <Router>
        <Header/>
          <Routes>
            <Route path="/" element={<AdminHome/>}/>
            <Route path="products" element={<Products/>}/>
            <Route path="products/details/:id" element={<Details />}/>
            <Route path="*" element={<p>NOT FOUND</p>}/>
          </Routes>
          </Router>
      
      );

}
export default AdminRouter;