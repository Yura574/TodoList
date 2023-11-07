import {Field, Form, Formik} from "formik";
import s from './Login.module.css'
import SuperInputText from "./CommonComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "./CommonComponents/c2-SuperButton/SuperButton";
import SuperCheckbox from "./CommonComponents/c3-SuperCheckbox/SuperCheckbox";
import {useAppDispatch, useAppSelector} from "../store/store";
import {loginTC} from "../store/reducers/authReducer";
import {Navigate} from 'react-router-dom'

interface Values {
    firstName: string;
    lastName: string;
    email: string;
}

export const Login = () => {
const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    if(isLoggedIn){
      return  <Navigate to={'/'} />
    }   
    return (
        <div className={s.loginFormWrapper}>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    rememberMe: false,
                    captcha: false
                }}
                onSubmit={(values) => {
                    console.log(values)
                    dispatch(loginTC(values))
                }}>
                {({values, handleChange}) => (
                    <Form className={s.loginForm}>
                        <label htmlFor="email">First Name</label>
                        <Field name="email" placeholder="email">
                            {() => (
                                <SuperInputText
                                    name={'email'}
                                    value={values.email}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Email"
                                />
                            )}
                        </Field>

                        <label htmlFor={'password'}> Password</label>
                        <Field name={'password'} placeholder={'password'}>
                            {()=> (
                                <SuperInputText
                                    name={'password'}
                                    type={'password'}
                                    value={values.password}
                                    onChange={handleChange}
                                />
                            )}
                        </Field>
                        <div className={s.checkboxWrapper}>
                        <label htmlFor={'rememberMe'}>Remember me</label>
                        <Field name={'rememberMe'} type={'checkbox'}>
                            {() => (
                                <SuperCheckbox
                                    name={'rememberMe'}
                                    checked={values.rememberMe}
                                    onChange={handleChange}
                                />
                            )

                            }
                        </Field></div>

                        <SuperButton type={'submit'}>submit</SuperButton>
                    </Form>
                )}


            </Formik>
        </div>
    )

}