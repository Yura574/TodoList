import {Link} from 'react-router-dom'


export const Header = () => {
    return (
        <div>
            <Link to={'login'}>
                <button>sing in</button>
            </Link>

        </div>
    )
}