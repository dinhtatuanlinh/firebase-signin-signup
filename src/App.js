import React from 'react'
import { firebase } from "@firebase/app";
import { initializeApp} from "firebase/app";
import { getAuth,signInWithPopup, createUserWithEmailAndPassword,signInWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider   } from "firebase/auth";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

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

function App() {
    const email = React.createRef(),
        password = React.createRef(),
        passwordConfirm = React.createRef()
    // Initialize Firebase

    // const analytics = getAnalytics(app);
    function handleSubmit(){
        if(password.current.value === passwordConfirm.current.value) {
            signInWithEmailAndPassword(auth,email.current.value,password.current.value )
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
    return (
        <div className="App">
            <label>email</label>
            <input type="text" name="email" ref={email} />
            <label>pass</label>
            <input type="password" name="password" ref={password}  />
            <label>pass confirmation</label>
            <input
                type="password"
                name="password-confirm"
                ref={passwordConfirm}
            />
            <button onClick={handleSubmit}>submit</button>
            <button onClick={loginWithFacebook}>Login with Facebook</button>

            <button onClick={loginWithGoogle}>Login with Google</button>
        </div>
    );
}

export default App;
