import { useContext, useEffect } from 'react';
import{ Context} from '../store/menu/Context.jsx';

//dans ce hook , on récupère le context Menu et on le retourne 
//on a besoin de l'état is MenuOpen et de la fonction toggleMenu 
//qu'on rendra disponible dans les composants qui auront besoin de cette fonctionalité 

function UseMenu(){
    const {isMenuOpen, toggleMenu} = useContext(Context);

    useEffect(()=>{
        if(isMenuOpen) toggleMenu();
    },[]);

    return {isMenuOpen, toggleMenu }
}

export default UseMenu;