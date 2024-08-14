
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import App from './App.jsx';
import "./assets/styles/main.scss";
import { UserProvider } from "./store/user/Context.jsx";
import { CartProvider } from './store/cart/Context.jsx';
import { MenuProvider } from "./store/menu/Context.jsx"



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
      <MenuProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </MenuProvider> 
    </CartProvider>
  </BrowserRouter>


);
