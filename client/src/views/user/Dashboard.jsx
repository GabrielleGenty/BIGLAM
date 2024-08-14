import { UseCheckUser } from "../../hooks/UseCheckUser"
import useMenu from "../../hooks/UseMenu";


function Dashboard() {
    useMenu();
    const [ user ] = UseCheckUser();

    if(user.isLogged) {
        return (
          <div>Dashboard</div>
        ) 
    }

}

export default Dashboard;