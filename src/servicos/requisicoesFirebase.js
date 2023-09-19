import {auth} from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth/react-native';

export async function cadastrar(email, senha, confirmaSenha) {
   
        createUserWithEmailAndPassword(auth,email, senha)
        .then((dadosDoUsuario) => {
          console.log(dadosDoUsuario)
        })
        .catch((error) => {
          console.log(error)
        });
    
}