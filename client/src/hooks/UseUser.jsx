import { useContext } from "react";
import { Context } from "../store/user/Context";

// dans ce hook, on recupere le context user et on le retourne
//export nomé de ce hook 

export const useUser =()=> useContext(Context);