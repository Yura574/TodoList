import {Link} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from "../store/store";
import {logoutTC} from "../store/reducers/authReducer";


export const Header = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const logout = () => {
        dispatch(logoutTC())
    }
    return (
        <div>
            {isLoggedIn
                ? <button onClick={logout}> sing out</button>

                : <Link to={'login'}>
                    <button>sing in</button>
                </Link>
            }


        </div>
    )
}