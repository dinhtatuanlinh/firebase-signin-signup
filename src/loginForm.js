import React from 'react'
import {useContext} from 'react'
import { StoreContext } from "./store";


function LoginForm (){
    const email = React.createRef(),
        password = React.createRef(),
        passwordConfirm = React.createRef()
    // Initialize Firebase
    const context = useContext(StoreContext)


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
            <button onClick={context.handleSubmit}>submit</button>
            <button onClick={context.loginWithFacebook}>Login with Facebook</button>

            <button onClick={context.loginWithGoogle}>Login with Google</button>
        </div>
    )
}
export default LoginForm