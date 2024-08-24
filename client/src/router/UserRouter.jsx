import { Routes,Route} from "react-router-dom";

import Header from "../views/user/partials/Header";
import Home from "../views/user/Home";
import Login from "../views/auth/Login";
import Register from  "../views/auth/Register";
import Dashboard from "../views/user/Dashboard";
import AboutUs from "../views/user/AboutUs";
import Cart from "../views/user/cart";
import ProtectedRoute from "../hoc/ProtectedRoute";
import Footer from "../views/user/partials/Footer";
import  TermOfUse from "../views/user/TermOfUse";
import PrivacyPolicy from "../views/user/PrivacyPolicy";
import Promotion from "../views/user/Promotion";
import ProductDetails from "../views/user/ProductDetails"
import NewCollection from "../views/user/NewCollection";
import Category from "../views/user/Category";
import TableauDeTailles from "../views/user/TableauDeTailles";

function UserRouter(){
    return(
     
       <>
          <Header/>
          <Routes>
            <Route path="/" element ={<Home/>}/>
            <Route path="/login" element ={<Login/>}/>
            <Route path="/Register" element ={<Register/>}/>
            <Route path="dashboard" element={<ProtectedRoute component={Dashboard} /> } />
            <Route path="/cart" element ={< Cart/>}/>
            <Route path="/product/:id" element ={< ProductDetails/>}/>
            <Route path="/category/:id" element ={< Category/>}/>
            <Route path="/aboutUs" element ={< AboutUs/>}/>
            <Route path="/tableauDeTailles" element ={<TableauDeTailles/>}/>
            <Route path="/promotion" element ={< Promotion/>}/>
            <Route path="/newCollection" element ={< NewCollection/>}/>
            <Route path="/termofuse" element ={< TermOfUse/>}/>
            <Route path="/privacypolicy" element ={< PrivacyPolicy/>}/>
            <Route path="*" element={<p>NOT FOUND</p>}/>
          </Routes>
          <Footer/>
          </>
       
      );
}

export default UserRouter;