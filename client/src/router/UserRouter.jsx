import { Routes,Route} from "react-router-dom";

import Header from "../views/user/partials/Header";
import Home from "../views/user/Home";
import Login from "../views/auth/Login";
import Register from  "../views/auth/Register";
import Dashboard from "../views/user/Dashboard";
import Cart from "../views/user/cart";
import ProtectedRoute from "../hoc/ProtectedRoute";
import Footer from "../views/user/partials/Footer";
import  TermOfUse from "../views/user/TermOfUse";
import PrivacyPolicy from "../views/user/PrivacyPolicy";

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
            <Route path="/termofuse" element ={< TermOfUse/>}/>
            <Route path="/privacypolicy" element ={< PrivacyPolicy/>}/>
            <Route path="*" element={<p>NOT FOUND</p>}/>
          </Routes>
          <Footer/>
          </>
       
      );
}

export default UserRouter;