import { useEffect, useState } from "react";
import {useUser} from "./UseUser";
const API_URL = import.meta.env.VITE_API_URL

function UseCheckUser() {
    const { user,login } = useUser();
    const[isLoading, setIsLoading] = useState(true);

    useEffect (() =>{
        async function fetchUsers(){
            try {
              const response = await fetch(
                API_URL + "/api/v1/users",
                {
                  // dans la requete on envoie les cookies pour que le serveur
                  // puisse s'en servir afin de vérifier l'état de connexion 
                 credentials:"include",
                }
              );
              //on envoi un 401 depuis le serveur en Json si le cas "utilisateur non connecté on "
              if (response.status === 401) {
                console.log("Unauthorized");
                return;
              }
              //si la reponse est ok ,on recupere les données de l'utilisateur envoyé 
              //en JSON qu'on parse et on les stock dans le state setUser, qui est un state d'une context User
      
              if (response.ok) {
                const data = await response.json();
                login(data.user);
               
              } else {
                console.log(`Server error: ${response.status}`);
              } 
            } catch (error){
              console.log(`Fetch error: ${error.message}`);
      
            } finally {
              //le finally est utilisé afin d'executer une/plusieurs instructions dans
              //tous les cas de figure (succès, erreur, etc...)
              //ici on arrete "le chargement" on oriiente vers le bon router
              setIsLoading(false);
            }
      
          }
          setTimeout(() =>{
            fetchUsers();
          },2000);
          


    }, []);

  return [user, isLoading ];
}

export {UseCheckUser};

