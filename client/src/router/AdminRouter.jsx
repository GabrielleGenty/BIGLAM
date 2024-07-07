import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "../views/Admin/Home";
import Products from "../views/Admin/Products.jsx";
import Details from "../views/Admin/Details.jsx";



function AdminRouter(){
    return(
      <>
       <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="products" element={<Products/>}/>
            <Route path="products/details/:id" element={<Details />}/>
            <Route path="*" element={<p>NOT FOUND</p>}/>
          </Routes>
          </Router>
      </>
      );

}
export default AdminRouter;