import {useStore} from './store'

import LoginForm from "./loginForm";
import {StoreContext} from './store'

function App() {
    const [state, dispatch] = useStore()

    return (
        <div>

            {/* <LoginForm /> */}
        </div>
        
    );
}

export default App;
