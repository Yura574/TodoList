import {createHashRouter} from "react-router-dom";
import {Login} from "../Components/Login";
import App from "../App";
import {Main} from "../store/Main";

export const routes = createHashRouter([
        {
            path: '/',
            element: <Main/>,
            // loader:
            children:[
                {
                    path:'login',
                    element: <div>assa</div>
                }
            ]
        }
    ]
)