import {createContext, useReducer} from 'react'
import { initializeApp} from "firebase/app";
import { getAuth,signInWithPopup, createUserWithEmailAndPassword,signInWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider   } from "firebase/auth";
import reducer, {initState} from './reducer'

const firebaseConfig = {
    apiKey: "AIzaSyCv2UvXeG99xAJyrwX8I5_GhH3fnFnpREI",
    authDomain: "test-authentication-f2192.firebaseapp.com",
    projectId: "test-authentication-f2192",
    storageBucket: "test-authentication-f2192.appspot.com",
    messagingSenderId: "458108850105",
    appId: "1:458108850105:web:b46ecdc0dc9decfc577068",
    measurementId: "G-851ZKFKZMR"
};


initializeApp(firebaseConfig)
const auth = getAuth()
const provider = new FacebookAuthProvider();
provider.setCustomParameters({
    'display': 'popup'
  });
const googleProvider = new GoogleAuthProvider();
const Context = createContext()

function Provider ({children}){
    const [state, dispatch] = useReducer(reducer, initState)



    function handleSubmit(password, passwordConfirm, email){
        if(password === passwordConfirm) {
            signInWithEmailAndPassword(auth,email,password )
            .then(userCredential=>{
                console.log(userCredential);
            })
            .catch(err=>{
                console.log(err.message);
            })
        }else{
            console.log('pass err');
        }
    }
    function loginWithFacebook(){
        signInWithPopup(auth, provider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            console.log(result);
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ...
        });
    }
    function loginWithGoogle(){
        signInWithPopup(auth, googleProvider)
        .then((result) => {

            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(token);
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    const value = {
        handleSubmit,
        loginWithFacebook,
        loginWithGoogle
    }
    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}
export {Provider, Context}