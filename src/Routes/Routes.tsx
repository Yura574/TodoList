import {createBrowserRouter, Link} from "react-router-dom";
import {Login} from "../Components/Login";
import App from "../App";

export const routes = createBrowserRouter([
        {
            path: "/",
            element: <App/>,
        },
        {
            path: "login",
            element:   <Login/>
        },

    ]
)