import { UseCheckUser } from './hooks/UseCheckUser';

import Loader from "./components/Loader";

import AdminRouter from './router/AdminRouter';
import UserRouter from './router/UserRouter';


function App() {
     const [user, isLoading] = UseCheckUser();

  if(isLoading){
    console.log("loadingAPP");
    return <Loader />;
  }

  if (user?.isAdmin) {
    return <AdminRouter />;
    
  } else {
    return <UserRouter/>
  }
}

export default App;