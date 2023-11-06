import {Provider} from "react-redux";
import {store} from "./store";
import App from "../App";


export const Main = ()=>{
    return(
        <Provider store={store}>
            <App/>
        </Provider>
    )
}