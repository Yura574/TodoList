import {Form, useFormik} from "formik";
import {useAppDispatch} from "../store/store";
import SuperInputText from "./CommonComponents/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "./CommonComponents/c3-SuperCheckbox/SuperCheckbox";
import s from './Login.module.css'

interface Values {
    firstName: string;
    lastName: string;
    email: string;
}

export const Login = () => {
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className={s.loginFormWrapper}>
            <form onSubmit={formik.handleSubmit} className={s.loginForm}>
                <div>
                    <label htmlFor="email">Email</label>
                    <SuperInputText
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <SuperInputText
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                </div>
                <div>
                    <label htmlFor="checed">Remember me</label>
                    <input
                        name="checked"
                        type="checkbox"
                        // onChange={formik.handleChange}
                        checked={formik.values.rememberMe}
                        // onCh
                    />

                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}