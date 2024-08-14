import { createContext, useReducer} from "react";
import PropTypes from  "prop-types";
import { useNavigate } from "react-router-dom";

import { reducer, initialState } from "./reducer";

import UseMenu from "../../hooks/UseMenu";

const Context = createContext();

function UserProvider({children}){
    const { toggleMenu } = UseMenu();

    const [user, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    async function login(data){
        if (data && data.email && data.isAdmin !== undefined){
            console.log("Login data:", data); // Ajoute ceci pour voir ce qui est passé
            dispatch({type: 'LOGIN', payload: data});
        } else {
            console.error("Invalid data passed to login:", data);
        }
        
    }
    async function logout(){
        const response = await fetch(
            "http://localhost:9000/api/v1/users/logout",
			{
                credentials: "include",
			}
		);
		if (response.ok) {
            dispatch({type: 'LOGOUT'});
            toggleMenu();
            navigate("/");
		}
    }
    
    return(
        <Context.Provider value ={{user, login, logout}}>
         {children}
        </Context.Provider>
    );
}

UserProvider.propTypes ={
   children: PropTypes.node.isRequired,
};
export{ Context, UserProvider };