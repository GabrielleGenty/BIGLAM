import { BrowserRouter as Router, Routes,Route} from "react-router-dom";

import Header from "../views/user/partials/Header";
import Home from "../views/user/Home";
import Login from "../views/auth/Login";
import Footer from "../views/user/partials/Footer";

function UserRouter(){
    return(
        <>
       <Router>
          <Header/>
          <Routes>
            <Route path="/" element ={<Home/>}/>
            <Route path="/login" element ={<Login/>}/>
            <Route path="*" element={<p>NOT FOUND</p>}/>
  
          </Routes>
          <Footer/>
          </Router>
        </>
      );
}

export default UserRouter;